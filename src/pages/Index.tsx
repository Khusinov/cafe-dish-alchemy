
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChefHat, Utensils, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cafe POS System</h1>
          <p className="text-xl text-gray-600">Manage your restaurant operations with ease</p>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/ingredients')}>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Ingredients</h3>
              <p className="text-gray-600 mb-4">Manage your ingredient inventory and costs</p>
              <Button variant="outline" className="w-full">
                Manage Ingredients
              </Button>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/recipes')}>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Recipes</h3>
              <p className="text-gray-600 mb-4">Create and manage your recipes with cost tracking</p>
              <Button variant="outline" className="w-full">
                Manage Recipes
              </Button>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer border-emerald-200 bg-emerald-50" onClick={() => navigate('/dish-creation')}>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-emerald-800">Create Dish</h3>
              <p className="text-emerald-700 mb-4">Design new dishes with smart pricing</p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Create New Dish
              </Button>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">45</div>
            <div className="text-sm text-gray-600">Ingredients</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-600">Recipes</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">28</div>
            <div className="text-sm text-gray-600">Dishes</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">32%</div>
            <div className="text-sm text-gray-600">Avg Margin</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
