
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign } from 'lucide-react';
import { Dish } from '@/types/pos';

interface PricingCalculatorProps {
  dishData: Partial<Dish>;
  setDishData: (data: Partial<Dish>) => void;
}

const PricingCalculator = ({ dishData, setDishData }: PricingCalculatorProps) => {
  const cost = dishData.cost || 0;
  const price = dishData.price || 0;
  const margin = dishData.margin || 30;

  // Calculate suggested price based on margin
  const suggestedPrice = cost > 0 ? (cost / (1 - margin / 100)) : 0;
  
  // Calculate actual margin based on current price
  const actualMargin = price > 0 ? ((price - cost) / price) * 100 : 0;
  
  // Calculate profit
  const profit = price - cost;

  const handlePriceChange = (newPrice: number) => {
    setDishData({ ...dishData, price: newPrice });
  };

  const handleMarginChange = (newMargin: number) => {
    setDishData({ ...dishData, margin: newMargin });
    // Auto-update price based on new margin
    if (cost > 0) {
      const newPrice = cost / (1 - newMargin / 100);
      setDishData({ ...dishData, margin: newMargin, price: parseFloat(newPrice.toFixed(2)) });
    }
  };

  const useSuggestedPrice = () => {
    setDishData({ ...dishData, price: parseFloat(suggestedPrice.toFixed(2)) });
  };

  return (
    <div className="space-y-4">
      {/* Cost Breakdown */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Total Cost</span>
          <span className="text-lg font-bold text-gray-900">${cost.toFixed(2)}</span>
        </div>
        {cost > 0 && (
          <div className="text-xs text-gray-500">
            Based on selected recipes and ingredients
          </div>
        )}
      </div>

      {/* Margin Target */}
      <div>
        <Label htmlFor="target-margin" className="text-sm font-medium mb-2 block">
          Target Margin (%)
        </Label>
        <Input
          id="target-margin"
          type="number"
          value={margin}
          onChange={(e) => handleMarginChange(parseFloat(e.target.value) || 0)}
          className="w-full"
          min="0"
          max="90"
        />
      </div>

      {/* Suggested Price */}
      {cost > 0 && (
        <Card className="p-4 bg-emerald-50 border-emerald-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-800">Suggested Price</span>
            </div>
            <span className="text-xl font-bold text-emerald-800">${suggestedPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={useSuggestedPrice}
            className="text-xs text-emerald-600 hover:text-emerald-800 underline"
          >
            Use suggested price
          </button>
        </Card>
      )}

      {/* Selling Price */}
      <div>
        <Label htmlFor="selling-price" className="text-sm font-medium mb-2 block">
          Selling Price ($)
        </Label>
        <Input
          id="selling-price"
          type="number"
          value={price}
          onChange={(e) => handlePriceChange(parseFloat(e.target.value) || 0)}
          className="w-full"
          min="0"
          step="0.01"
        />
      </div>

      {/* Profit Analysis */}
      {price > 0 && cost > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-xs text-blue-600 mb-1">Actual Margin</div>
            <div className="text-lg font-bold text-blue-800">{actualMargin.toFixed(1)}%</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-xs text-green-600 mb-1">Profit per Item</div>
            <div className="text-lg font-bold text-green-800">${profit.toFixed(2)}</div>
          </div>
        </div>
      )}

      {/* Margin Status */}
      <div className="flex justify-center">
        {actualMargin >= margin ? (
          <Badge className="bg-green-100 text-green-800">Target margin achieved</Badge>
        ) : actualMargin > 0 ? (
          <Badge variant="outline" className="border-yellow-300 text-yellow-700">
            Below target margin
          </Badge>
        ) : (
          <Badge variant="destructive">No profit margin</Badge>
        )}
      </div>
    </div>
  );
};

export default PricingCalculator;
