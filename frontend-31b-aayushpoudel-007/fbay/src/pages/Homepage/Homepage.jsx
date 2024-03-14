import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProductsAPI } from '../../apis/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/product/get_products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    getAllProductsAPI().then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);

    toast.success(`${product.productName} added to cart!`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isEmptyCart = cart.length === 0;

  const handleProductClick = (_id) => {
    // Do nothing if the click target is not the product name
    return;

    navigate(`/product/${_id}`);
  };

  return (
    <div className='row'>
      <div className='col-md-8'>
        <input
          type='text'
          placeholder='Search products...'
          value={searchTerm}
          onChange={handleSearchChange}
          className='form-control mb-3'
        />
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4'>
          {filteredProducts.map((product, index) => (
            <div key={index} className='col mb-4'>
              <div className="card p-0 overflow-hidden h-100 shadow" onClick={() => handleProductClick(product._id)}>
                <img src={product.productImageUrl} className="card-img-top img-fluid" alt={product.productName} style={{ width: '200px', height: '200px' }} />
                <div className="card-body">
                  <h3 onClick={() => navigate(`/product/${product._id}`)}>{product.productName}</h3>
                  <p>{product.productDescription}</p>
                  <p>${product.productPrice}</p>
                  <button className="btn btn-primary mb-2" onClick={() => addToCart(product)}>Add to cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='col-md-4'>
        <h2>Shopping Cart</h2>
        {isEmptyCart ? (
          <div>
            <p>Your cart is empty!</p>
          </div>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, cartIndex) => (
                  <tr key={cartIndex}>
                    <td>{item.productName}</td>
                    <td>${item.productPrice}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => removeFromCart(cartIndex)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/checkout">
              <button className="btn btn-success">Checkout</button>
            </Link>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Homepage;
