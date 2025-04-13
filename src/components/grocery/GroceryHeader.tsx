
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface GroceryHeaderProps {
  title: string;
}

const GroceryHeader: React.FC<GroceryHeaderProps> = ({ title }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => window.history.back()}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>
    </div>
  );
};

export default GroceryHeader;
