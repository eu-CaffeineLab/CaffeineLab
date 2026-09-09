import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen coffee-gradient flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-12 text-center">
        <h1 className="text-4xl font-bold mb-2 text-coffee">CaffeineLab</h1>
        <p className="text-gray-600 mb-8 text-lg">{t('tagline')}</p>
        
        <p className="text-xl font-semibold mb-8 text-gray-800">{t('selectLanguage')}</p>
        
        <div className="flex gap-6 justify-center">
          <button
            onClick={() => setLanguage('en')}
            className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
              language === 'en'
                ? 'bg-coffee text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            🇬🇧 English
          </button>
          
          <button
            onClick={() => setLanguage('ka')}
            className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
              language === 'ka'
                ? 'bg-coffee text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            🇬🇪 Georgian
          </button>
        </div>
        
        <Link href="/shop">
          <button className="mt-8 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all">
            {language === 'en' ? 'Continue to Shop' : 'დაიწყე ყიდვა'}
          </button>
        </Link>
      </div>
    </div>
  );
}
