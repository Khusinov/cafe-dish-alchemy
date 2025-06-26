
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChefHat, Wheat, Plus, Sparkles } from 'lucide-react';
import RecipeSelector from './RecipeSelector';
import IngredientSelector from './IngredientSelector';
import ScratchCreator from './ScratchCreator';
import CombinedSelector from './CombinedSelector';
import { Recipe, Ingredient, Dish } from '@/types/pos';

interface CreationMethodTabsProps {
  creationMethod: 'recipe' | 'ingredient' | 'both' | 'scratch';
  setCreationMethod: (method: 'recipe' | 'ingredient' | 'both' | 'scratch') => void;
  selectedRecipes: Recipe[];
  setSelectedRecipes: (recipes: Recipe[]) => void;
  selectedIngredients: Ingredient[];
  setSelectedIngredients: (ingredients: Ingredient[]) => void;
  dishData: Partial<Dish>;
  setDishData: (data: Partial<Dish>) => void;
}

const CreationMethodTabs = ({
  creationMethod,
  setCreationMethod,
  selectedRecipes,
  setSelectedRecipes,
  selectedIngredients,
  setSelectedIngredients,
  dishData,
  setDishData
}: CreationMethodTabsProps) => {
  return (
    <Tabs value={creationMethod} onValueChange={(value) => setCreationMethod(value as any)}>
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="recipe" className="flex items-center gap-2">
          <ChefHat className="h-4 w-4" />
          From Recipe
        </TabsTrigger>
        <TabsTrigger value="ingredient" className="flex items-center gap-2">
          <Wheat className="h-4 w-4" />
          From Ingredients
        </TabsTrigger>
        <TabsTrigger value="both" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Combined
        </TabsTrigger>
        <TabsTrigger value="scratch" className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          From Scratch
        </TabsTrigger>
      </TabsList>

      <TabsContent value="recipe" className="mt-0">
        <RecipeSelector
          selectedRecipes={selectedRecipes}
          setSelectedRecipes={setSelectedRecipes}
          dishData={dishData}
          setDishData={setDishData}
        />
      </TabsContent>

      <TabsContent value="ingredient" className="mt-0">
        <IngredientSelector
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
          dishData={dishData}
          setDishData={setDishData}
        />
      </TabsContent>

      <TabsContent value="both" className="mt-0">
        <CombinedSelector
          selectedRecipes={selectedRecipes}
          setSelectedRecipes={setSelectedRecipes}
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
          dishData={dishData}
          setDishData={setDishData}
        />
      </TabsContent>

      <TabsContent value="scratch" className="mt-0">
        <ScratchCreator
          dishData={dishData}
          setDishData={setDishData}
        />
      </TabsContent>
    </Tabs>
  );
};

export default CreationMethodTabs;
