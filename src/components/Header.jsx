import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

function Header() {
  const { state } = useCart();
  const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Freshh
          </Link>
          <div className="flex items-center space-x-4">
            <Heart className="w-6 h-6 text-gray-500 cursor-pointer hover:text-red-500" />
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-500" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0a2472] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;