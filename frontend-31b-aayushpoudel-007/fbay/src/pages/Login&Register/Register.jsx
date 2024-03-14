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
import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerAPI } from "../../apis/Api";
import logo from "../../components/pictures/logo.png";
import Footer from "../../components/footer/Footer";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(firstName, lastName, email, password);

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    registerAPI(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error");
      });
  };
  return (
    <>
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src={logo}
              alt="Register form"
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
                SIGN UP
              </h5>

              <MDBInput
                onChange={changeFirstName}
                wrapperClass="mb-4"
                label="First Name"
                id="formControlLg"
                type="email"
                size="lg"
              />

              <MDBInput
                onChange={changeLastName}
                wrapperClass="mb-4"
                label="Last Name"
                id="formControlLg"
                type="email"
                size="lg"
              />

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

              <div class="pt-1 mb-4">
                <button
                  onClick={handleSubmit}
                  class="btn btn-dark btn-lg"
                  type="button"
                >
                  R E G I S T E R
                </button>
              </div>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Already have an account?{" "}
                <a href="/" style={{ color: "#393f81" }}>
                  Sign in here
                </a>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
    <Footer></Footer>
    </>
  );
};

export default Register;
