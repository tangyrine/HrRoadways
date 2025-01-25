import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  CreditCardIcon, 
  Wallet, 
  ShieldCheck, 
  QrCode, 
  CheckCircle 
} from 'lucide-react';

const PaymentOptions = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  // Diagnostic logging
  useEffect(() => {
    console.log('Payment Component Mounted');
    console.log('Selected Payment Method:', selectedPaymentMethod);
  }, [selectedPaymentMethod]);

  const paymentMethods = [
    { 
      id: 'credit', 
      icon: CreditCard, 
      title: 'Credit Card', 
      description: 'Pay securely with your credit card' 
    },
    { 
      id: 'debit', 
      icon: CreditCardIcon, 
      title: 'Debit Card', 
      description: 'Use your bank debit card' 
    },
    { 
      id: 'upi', 
      icon: QrCode, 
      title: 'UPI', 
      description: 'Quick and instant payment' 
    },
    { 
      id: 'wallet', 
      icon: Wallet, 
      title: 'Digital Wallet', 
      description: 'Pay using mobile wallets' 
    }
  ];

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderPaymentForm = () => {
    switch(selectedPaymentMethod?.id) {
      case 'credit':
      case 'debit':
        return (
          <div className="payment-form bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {selectedPaymentMethod.title} Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailsChange}
                  placeholder="1234 5678 9012 3456"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* Rest of the input fields remain the same */}
            </div>
          </div>
        );
      case 'upi':
        return (
          <div className="payment-form bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              UPI Payment
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">UPI ID</label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <QrCode className="mr-2 text-blue-500" size={20} />
                Scan QR code with your UPI app
              </div>
            </div>
          </div>
        );
      case 'wallet':
        return (
          <div className="payment-form bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Digital Wallets
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {['Paytm', 'PhonePe', 'Google Pay', 'Amazon Pay'].map((wallet) => (
                <div 
                  key={wallet} 
                  className="wallet-option border rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition"
                >
                  {wallet}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="payment-container bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Payment methods sidebar */}
          <div className="md:w-1/3 bg-gray-50 p-6 border-r">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Payment Methods
            </h2>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id}
                  onClick={() => handlePaymentMethodSelect(method)}
                  className={`payment-method-item flex items-center p-4 rounded-lg cursor-pointer transition ${
                    selectedPaymentMethod?.id === method.id 
                      ? 'bg-blue-100 border-blue-500 border' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <method.icon className={`mr-4 ${
                    selectedPaymentMethod?.id === method.id 
                      ? 'text-blue-600' 
                      : 'text-gray-600'
                  }`} size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800">{method.title}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment form area */}
          <div className="md:w-2/3 p-8">
            {selectedPaymentMethod ? (
              renderPaymentForm()
            ) : (
              <div className="text-center py-12 text-gray-500">
                <ShieldCheck className="mx-auto mb-4 text-blue-500" size={48} />
                <p>Select a payment method to proceed</p>
              </div>
            )}

            {selectedPaymentMethod && (
              <div className="mt-6 flex justify-between items-center">
                <div className="text-xl font-bold text-gray-800">
                  Total Payable: ₹2,500
                </div>
                <button 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center"
                >
                  <CheckCircle className="mr-2" size={20} />
                  Confirm Payment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Security footer */}
        <div className="bg-blue-50 p-4 flex items-center justify-center text-blue-800">
          <ShieldCheck className="mr-2" size={20} />
          <span>100% Safe & Secure Payment</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;