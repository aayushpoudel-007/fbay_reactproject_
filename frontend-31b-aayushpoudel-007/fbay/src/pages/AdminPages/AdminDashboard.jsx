import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createProductAPI,
  deleteProductAPI,
  getAllProductsAPI,
} from "../../apis/Api";

const AdminDashboard = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProductsAPI().then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productImage", productImage);
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);

    createProductAPI(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Delete this product?");
    if (!confirm) {
      return;
    } else {
      deleteProductAPI(id).then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          window.location.reload();
        }
      });
    }
  };

  return (
    <>
      <div className="m-4">
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Product
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add a new product?
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <label>Enter the product's name</label>
                  <input
                    onChange={(e) => setProductName(e.target.value)}
                    className="form-control mb-2"
                    type="text"
                    name=""
                    id=""
                    placeholder={""}
                  />

                  <label htmlFor="">Enter the product's description</label>
                  <textarea
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="form-control mb-2"
                    placeholder={""}
                    cols="4"
                    rows="4"
                  ></textarea>

                  <label htmlFor="">Enter the product's price in USD</label>
                  <input
                    onChange={(e) => setProductPrice(e.target.value)}
                    type="number"
                    className="form-control mb-2"
                    placeholder=""
                  />

                  <label>Upload the product's image</label>
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    className="form-control"
                  />

                  {previewImage && (
                    <img
                      src={previewImage}
                      className="img-fluid rounded object-cover mt-2"
                    />
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <table className="table mt-2 table-borderless">
          <thead className="table">
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Product Price</th>
              <th>Update/Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr>
                <td>
                  <img src={item.productImageUrl} height={40} width={40} />
                </td>
                <td>{item.productName}</td>
                <td>{item.productDescription.slice(0, 10)}</td>
                <td>USD.{item.productPrice}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <Link
                      to={`/admin/edit/${item._id}`}
                      type="button"
                      className="btn btn-success"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
