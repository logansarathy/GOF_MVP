
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah J.",
    role: "Busy Mom",
    content: "Gods Own Food has transformed my family's eating habits. The meal plans are delicious and my kids actually love the recipes! The grocery delivery saves me so much time every week.",
    rating: 5,
  },
  {
    name: "Michael T.",
    role: "Fitness Enthusiast",
    content: "The AI meal planner understands my nutrition goals perfectly. I'm building muscle while eating delicious food that I never would have discovered on my own. Game changer!",
    rating: 5,
  },
  {
    name: "Priya K.",
    role: "Health Coach",
    content: "I recommend Gods Own Food to all my clients. The personalization is incredible, and the connection with local stores ensures the freshest ingredients possible.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-god-light-gray">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of happy customers who have transformed their eating habits with Gods Own Food.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-god-orange text-god-orange" />
                ))}
              </div>
              <p className="mb-6 text-gray-700">{testimonial.content}</p>
              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
