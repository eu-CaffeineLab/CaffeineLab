import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function Cart() {
  const { language, t } = useLanguage();
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const [step, setStep] = useState('cart'); // cart, checkout, payment, confirmation
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardPaymentType, setCardPaymentType] = useState(''); // online or onDelivery

  const handleCheckout = () => {
    if (deliveryAddress.trim()) {
      setStep('payment');
    } else {
      alert(language === 'en' ? 'Please enter delivery address' : 'გთხოვთ შეიყვანეთ მიწოდების მისამართი');
    }
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    if (method === 'cash') {
      setStep('confirmation');
    } else if (method === 'card') {
      setStep('cardOptions');
    }
  };

  const handleCardPaymentType = (type) => {
    setCardPaymentType(type);
    if (type === 'online') {
      // In a real app, redirect to Stripe here
      setStep('confirmation');
    } else {
      setStep('confirmation');
    }
  };

  if (step === 'cart') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="coffee-gradient text-white p-6">
          <div className="max-w-6xl mx-auto">
            <Link href="/shop">
              <button className="text-white hover:underline">&larr; {t('shop')}</button>
            </Link>
            <h1 className="text-3xl font-bold mt-2">{t('cart')}</h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-6">{language === 'en' ? 'Your cart is empty' : 'თქვენი კალათა ცარიელია'}</p>
              <Link href="/shop">
                <button className="bg-coffee text-white px-6 py-3 rounded-lg font-bold">
                  {t('shop')}
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-coffee">
                        {language === 'en' ? item.nameEn : item.nameKa}
                      </h3>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-16 border rounded px-2 py-1"
                      />
                      <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-coffee mb-4">{t('deliveryAddress')}</h2>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder={language === 'en' ? 'Enter your delivery address' : 'შეიყვანეთ მიწოდების მისამართი'}
                  className="w-full border rounded-lg p-4 mb-4 h-24"
                />
              </div>

              <div className="mt-8 bg-white rounded-lg shadow p-6">
                <p className="text-2xl font-bold text-coffee">{t('total')}: ${total.toFixed(2)}</p>
                <button
                  onClick={handleCheckout}
                  className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-lg"
                >
                  {t('checkout')}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="coffee-gradient text-white p-6">
          <h1 className="max-w-6xl mx-auto text-3xl font-bold">{t('paymentMethod')}</h1>
        </header>

        <main className="max-w-2xl mx-auto p-6 mt-8">
          <div className="space-y-4">
            <button
              onClick={() => handlePaymentSelect('cash')}
              className="w-full bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all hover:bg-blue-50"
            >
              <h3 className="text-2xl font-bold text-coffee mb-2">💵 {t('cashOnDelivery')}</h3>
              <p className="text-gray-600">{language === 'en' ? 'Pay when delivery arrives' : 'გადაიხადეთ მიწოდების დროს'}</p>
            </button>

            <button
              onClick={() => handlePaymentSelect('card')}
              className="w-full bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all hover:bg-blue-50"
            >
              <h3 className="text-2xl font-bold text-coffee mb-2">💳 {language === 'en' ? 'Card Payment' : 'ბარათის გადახდა'}</h3>
              <p className="text-gray-600">{language === 'en' ? 'Choose payment timing' : 'აირჩიეთ გადახდის დრო'}</p>
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'cardOptions') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="coffee-gradient text-white p-6">
          <h1 className="max-w-6xl mx-auto text-3xl font-bold">💳 {language === 'en' ? 'Card Payment Options' : 'ბარათის გადახდის ვარიანტები'}</h1>
        </header>

        <main className="max-w-2xl mx-auto p-6 mt-8">
          <div className="space-y-4">
            <button
              onClick={() => handleCardPaymentType('online')}
              className="w-full bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all hover:bg-blue-50"
            >
              <h3 className="text-2xl font-bold text-coffee mb-2">{t('cardPaymentOnline')}</h3>
              <p className="text-gray-600">{language === 'en' ? 'Pay now with your card' : 'გადაიხადეთ ახლავე თქვენი ბარათით'}</p>
            </button>

            <button
              onClick={() => handleCardPaymentType('onDelivery')}
              className="w-full bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all hover:bg-blue-50"
            >
              <h3 className="text-2xl font-bold text-coffee mb-2">{t('cardPaymentOnDelivery')}</h3>
              <p className="text-gray-600">{language === 'en' ? 'Transfer payment when delivery arrives' : 'გადაიხადეთ მიწოდების დროს ტელეფონით გადმორიცხვის მეშვეობით'}</p>
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="coffee-gradient text-white p-6">
          <h1 className="max-w-6xl mx-auto text-3xl font-bold">✅ {t('orderConfirmed')}</h1>
        </header>

        <main className="max-w-2xl mx-auto p-6 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-coffee mb-4">{t('orderConfirmed')}</h2>
            <p className="text-gray-600 mb-2">{language === 'en' ? 'Delivery Address:' : 'მიწოდების მისამართი:'} {deliveryAddress}</p>
            <p className="text-gray-600 mb-2">{language === 'en' ? 'Payment Method:' : 'გადახდის მეთოდი:'} 
              {paymentMethod === 'cash' ? (language === 'en' ? ' Cash on Delivery' : ' ნაღდი ფულით') :
               cardPaymentType === 'online' ? (language === 'en' ? ' Card Payment Online' : ' ონლაინ ბარათის გადახდა') :
               (language === 'en' ? ' Card Payment on Delivery' : ' ბარათის გადახდა მიწოდების დროს')}
            </p>
            <p className="text-2xl font-bold text-green-600 mb-6">{t('total')}: ${total.toFixed(2)}</p>
            <Link href="/shop">
              <button className="bg-coffee hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-bold">
                {language === 'en' ? 'Continue Shopping' : 'გაგრძელება ყიდვა'}
              </button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
}
