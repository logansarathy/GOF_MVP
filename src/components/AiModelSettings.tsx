
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AiModelSettings = () => {
  const [openai, setOpenai] = useState(localStorage.getItem('openai_api_key') || '');
  const [claude, setClaude] = useState(localStorage.getItem('claude_api_key') || '');
  const [customModel, setCustomModel] = useState(localStorage.getItem('custom_model_api_key') || '');
  const [customModelName, setCustomModelName] = useState(localStorage.getItem('custom_model_name') || '');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const saveSettings = () => {
    if (openai) localStorage.setItem('openai_api_key', openai);
    if (claude) localStorage.setItem('claude_api_key', claude);
    if (customModel) localStorage.setItem('custom_model_api_key', customModel);
    if (customModelName) localStorage.setItem('custom_model_name', customModelName);
    
    toast({
      title: "Settings Saved",
      description: "Your AI model settings have been saved."
    });
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-4 w-full flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Configure AI Models
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI Model Settings</DialogTitle>
          <DialogDescription>
            Configure your own AI model API keys for generating meal plans.
            These keys are stored locally on your device and never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="openai">OpenAI API Key</Label>
            <Input
              id="openai"
              value={openai}
              onChange={(e) => setOpenai(e.target.value)}
              placeholder="sk-..."
              type="password"
            />
            <p className="text-sm text-gray-500">Used for GPT meal plan generation.</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="claude">Anthropic Claude API Key</Label>
            <Input
              id="claude"
              value={claude}
              onChange={(e) => setClaude(e.target.value)}
              placeholder="sk-ant-..."
              type="password"
            />
            <p className="text-sm text-gray-500">Used for Claude meal plan generation.</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customModelName">Custom Model Name</Label>
            <Input
              id="customModelName"
              value={customModelName}
              onChange={(e) => setCustomModelName(e.target.value)}
              placeholder="My Custom AI Model"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customModel">Custom Model API Key</Label>
            <Input
              id="customModel"
              value={customModel}
              onChange={(e) => setCustomModel(e.target.value)}
              placeholder="Enter API key..."
              type="password"
            />
            <p className="text-sm text-gray-500">For advanced users: Add your own AI model API key.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={saveSettings}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiModelSettings;
