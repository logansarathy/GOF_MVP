
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CategorySidebarProps {
  categories: Array<{ id: string; name: string; icon: string }>;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  categoryCounts: Record<string, number>;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories.map(category => (
            <div
              key={category.id}
              className={`flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 ${
                selectedCategory === category.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              <span className="text-xl mr-3">{category.icon}</span>
              <span className="flex-1">{category.name}</span>
              <Badge variant="outline">
                {categoryCounts[category.id] || 0}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySidebar;
