
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, DollarSign, Percent, Calculator } from 'lucide-react';
import PricingCalculator from './PricingCalculator';
import { Recipe, Ingredient, Dish } from '@/types/pos';

interface DishPreviewProps {
  dishData: Partial<Dish>;
  setDishData: (data: Partial<Dish>) => void;
  selectedRecipes: Recipe[];
  selectedIngredients: Ingredient[];
  creationMethod: string;
}

const DishPreview = ({
  dishData,
  setDishData,
  selectedRecipes,
  selectedIngredients,
  creationMethod
}: DishPreviewProps) => {
  // Calculate total cost based on selected items
  useEffect(() => {
    let totalCost = 0;
    
    selectedRecipes.forEach(recipe => {
      totalCost += recipe.totalRecipeCost;
    });
    
    selectedIngredients.forEach(ingredient => {
      totalCost += ingredient.cost * (ingredient.quantity || 1);
    });

    setDishData({ ...dishData, cost: totalCost });
  }, [selectedRecipes, selectedIngredients]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDishData({ ...dishData, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dish Preview Card */}
      <Card className="p-6 shadow-sm border-0 bg-white">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-emerald-600" />
          Dish Preview
        </h3>
        
        {/* Image Upload */}
        <div className="mb-4">
          <Label htmlFor="dish-image" className="text-sm font-medium mb-2 block">
            Dish Image
          </Label>
          <div className="relative">
            {dishData.image ? (
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
                <img 
                  src={dishData.image} 
                  alt="Dish preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <Button size="sm" variant="secondary">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Image
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Click to upload image</span>
              </div>
            )}
            <input
              id="dish-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="dish-name" className="text-sm font-medium mb-2 block">
              Dish Name
            </Label>
            <Input
              id="dish-name"
              placeholder="Enter dish name..."
              value={dishData.name || ''}
              onChange={(e) => setDishData({ ...dishData, name: e.target.value })}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="dish-description" className="text-sm font-medium mb-2 block">
              Description
            </Label>
            <Textarea
              id="dish-description"
              placeholder="Describe your dish..."
              value={dishData.description || ''}
              onChange={(e) => setDishData({ ...dishData, description: e.target.value })}
              rows={3}
              className="w-full"
            />
          </div>
        </div>

        {/* Components Badge */}
        {(selectedRecipes.length > 0 || selectedIngredients.length > 0) && (
          <div className="mt-4 pt-4 border-t">
            <Label className="text-sm font-medium mb-2 block">Components</Label>
            <div className="flex flex-wrap gap-2">
              {selectedRecipes.map(recipe => (
                <Badge key={recipe.id} variant="secondary" className="bg-blue-50 text-blue-700">
                  {recipe.name}
                </Badge>
              ))}
              {selectedIngredients.map(ingredient => (
                <Badge key={ingredient.id} variant="secondary" className="bg-green-50 text-green-700">
                  {ingredient.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Pricing Calculator */}
      <Card className="p-6 shadow-sm border-0 bg-white">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-emerald-600" />
          Pricing & Margins
        </h3>
        <PricingCalculator
          dishData={dishData}
          setDishData={setDishData}
        />
      </Card>
    </div>
  );
};

export default DishPreview;
