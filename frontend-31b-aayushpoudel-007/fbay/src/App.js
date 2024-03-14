import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./pages/Login&Register/Login";
import Register from "./pages/Login&Register/Register";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import AdminEditProduct from "./pages/AdminPages/AdminEditProduct";
import Navbar from "./components/Navbar";
import AdminRoutes from "./protected_routes/AdminRoutes/AdminRoutes";
import Homepage from "./pages/Homepage/Homepage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ResetPassword from "./pages/Password/ResetPassword";
import ProductDetails from "./pages/ProductDetails/ProductDetails";


function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/" element={<Login></Login>} />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/password/reset/:token" element={<ResetPassword/>} />
        <Route element={<AdminRoutes/>}>
        <Route path="/admin/dashboard" element={<AdminDashboard></AdminDashboard>} />
        <Route path="/admin/edit/:id" element={<AdminEditProduct></AdminEditProduct>} />

        <Route path="/homepage" element={<Homepage></Homepage>} />

        <Route path="/checkout" element={<CheckoutPage></CheckoutPage>} />

        <Route path="/profile" element={<ProfilePage></ProfilePage>} />

        <Route path="/product/:id" element={<ProductDetails />} />


    
       


        </Route>
      </Routes>
    </Router>
  );
}

export default App;
