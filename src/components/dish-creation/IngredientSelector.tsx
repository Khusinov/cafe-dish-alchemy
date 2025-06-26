
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, X, Wheat, Minus } from 'lucide-react';
import { Ingredient, Dish } from '@/types/pos';

interface IngredientSelectorProps {
  selectedIngredients: Ingredient[];
  setSelectedIngredients: (ingredients: Ingredient[]) => void;
  dishData: Partial<Dish>;
  setDishData: (data: Partial<Dish>) => void;
}

// Mock data for demonstration
const mockIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    cost: 2.50,
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop'
  },
  {
    id: '2',
    name: 'Mozzarella Cheese',
    cost: 4.25,
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop'
  },
  {
    id: '3',
    name: 'Fresh Basil',
    cost: 1.75,
    unit: 'bunch'
  },
  {
    id: '4',
    name: 'Olive Oil',
    cost: 6.50,
    unit: 'bottle'
  }
];

const IngredientSelector = ({ selectedIngredients, setSelectedIngredients, dishData, setDishData }: IngredientSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableIngredients] = useState<Ingredient[]>(mockIngredients);

  const filteredIngredients = availableIngredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedIngredients.find(selected => selected.id === ingredient.id)
  );

  const addIngredient = (ingredient: Ingredient) => {
    const newIngredient = { ...ingredient, quantity: 1 };
    const newSelectedIngredients = [...selectedIngredients, newIngredient];
    setSelectedIngredients(newSelectedIngredients);
    
    // Auto-suggest dish name if not set
    if (!dishData.name && newSelectedIngredients.length === 1) {
      setDishData({ 
        ...dishData, 
        name: `${ingredient.name} Dish`
      });
    }
  };

  const removeIngredient = (ingredientId: string) => {
    setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient.id !== ingredientId));
  };

  const updateQuantity = (ingredientId: string, quantity: number) => {
    if (quantity <= 0) {
      removeIngredient(ingredientId);
      return;
    }
    
    setSelectedIngredients(
      selectedIngredients.map(ingredient =>
        ingredient.id === ingredientId ? { ...ingredient, quantity } : ingredient
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Select Ingredients</h3>
        <p className="text-gray-600 mb-4">Choose individual ingredients for your dish</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Selected Ingredients */}
      {selectedIngredients.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Selected Ingredients</h4>
          <div className="space-y-3 mb-6">
            {selectedIngredients.map(ingredient => (
              <Card key={ingredient.id} className="p-4 border-green-200 bg-green-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Wheat className="h-4 w-4 text-green-600" />
                      <h5 className="font-medium text-green-800">{ingredient.name}</h5>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="text-xs">
                        ${ingredient.cost.toFixed(2)} per {ingredient.unit}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Total: ${((ingredient.cost * (ingredient.quantity || 1))).toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(ingredient.id, (ingredient.quantity || 1) - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">
                      {ingredient.quantity || 1}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(ingredient.id, (ingredient.quantity || 1) + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeIngredient(ingredient.id)}
                      className="text-red-600 hover:text-red-800 ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Available Ingredients */}
      <div>
        <h4 className="font-medium mb-3">Available Ingredients</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIngredients.map(ingredient => (
            <Card key={ingredient.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => addIngredient(ingredient)}>
              {ingredient.image && (
                <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <img 
                    src={ingredient.image} 
                    alt={ingredient.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h5 className="font-medium mb-1">{ingredient.name}</h5>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  ${ingredient.cost.toFixed(2)}/{ingredient.unit}
                </Badge>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
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

export default IngredientSelector;
