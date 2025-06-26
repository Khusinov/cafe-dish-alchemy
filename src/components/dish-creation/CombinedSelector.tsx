
import React from 'react';
import { Separator } from '@/components/ui/separator';
import RecipeSelector from './RecipeSelector';
import IngredientSelector from './IngredientSelector';
import { Recipe, Ingredient, Dish } from '@/types/pos';

interface CombinedSelectorProps {
  selectedRecipes: Recipe[];
  setSelectedRecipes: (recipes: Recipe[]) => void;
  selectedIngredients: Ingredient[];
  setSelectedIngredients: (ingredients: Ingredient[]) => void;
  dishData: Partial<Dish>;
  setDishData: (data: Partial<Dish>) => void;
}

const CombinedSelector = ({
  selectedRecipes,
  setSelectedRecipes,
  selectedIngredients,
  setSelectedIngredients,
  dishData,
  setDishData
}: CombinedSelectorProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-2">Combined Creation</h3>
        <p className="text-gray-600 mb-6">Build your dish using both recipes and individual ingredients</p>
      </div>

      <RecipeSelector
        selectedRecipes={selectedRecipes}
        setSelectedRecipes={setSelectedRecipes}
        dishData={dishData}
        setDishData={setDishData}
      />

      <Separator className="my-8" />

      <IngredientSelector
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
        dishData={dishData}
        setDishData={setDishData}
      />
    </div>
  );
};

export default CombinedSelector;
