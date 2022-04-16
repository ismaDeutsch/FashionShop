import React from "react";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/UserList";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import Login from "./pages/Login";
import { useSelector } from "react-redux";

const App = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/"
          element={currentUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={!currentUser ? <Navigate to="/login" /> : <UserList />}
        />
        <Route
          path="/user/:userId"
          element={!currentUser ? <Navigate to="/login" /> : <User />}
        />
        <Route
          path="/newUser"
          element={!currentUser ? <Navigate to="/login" /> : <NewUser />}
        />
        <Route
          path="/products"
          element={!currentUser ? <Navigate to="/login" /> : <ProductList />}
        />
        <Route
          path="/product/:productId"
          element={!currentUser ? <Navigate to="/login" /> : <Product />}
        />
        <Route
          path="/newProduct"
          element={!currentUser ? <Navigate to="/login" /> : <NewProduct />}
        />
      </Routes>
    </Router>
  );
};

export default App;
