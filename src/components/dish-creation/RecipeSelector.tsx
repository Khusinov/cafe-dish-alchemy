
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, X, ChefHat } from 'lucide-react';
import { Recipe, Dish } from '@/types/pos';

interface RecipeSelectorProps {
  selectedRecipes: Recipe[];
  setSelectedRecipes: (recipes: Recipe[]) => void;
  dishData: Partial<Dish>;
  setDishData: (data: Partial<Dish>) => void;
}

// Mock data for demonstration
const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Tomato Basil Sauce',
    totalRecipeCost: 3.50,
    ingredients: [],
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop',
    description: 'Fresh tomato sauce with basil',
    servings: 4
  },
  {
    id: '2',
    name: 'Pizza Dough',
    totalRecipeCost: 2.25,
    ingredients: [],
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=200&fit=crop',
    description: 'Classic pizza dough recipe',
    servings: 2
  },
  {
    id: '3',
    name: 'Cheese Blend',
    totalRecipeCost: 4.75,
    ingredients: [],
    image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=300&h=200&fit=crop',
    description: 'Mozzarella and parmesan blend',
    servings: 6
  }
];

const RecipeSelector = ({ selectedRecipes, setSelectedRecipes, dishData, setDishData }: RecipeSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableRecipes] = useState<Recipe[]>(mockRecipes);

  const filteredRecipes = availableRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedRecipes.find(selected => selected.id === recipe.id)
  );

  const addRecipe = (recipe: Recipe) => {
    const newSelectedRecipes = [...selectedRecipes, recipe];
    setSelectedRecipes(newSelectedRecipes);
    
    // Auto-suggest dish name if not set
    if (!dishData.name && newSelectedRecipes.length === 1) {
      setDishData({ 
        ...dishData, 
        name: `${recipe.name} Dish`,
        image: recipe.image 
      });
    }
  };

  const removeRecipe = (recipeId: string) => {
    setSelectedRecipes(selectedRecipes.filter(recipe => recipe.id !== recipeId));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Select Recipes</h3>
        <p className="text-gray-600 mb-4">Choose existing recipes to build your dish</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Selected Recipes */}
      {selectedRecipes.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Selected Recipes</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {selectedRecipes.map(recipe => (
              <Card key={recipe.id} className="p-4 border-emerald-200 bg-emerald-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <ChefHat className="h-4 w-4 text-emerald-600" />
                      <h5 className="font-medium text-emerald-800">{recipe.name}</h5>
                    </div>
                    <p className="text-sm text-emerald-600 mb-2">{recipe.description}</p>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="text-xs">
                        Cost: ${recipe.totalRecipeCost.toFixed(2)}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Servings: {recipe.servings}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeRecipe(recipe.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Available Recipes */}
      <div>
        <h4 className="font-medium mb-3">Available Recipes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map(recipe => (
            <Card key={recipe.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => addRecipe(recipe)}>
              <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="font-medium mb-1">{recipe.name}</h5>
              <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  ${recipe.totalRecipeCost.toFixed(2)}
                </Badge>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeSelector;
