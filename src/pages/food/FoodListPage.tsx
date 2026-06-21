import React from "react";
import ProviderMainLayout from "../../layouts/ProviderMainLayout";
import FoodList from "../../components/food/FoodList";

const FoodListPage: React.FC = () => {
  return (
    <ProviderMainLayout>
      <div className="p-4 md:p-8 pt-20 lg:pt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold">Food & Beverages</h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage food and beverage items for your flights
            </p>
          </div>
        </div>
        <FoodList />
      </div>
    </ProviderMainLayout>
  );
};

export default FoodListPage;