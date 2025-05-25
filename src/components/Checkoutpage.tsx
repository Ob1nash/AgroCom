import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEventHandler } from 'react';

const CheckoutPage = () => {
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const location = useLocation();
  const navigate = useNavigate();
  const totalAmount = location.state?.totalAmount || 0;
  const cartItems = location.state?.cartItems || [];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Validate shipping details
    if (!shippingDetails.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!shippingDetails.address.trim()) newErrors.address = 'Address is required';
    if (!shippingDetails.city.trim()) newErrors.city = 'City is required';
    if (!shippingDetails.state.trim()) newErrors.state = 'State is required';
    if (!shippingDetails.zip.trim()) newErrors.zip = 'ZIP code is required';
    if (!shippingDetails.country.trim()) newErrors.country = 'Country is required';

    // Validate payment details
    if (!paymentDetails.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!paymentDetails.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!paymentDetails.cvv.trim()) newErrors.cvv = 'CVV is required';
    if (!paymentDetails.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePurchaseConfirmation = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    alert('🎉 Your purchase has been confirmed! Thank you for shopping with us.');
    navigate('/');
  };

  const handleShippingChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setShippingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePaymentChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const handleCardNumberChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    const formattedValue = formatCardNumber(value);
    setPaymentDetails(prev => ({ ...prev, cardNumber: formattedValue }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🛒 Checkout</h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Shipping Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                🚚 <span className="ml-2">Shipping Details</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    name="fullName"
                    value={shippingDetails.fullName}
                    onChange={handleShippingChange}
                    placeholder="Full Name"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleShippingChange}
                    placeholder="Street Address"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleShippingChange}
                    placeholder="City"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="state"
                    value={shippingDetails.state}
                    onChange={handleShippingChange}
                    placeholder="State"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="zip"
                    value={shippingDetails.zip}
                    onChange={handleShippingChange}
                    placeholder="ZIP Code"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.zip ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="country"
                    value={shippingDetails.country}
                    onChange={handleShippingChange}
                    placeholder="Country"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.country ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                💳 <span className="ml-2">Payment Details</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handlePaymentChange}
                    placeholder="123"
                    maxLength={4}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.cvv ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    name="cardholderName"
                    value={paymentDetails.cardholderName}
                    onChange={handlePaymentChange}
                    placeholder="Cardholder Name"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.cardholderName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                📋 <span className="ml-2">Order Summary</span>
              </h3>
              
              {cartItems.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Items in your order:</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {cartItems.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity || 1}</span>
                        <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <hr className="my-4" />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${(totalAmount * 0.08).toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">${(totalAmount * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <button
                className={`w-full mt-6 py-4 px-6 rounded-lg font-semibold text-white text-lg transition-all transform hover:scale-105 ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl'
                }`}
                onClick={handlePurchaseConfirmation}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  '🔒 Confirm Purchase'
                )}
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                🔐 Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;