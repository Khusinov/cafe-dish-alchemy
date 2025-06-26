
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Info } from 'lucide-react';
import { Dish } from '@/types/pos';

interface ScratchCreatorProps {
  dishData: Partial<Dish>;
  setDishData: (data: Partial<Dish>) => void;
}

const ScratchCreator = ({ dishData, setDishData }: ScratchCreatorProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          Create from Scratch
        </h3>
        <p className="text-gray-600 mb-6">Create a dish without connecting to existing recipes or ingredients</p>
      </div>

      <Card className="p-6 border-purple-200 bg-purple-50">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-purple-800 mb-1">Manual Creation Mode</h4>
            <p className="text-sm text-purple-700">
              In this mode, you'll manually enter all dish details including cost information. 
              This is perfect for dishes that don't rely on your existing recipes or ingredient database.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="scratch-name" className="text-sm font-medium mb-2 block">
              Dish Name *
            </Label>
            <Input
              id="scratch-name"
              placeholder="Enter dish name..."
              value={dishData.name || ''}
              onChange={(e) => setDishData({ ...dishData, name: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="scratch-cost" className="text-sm font-medium mb-2 block">
              Estimated Cost ($)
            </Label>
            <Input
              id="scratch-cost"
              type="number"
              placeholder="0.00"
              value={dishData.cost || ''}
              onChange={(e) => setDishData({ ...dishData, cost: parseFloat(e.target.value) || 0 })}
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <Label htmlFor="scratch-price" className="text-sm font-medium mb-2 block">
              Selling Price ($)
            </Label>
            <Input
              id="scratch-price"
              type="number"
              placeholder="0.00"
              value={dishData.price || ''}
              onChange={(e) => setDishData({ ...dishData, price: parseFloat(e.target.value) || 0 })}
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="scratch-description" className="text-sm font-medium mb-2 block">
              Description
            </Label>
            <Textarea
              id="scratch-description"
              placeholder="Describe your dish..."
              value={dishData.description || ''}
              onChange={(e) => setDishData({ ...dishData, description: e.target.value })}
              rows={6}
            />
          </div>
        </div>
      </div>

      {/* Profit Preview */}
      {dishData.cost && dishData.price && (
        <Card className="p-4 bg-gray-50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-600">Cost</div>
              <div className="text-lg font-bold text-red-600">${dishData.cost.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Profit</div>
              <div className="text-lg font-bold text-green-600">
                ${(dishData.price - dishData.cost).toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Margin</div>
              <div className="text-lg font-bold text-blue-600">
                {(((dishData.price - dishData.cost) / dishData.price) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ScratchCreator;
