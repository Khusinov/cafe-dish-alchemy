
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import CreationMethodTabs from '@/components/dish-creation/CreationMethodTabs';
import DishPreview from '@/components/dish-creation/DishPreview';
import { Dish, Recipe, Ingredient } from '@/types/pos';

const DishCreation = () => {
  const [creationMethod, setCreationMethod] = useState<'recipe' | 'ingredient' | 'both' | 'scratch'>('recipe');
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [dishData, setDishData] = useState<Partial<Dish>>({
    name: '',
    price: 0,
    image: null,
    margin: 30,
    description: ''
  });

  const handleBack = () => {
    // Navigate back to main menu or dishes list
    console.log('Navigating back');
  };

  const handleSaveDish = () => {
    console.log('Saving dish:', { dishData, selectedRecipes, selectedIngredients });
    // Implement save logic
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Dish</h1>
              <p className="text-gray-600 mt-1">Design and price your menu item</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="lg">
              Save Draft
            </Button>
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handleSaveDish}
            >
              Create Dish
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Panel - Creation Methods */}
          <div className="col-span-8">
            <Card className="p-6 shadow-sm border-0 bg-white">
              <CreationMethodTabs
                creationMethod={creationMethod}
                setCreationMethod={setCreationMethod}
                selectedRecipes={selectedRecipes}
                setSelectedRecipes={setSelectedRecipes}
                selectedIngredients={selectedIngredients}
                setSelectedIngredients={setSelectedIngredients}
                dishData={dishData}
                setDishData={setDishData}
              />
            </Card>
          </div>

          {/* Right Panel - Dish Preview */}
          <div className="col-span-4">
            <div className="sticky top-6">
              <DishPreview
                dishData={dishData}
                setDishData={setDishData}
                selectedRecipes={selectedRecipes}
                selectedIngredients={selectedIngredients}
                creationMethod={creationMethod}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishCreation;
