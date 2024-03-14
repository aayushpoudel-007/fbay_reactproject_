import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProductAPI } from "../../apis/Api";

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  console.log(id);

  useEffect(() => {
    const fetchProduct = async () => {
        console.log('shdsafjdksal')
      try {
        const response = await getSingleProductAPI(id); 
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container mt-5">
      <div className="d-flex">
        <img
          className="object-cover rounded-3"
          height={"500px"}
          width={"600px"}
          src={product.productImageUrl} 
          alt={product.productName} 
        />
        <div className="ms-3 mt-4">
          <span className="fs-3 fw-bold">{product.productName}</span>
          <p className="fs-4">${product.productPrice}</p>
          <p className="fs-4">{product.productCategory}</p>
          <p className="fs-4">{product.productDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;