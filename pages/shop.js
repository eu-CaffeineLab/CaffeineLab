import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { getProducts } from '../lib/supabase';
import Link from 'next/link';

export default function Shop() {
  const { language, t } = useLanguage();
  const { addToCart, cart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      nameEn: product.name_en,
      nameKa: product.name_ka,
      descriptionEn: product.description_en,
      descriptionKa: product.description_ka,
      price: product.price,
      image: product.image,
    });
    setMessage(`Added ${language === 'en' ? product.name_en : product.name_ka}!`);
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="coffee-gradient text-white p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">CaffeineLab ☕</h1>
          <div className="flex gap-4 items-center">
            <Link href="/admin">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-bold transition-all">
                🔧 Admin
              </button>
            </Link>
            <Link href="/cart">
              <button className="bg-white text-coffee px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-all">
                🛒 {t('cart')} ({cart.length})
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-coffee mb-8">{t('shop')}</h2>
        
        {message && (
          <div className="bg-green-500 text-white p-4 rounded-lg mb-6 font-bold">
            ✅ {message}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading products... ☕</p>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-xl text-gray-600 mb-4">No products available yet.</p>
            <Link href="/admin">
              <button className="bg-coffee text-white px-6 py-3 rounded-lg font-bold">
                Go to Admin Panel
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105">
                <div className="text-6xl text-center mb-4">{product.image}</div>
                <h3 className="text-2xl font-bold text-coffee mb-2">
                  {language === 'en' ? product.name_en : product.name_ka}
                </h3>
                <p className="text-gray-600 mb-4">
                  {language === 'en' ? product.description_en : product.description_ka}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-green-600">₾{product.price}</span>
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
        )}
      </main>
    </div>
  );
}
