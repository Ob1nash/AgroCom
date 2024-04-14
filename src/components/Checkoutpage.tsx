import { useState } from 'react';
import { useLocation } from 'react-router-dom';



const CheckoutPage = () => {
 const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
 });

 const location = useLocation();
 const totalAmount = location.state?.totalAmount || 0;


 const handlePurchaseConfirmation = () => {
    // Implement logic to confirm purchase
    alert('Your purchase has been confirmed!');
    window.location.reload();
 };

 // Example of a form to collect shipping details
 const handleInputChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = event.target;
    setShippingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
 };

 return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">Checkout</h2>
      {/* Shipping details form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>
        {/* Form fields for shipping details */}
        {/* Example for fullName */}
        <input
          type="text"
          name="fullName"
          value={shippingDetails.fullName}
          onChange={handleInputChange}
          placeholder="Full Name"
        />
        <input
          type="text"
          name="address"
          value={shippingDetails.address}
          onChange={handleInputChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="city"
          value={shippingDetails.city}
          onChange={handleInputChange}
          placeholder="City"
        />
        <input
          type="text"
          name="state"
          value={shippingDetails.state}
          onChange={handleInputChange}
          placeholder="State"
        />
        <input
          type="text"
          name="zip"
          value={shippingDetails.zip}
          onChange={handleInputChange}
          placeholder="Zip"
        />
        <input
          type="text"
          name="country"
          value={shippingDetails.country}
          onChange={handleInputChange}
          placeholder="Country"
        />
        {/* Add other fields similarly */}
      </div>
      {/* Total amount section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Total Amount</h3>
        <p>${totalAmount.toFixed(2)}</p>
      </div>
      {/* Purchase button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handlePurchaseConfirmation}
        aria-label="Confirm Purchase"
      >
        Confirm Purchase
      </button>
    </div>
 );
};

export default CheckoutPage;
