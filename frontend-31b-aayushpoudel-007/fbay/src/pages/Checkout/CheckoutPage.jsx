import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PaymentQRImage from '../../components/pictures/payment_qr.jpg';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [contactNumber, setContactNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [selectedCity, setSelectedCity] = useState('Kathmandu');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Esewa');
  const [paymentId, setPaymentId] = useState('');

  const handleConfirmOrder = () => {
    if (!contactNumber || !shippingAddress || (selectedPaymentMethod !== 'CashOnDelivery' && !paymentId)) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    toast.success('Your order has been confirmed', {
      onClose: () => {
        navigate('/homepage');
      },
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Checkout Page</h1>
      <form style={styles.form}>
        <label style={styles.label}>Contact Number:</label>
        <input
          type="text"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Shipping Address:</label>
        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>City:</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          style={styles.select}
        >
          <option value="Kathmandu">Kathmandu</option>
          <option value="Lalitpur">Lalitpur</option>
          <option value="Bhaktapur">Bhaktapur</option>
        </select>

        <label style={styles.label}>Payment Method:</label>
        <select
          value={selectedPaymentMethod}
          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          style={styles.select}
        >
          <option value="Esewa">Esewa</option>
          <option value="Khalti">Khalti</option>
          <option value="CashOnDelivery">Cash on Delivery</option>
        </select>

        {(selectedPaymentMethod === 'Esewa' || selectedPaymentMethod === 'Khalti') && (
          <div>
            <label style={styles.label}>{selectedPaymentMethod} ID:</label>
            <input
              type="text"
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
              style={styles.input}
            />
            <img src={PaymentQRImage} alt={`${selectedPaymentMethod} QR`} style={styles.paymentImage} />
          </div>
        )}

        <button type="button" onClick={handleConfirmOrder} style={styles.button}>
          Confirm Order
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    fontSize: '14px',
  },
  select: {
    padding: '8px',
    fontSize: '14px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
  },
  paymentImage: {
    maxWidth: '100%',
    marginTop: '10px',
  },
};

export default CheckoutPage;
