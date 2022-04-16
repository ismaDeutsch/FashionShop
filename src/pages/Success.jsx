import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import styled from "styled-components";
import { userRequest } from "../requestMethods";
import { deleteCart } from "../redux/cartRedux";
import CheckoutBar from "../components/CheckoutBar";
import { CheckCircleOutline } from "@material-ui/icons";
import { Button } from "../components/Settings";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const Title = styled.h2``;

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState();
  const [decStock, setdecStock] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser.user._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
            color: item.color,
            size: item.size,
          })),
          amount: cart.total.toFixed(2),
          shippingAddress: data.shipping.address,
        });
        localStorage.removeItem("cart");
        dispatch(deleteCart());
        setOrderId(res.data._id);
      } catch (err) {
        console.log(err);
      }
    };
    data && createOrder();
  }, [cart, data, currentUser, dispatch]);

  useEffect(() => {
    const decStock = async () => {
      try {
        for (const product of cart.products) {
          await userRequest.put("/products/stock/quantity", {
            productId: product._id,
            amount: product.amount,
          });
        }
        setdecStock(true);
      } catch (error) {
        console.log(error);
      }
    };
    (data, orderId) && decStock();
  }, [cart, data, orderId]);

  return (
    <Container>
      <CheckoutBar />
      <Wrapper>
        <CheckCircleOutline style={{ fontSize: "250px", color: "#4CAF50" }} />
        {(orderId, decStock) ? (
          <Title>
            Order has been created successfully. <br /> Your order number is{" "}
            {orderId}
          </Title>
        ) : (
          <Title>
            Successfull. Your order is being prepared...
            <CircularProgress disableShrink />
          </Title>
        )}
        <Link to="/">
          <Button style={{ marginTop: "20px", width: "auto" }}>
            Retour à l'accueil
          </Button>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Success;
