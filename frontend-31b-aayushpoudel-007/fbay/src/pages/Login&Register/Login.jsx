import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  
import { forgotPasswordApi, loginAPI } from "../../apis/Api";
import Preloader from "../../components/animations/Preloader";
import logo from "../../components/pictures/logo.png";
import Footer from "../../components/footer/Footer";
import { toast } from 'react-toastify';

import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import ForgetPassword from "../Password/ForgotPassword";

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleForgotPasswordEmail = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    const data = {
      email: forgotPasswordEmail,
    };
    forgotPasswordApi(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || "Internal server error");
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const data = {
        email: email,
        password: password,
      };

      const res = await loginAPI(data);

      if (res.status === 200) {
        if (res.data.success) {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);

          const convertedJson = JSON.stringify(res.data.userData);
          localStorage.setItem("user", convertedJson);

          navigate && navigate("/homepage");
        } else {
          toast.error(res.data.message || "Login Failed");
        }
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    }
  };

  return (
    <>
      <Preloader />
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src={logo}
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <span className="h1 fw-bold mb-0"></span>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  SIGN IN TO YOUR ACCOUNT
                </h5>

                <MDBInput
                  onChange={changeEmail}
                  wrapperClass="mb-4"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                />
                <MDBInput
                  onChange={changePassword}
                  wrapperClass="mb-4"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                />

                <div className="pt-1 mb-4">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-dark btn-lg"
                    type="button"
                  >
                    L O G I N
                  </button>
                </div>
                <div className="mt-3 d-flex justify-content-end w-100">
                <a
                  type="button"
                  className="text-decoration-none text-muted"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Forgot Password?
                </a>
 
                <div
                  class="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content bg-dark text-white">
                      <div class="modal-header text-center align-items-center">
                        <h5 class="modal-title w-100" id="staticBackdropLabel">
                          Change Password
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <label>Enter your email</label>
                        <input
                          type="email"
                          onChange={handleForgotPasswordEmail}
                          className="form-control text-light"
                          id="email"
                          placeholder="Enter your email"
                          style={{ color: "white" }}
                        />
                      </div>
                      <div class="modal-footer">
                        {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                        <button
                          type="button"
                          class="btn btn-secondary"
                          onClick={forgotPassword}
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                 
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Don't have an account?{" "}
                  <a href="register" style={{ color: "#393f81" }}>
                    Register here
                  </a>
                </p>

                <div className="d-flex flex-row justify-content-start">
                  <a href="#!" className="small text-muted me-1">
                    Terms of use.
                  </a>
                  <a href="#!" className="small text-muted">
                    Privacy policy
                  </a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
      <Footer />
    </>
  );
};

export default Login;
