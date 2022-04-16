import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login1 from "./pages/Login1";
import ProductList from "./pages/ProductList";
import Register1 from "./pages/Register1";
import Profil from "./pages/Profil";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import OrderReview from "./pages/OrderReview";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Orders from "./pages/Orders";
import BookAddress from "./pages/BookAddress";
import WhishList from "./pages/WhishList";
import PasswordReset from "./pages/PasswordReset";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/login"
          element={user !== null ? <Navigate to="/profil" /> : <Login1 />}
        />
        <Route
          path="/profil"
          element={user === null ? <Navigate to="/login" /> : <Profil />}
        />
        {user !== null ? (
          <Route
            path={`/profil/myorders/${user.user._id}`}
            element={user === null ? <Navigate to="/login" /> : <Orders />}
          />
        ) : null}

        <Route
          path="/profil/myorders/review/:id"
          element={user === null ? <Navigate to="/login" /> : <OrderReview />}
        />
        <Route
          path="/profil/mybookaddress"
          element={user === null ? <Navigate to="/login" /> : <BookAddress />}
        />
        <Route
          path="/profil/mywhishlist"
          element={user === null ? <Navigate to="/login" /> : <WhishList />}
        />
        <Route
          path="/profil"
          element={user === null ? <Navigate to="/login" /> : <Profil />}
        />

        <Route
          path="/password-reset/:userId/:token"
          element={user ? <Navigate to="/" /> : <PasswordReset />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register1 />}
        />
        <Route
          path="/checkout/payment"
          element={
            user && localStorage.getItem("cart") ? (
              <Payment />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/checkout/success" element={<Success />} />
      </Routes>
    </Router>
  );
};

export default App;
