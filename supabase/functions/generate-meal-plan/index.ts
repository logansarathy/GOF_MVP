
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
const geminiApiKey = Deno.env.get("GEMINI_API_KEY") as string;
const openaiApiKey = Deno.env.get("OPENAI_API_KEY") as string;
const claudeApiKey = Deno.env.get("CLAUDE_API_KEY") as string;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const { preferences, userId } = await req.json();
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate prompt for the selected AI model
    const prompt = generatePrompt(preferences);

    // Determine which AI model to use based on the user's preference
    let mealPlan;
    const modelChoice = preferences.modelChoice || 'gemini';
    
    switch (modelChoice) {
      case 'openai':
        if (openaiApiKey) {
          mealPlan = await generateMealPlanWithOpenAI(prompt);
        } else {
          console.warn("OpenAI API key not configured, falling back to Gemini");
          mealPlan = await generateMealPlanWithGemini(prompt);
        }
        break;
      case 'claude':
        if (claudeApiKey) {
          mealPlan = await generateMealPlanWithClaude(prompt);
        } else {
          console.warn("Claude API key not configured, falling back to Gemini");
          mealPlan = await generateMealPlanWithGemini(prompt);
        }
        break;
      case 'custom':
        // For custom, we'll use the additionalInfo field as instructions
        // and default to Gemini as the model
        const customPrompt = generateCustomPrompt(preferences);
        mealPlan = await generateMealPlanWithGemini(customPrompt);
        break;
      case 'gemini':
      default:
        mealPlan = await generateMealPlanWithGemini(prompt);
        break;
    }

    // Store the meal plan in the database if user is logged in
    if (userId && userId !== 'anonymous') {
      await storeMealPlanInDatabase(supabase, mealPlan, userId);
    }

    return new Response(
      JSON.stringify({ 
        mealPlan,
        success: true 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating meal plan:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function generatePrompt(preferences: Record<string, string>): string {
  return `
    Generate a detailed meal plan based on the following preferences:
    
    Dietary Preferences: ${preferences.dietaryPreferences || 'None specified'}
    Allergies or Restrictions: ${preferences.allergies || 'None specified'}
    Daily Calorie Goal: ${preferences.calorieGoal || 'Balanced diet'}
    Meals Per Day: ${preferences.mealCount || '3'}
    Cooking Skill Level: ${preferences.cookingSkill || 'Intermediate'}
    Additional Information: ${preferences.additionalInfo || 'None provided'}
    
    Please provide the meal plan in JSON format with the following structure:
    {
      "id": "unique-id",
      "meals": {
        "breakfast": [
          {
            "id": "unique-breakfast-id",
            "name": "Name of the meal",
            "description": "Brief description",
            "ingredients": ["ingredient 1", "ingredient 2", ...],
            "instructions": ["step 1", "step 2", ...],
            "nutritionalInfo": {
              "calories": number,
              "protein": number,
              "carbs": number,
              "fat": number
            },
            "tags": ["tag1", "tag2", ...],
            "prepTime": number (in minutes)
          }
        ],
        "lunch": [...],
        "dinner": [...],
        "snacks": [...]
      },
      "summary": "Brief summary of the meal plan",
      "totalNutrition": {
        "calories": number,
        "protein": number,
        "carbs": number,
        "fat": number
      },
      "generatedOn": "current-date-iso-string"
    }
    
    Ensure all values are realistic, with accurate nutritional information. Make sure to properly close all JSON arrays and objects.
    
    Include a variety of recipes that align with the preferences. If the user has specified a calorie goal, make sure the total daily calories approximate that goal.
    
    For snacks, include 2-3 options if the meal count is 5 or higher. Otherwise, include 0-1 snack options.
    
    Make sure all field names are exactly as specified above, with no additional fields.
  `;
}

// Custom prompt generator that incorporates user's custom instructions
function generateCustomPrompt(preferences: Record<string, string>): string {
  const basePrompt = generatePrompt(preferences);
  
  // Add the custom instructions from the additionalInfo field
  return `
    ${basePrompt}
    
    IMPORTANT CUSTOM INSTRUCTIONS:
    ${preferences.additionalInfo || 'No specific custom instructions provided.'}
    
    Still ensure you follow the JSON format specified above regardless of custom instructions.
  `;
}

async function generateMealPlanWithGemini(prompt: string) {
  try {
    if (!geminiApiKey) {
      throw new Error("Gemini API key is not configured");
    }
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
          },
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Gemini API error: ${JSON.stringify(data)}`);
    }

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response from Gemini API");
    }

    const content = data.candidates[0].content;
    if (!content || !content.parts || content.parts.length === 0) {
      throw new Error("Invalid response structure from Gemini API");
    }

    const textResponse = content.parts[0].text;
    
    // Extract the JSON part from the response
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not extract JSON from Gemini response");
    }

    const jsonStr = jsonMatch[0];
    const mealPlan = JSON.parse(jsonStr);

    // Ensure generatedOn is set to the current date if not provided
    if (!mealPlan.generatedOn) {
      mealPlan.generatedOn = new Date().toISOString();
    }

    return mealPlan;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error(`Failed to generate meal plan: ${error.message}`);
  }
}

async function generateMealPlanWithOpenAI(prompt: string) {
  try {
    if (!openaiApiKey) {
      throw new Error("OpenAI API key is not configured");
    }
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a nutritionist specializing in creating meal plans. Output ONLY valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${JSON.stringify(data)}`);
    }

    if (!data.choices || data.choices.length === 0) {
      throw new Error("No response from OpenAI API");
    }

    const textResponse = data.choices[0].message.content;
    
    try {
      const mealPlan = JSON.parse(textResponse);
      
      // Ensure generatedOn is set to the current date if not provided
      if (!mealPlan.generatedOn) {
        mealPlan.generatedOn = new Date().toISOString();
      }
      
      return mealPlan;
    } catch (parseError) {
      throw new Error(`Failed to parse JSON from OpenAI response: ${parseError.message}`);
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error(`Failed to generate meal plan: ${error.message}`);
  }
}

async function generateMealPlanWithClaude(prompt: string) {
  try {
    if (!claudeApiKey) {
      throw new Error("Claude API key is not configured");
    }
    
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": claudeApiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 4000,
        temperature: 0.7,
        system: "You are a nutritionist specializing in creating meal plans. Output ONLY valid JSON.",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Claude API error: ${JSON.stringify(data)}`);
    }

    // Extract the JSON part from the response
    const textResponse = data.content[0].text;
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("Could not extract JSON from Claude response");
    }

    const jsonStr = jsonMatch[0];
    const mealPlan = JSON.parse(jsonStr);

    // Ensure generatedOn is set to the current date if not provided
    if (!mealPlan.generatedOn) {
      mealPlan.generatedOn = new Date().toISOString();
    }

    return mealPlan;
  } catch (error) {
    console.error("Error calling Claude API:", error);
    throw new Error(`Failed to generate meal plan: ${error.message}`);
  }
}

async function storeMealPlanInDatabase(supabase: any, mealPlan: any, userId: string) {
  try {
    // Check if meal_plans table exists, create it if not
    const { error: tableError } = await supabase.rpc('create_meal_plans_table_if_not_exists');
    
    if (tableError && !tableError.message.includes('already exists')) {
      console.error("Error checking/creating meal_plans table:", tableError);
    }

    // Store the meal plan
    const { error } = await supabase
      .from('meal_plans')
      .insert({
        id: mealPlan.id,
        user_id: userId,
        plan_data: mealPlan,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error("Error storing meal plan:", error);
    }
  } catch (error) {
    console.error("Error in database operation:", error);
  }
}
