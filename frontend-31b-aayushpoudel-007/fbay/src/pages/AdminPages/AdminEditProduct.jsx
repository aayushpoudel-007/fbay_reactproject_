import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleProductAPI, updateProductAPI } from "../../apis/Api";

const AdminEditProduct = () => {
  
  const { id } = useParams();

 
  useEffect(() => {
    getSingleProductAPI(id).then((res) => {
      console.log(res.data);
      setProductName(res.data.product.productName);
      setProductPrice(res.data.product.productPrice);
      setProductDescription(res.data.product.productDescription);
      setOldImage(res.data.product.productImageUrl);
    });
  }, [id]);

  
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [oldImage, setOldImage] = useState("");

  
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    formData.append("productImage", productImage);

    
    updateProductAPI(id, formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/admin/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error");
      });
  };

  return (
    <>
      <div className="m-4">
        <h3>
          Updating the product
        </h3>

        <div className="d-flex gap-3">
          <form action="">
            <label>Select a new product image</label>
            <input
              onChange={handleImageUpload}
              type="file"
              className="form-control"
                      />
                      
            <label>Type the new product name</label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="form-control mb-2"
              type="text"
              name=""
              id=""
              placeholder="Enter the product name"
            />

            <label htmlFor="">Update the product description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="form-control mb-2"
              placeholder={"Enter the product description"}
              cols="4"
              rows="4"
            ></textarea>

            <label htmlFor="">Update the product price</label>
            <input
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              type="number"
              className="form-control mb-2"
              placeholder="Enter the product price"
            />

            <button
              onClick={handleSubmit}
              className="btn btn-primary w-100 mt-2"
            >
              Confirm the product update?
            </button>
          </form>
          <div>
            <h6>Current image</h6>
            <img
              className="img-fluid rounded-4 object-fit-cover"
              width={300}
              height={300}
              src={oldImage}
              alt=""
            />

            <h6 className="mt-4">New image</h6>
            {previewImage ? (
              <img
                src={previewImage}
                alt="product Image"
                className="img-fluid rounded-4 object-fit-cover"
                width={300}
                height={300}
              />
            ) : (
              <p>No image has been selected</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEditProduct;
