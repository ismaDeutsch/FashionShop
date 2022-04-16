import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar/NavBar";
import { Button } from "../components/Settings";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { CheckCircleOutline } from "@material-ui/icons";
import ReviewForm from "../components/ReviewForm";
import { userRequest } from "../requestMethods";

const Container = styled.div``;

const Wrapper = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
`;

const OrderItems = () => {
  const [order, setOrder] = useState({});
  const [allReviews, setAllReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState("");
  const location = useLocation();
  const id = location.pathname.split("/")[4];
  const orders = useSelector((state) => state.order.orders);
  const user = useSelector((state) => state.user.currentUser.user);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const getProductsOrder = () => {
      setOrder(orders.filter((order) => order._id === id)[0]);
    };
    getProductsOrder();
  }, [id, orders]);

  const commentPost = async (productId, comment, rat) => {
    try {
      await userRequest.put("/products/order/review", {
        userId: user._id,
        productId: productId,
        rating: rat,
        comment: comment,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allReviews.length > 0) {
      allReviews.forEach(async (review) => {
        if (review.comment?.length > 10) {
          await commentPost(review.productId, review.comment, review.rating);
          setOpen(true);
        } else setErrors("Il faut remplir tous les champs qu'ils ont *");
      });
    } else {
      setErrors("Il faut remplir tous les champs qu'ils ont *");
    }
  };

  const getDetailsProduct = (id) => {
    return products.filter((product) => product._id === id);
  };

  return (
    <Container>
      <NavBar />
      <Wrapper>
        <Title>Rédiger Un Commentaire</Title>
        <span style={{ color: "red", marginTop: 10 }}>{errors}</span>
        {order.products?.map((product, index) => (
          <ReviewForm
            key={product.productId + index}
            product={product}
            img={getDetailsProduct(product.productId)[0].image}
            name={getDetailsProduct(product.productId)[0].title}
            setAllReviews={setAllReviews}
            allReviews={allReviews}
          />
        ))}
        <Dialog open={open} maxWidth="sm" fullWidth>
          <DialogContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CheckCircleOutline
                style={{ fontSize: "100px", color: "#4CAF50" }}
              />
              <DialogContentText>
                Votre commentaire à bien était enregistré
              </DialogContentText>
            </div>
          </DialogContent>
          <DialogActions>
            <Link to={`/profil/myorders/${user._id}`}>
              <Button type="edit">Retour</Button>
            </Link>
          </DialogActions>
        </Dialog>
        <Button
          type="sub"
          style={{ marginTop: "60px", width: "240px" }}
          onClick={handleSubmit}
        >
          SOUMETTRE
        </Button>
      </Wrapper>
    </Container>
  );
};

export default OrderItems;
