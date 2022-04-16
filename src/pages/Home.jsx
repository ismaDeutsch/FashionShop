import React, { useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import Slider from "../components/Slider";
import Categorie from "../components/Categorie";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getWhish } from "../redux/apiCalls";

const Home = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    user && getWhish(dispatch, user.user._id);
  }, [dispatch, user]);

  return (
    <div>
      <NavBar />
      <Slider />
      <Categorie />
      <Products home={true} />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
