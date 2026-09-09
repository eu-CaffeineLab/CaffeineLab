import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      selectLanguage: 'Select Language',
      english: 'English',
      georgian: 'Georgian',
      welcome: 'Welcome to CaffeineLab',
      tagline: 'Premium Coffee Delivery',
      shop: 'Shop',
      about: 'About',
      contact: 'Contact',
      addToCart: 'Add to Cart',
      cart: 'Cart',
      checkout: 'Checkout',
      paymentMethod: 'Payment Method',
      cashOnDelivery: 'Cash on Delivery',
      cardPaymentOnline: 'Pay Online with Card',
      cardPaymentOnDelivery: 'Pay on Delivery (Phone Transfer)',
      deliveryAddress: 'Delivery Address',
      placeOrder: 'Place Order',
      orderConfirmed: 'Order Confirmed!',
      total: 'Total',
      price: 'Price',
      quantity: 'Quantity',
    },
    ka: {
      selectLanguage: 'აირჩიეთ ენა',
      english: 'English',
      georgian: 'Georgian',
      welcome: 'კეთილი იყოს თქვენი მობრძანება CaffeineLab-ში',
      tagline: 'პრემიუმ ყავის მიწოდება',
      shop: 'მაღაზია',
      about: 'შესახებ',
      contact: 'კონტაქტი',
      addToCart: 'კალათში დამატება',
      cart: 'კალათი',
      checkout: 'გადახდა',
      paymentMethod: 'გადახდის მეთოდი',
      cashOnDelivery: 'ნაღდი ფულით მიწოდებისას',
      cardPaymentOnline: 'ონლაინ ბარათით გადახდა',
      cardPaymentOnDelivery: 'მიწოდებისას გადახდა (ტელეფონის გადაცემა)',
      deliveryAddress: 'მიწოდების მისამართი',
      placeOrder: 'შეკვეთის განთავსება',
      orderConfirmed: 'შეკვეთა დადასტურდა!',
      total: 'სულ',
      price: 'ფასი',
      quantity: 'რაოდენობა',
    },
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
