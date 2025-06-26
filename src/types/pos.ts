
export interface Ingredient {
  id: string;
  name: string;
  cost: number;
  unit: string;
  quantity?: number;
  image?: string;
}

export interface Recipe {
  id: string;
  name: string;
  totalRecipeCost: number;
  ingredients: Ingredient[];
  image: string;
  description?: string;
  servings?: number;
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  cost: number;
  margin: number;
  image: string | null;
  description: string;
  recipes?: Recipe[];
  ingredients?: Ingredient[];
  category?: string;
  isActive: boolean;
  createdAt: Date;
}
