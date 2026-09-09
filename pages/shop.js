import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import Link from 'next/link';

export default function Shop() {
  const { language, t } = useLanguage();
  const { addToCart, cart } = useCart();
  const [message, setMessage] = useState('');

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(`Added ${language === 'en' ? product.nameEn : product.nameKa}!`);
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="coffee-gradient text-white p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">CaffeineLab</h1>
          <Link href="/cart">
            <button className="bg-white text-coffee px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-all">
              {t('cart')} ({cart.length})
            </button>
          </Link>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-coffee mb-8">{t('shop')}</h2>
        
        {message && (
          <div className="bg-green-500 text-white p-4 rounded-lg mb-6">
            {message}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="text-6xl text-center mb-4">{product.image}</div>
              <h3 className="text-2xl font-bold text-coffee mb-2">
                {language === 'en' ? product.nameEn : product.nameKa}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'en' ? product.descriptionEn : product.descriptionKa}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-green-600">${product.price}</span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-coffee hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-bold transition-all"
                >
                  {t('addToCart')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
