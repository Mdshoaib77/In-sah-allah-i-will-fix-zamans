import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const FeaturedProducts = () => {
  const { products } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('phones');
  const [phones, setPhones] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    setPhones(products.filter(p => p.category.toLowerCase() === 'official phones'));
    setBestsellers(products.filter(p => p.bestseller === true));
  }, [products]);

  return (
    <div className="px-4 py-10 mx-auto max-w-[1300px]">
      <h2 className="mb-4 text-3xl font-bold text-center">Featured Products</h2>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-8 text-lg font-semibold">
        <button
          onClick={() => setActiveTab('phones')}
          className={`border-b-2 pb-1 transition-all duration-300 ${
            activeTab === 'phones'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-gray-500 hover:text-orange-500'
          }`}
        >
          PHONES
        </button>
        <button
          onClick={() => setActiveTab('bestsellers')}
          className={`border-b-2 pb-1 transition-all duration-300 ${
            activeTab === 'bestsellers'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-gray-500 hover:text-orange-500'
          }`}
        >
          BEST SELLING
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {(activeTab === 'phones' ? phones : bestsellers).map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
