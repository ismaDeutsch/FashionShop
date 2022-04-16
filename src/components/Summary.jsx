import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { payCart } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  padding: 20px;
  height: 40vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: ${(props) => (props.empty ? "null" : "100%")};
  margin-top: 18px;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  border: none;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

const Summary = ({ cart, address, payment, handle }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [stripeToken, setStripeToken] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total.toFixed(0) * 100,
          address: address,
        });
        dispatch(payCart());
        setTimeout(() => {
          navigate("/checkout/success", {
            state: { stripeData: res.data, cart: cart },
          });
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, address, cart, dispatch, navigate]);

  return (
    <Container>
      <SummaryTitle>Récapitulatif de la commande</SummaryTitle>
      <SummaryItem>
        <SummaryItemText>Sous Total</SummaryItemText>
        <SummaryItemPrice>{cart.total.toFixed(2)} €</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
        <SummaryItemText>Frais de livraison</SummaryItemText>
        <SummaryItemPrice>5 €</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
        <SummaryItemText>Remise sur l'expédition</SummaryItemText>
        <SummaryItemPrice>-5 €</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem type="total">
        <SummaryItemText>Total</SummaryItemText>
        <SummaryItemPrice>{cart.total.toFixed(2)} €</SummaryItemPrice>
      </SummaryItem>
      {payment ? (
        user  ? (
          <Link to="/checkout/payment">
            <Button>Passer commande</Button>
          </Link>
        ) : (
          <Button onClick={handle}>Passerrrrr commande</Button>
        )
      ) : (
        address && (
          <StripeCheckout
            name="Vitual Shop"
            image={process.env.PUBLIC_URL + "/img/diamant.png"}
            description={`votre total est ${cart.total.toFixed(2)} €`}
            email={user.user.email}
            amount={cart.total* 100}
            token={onToken}
            stripeKey={process.env.REACT_APP_STRIPE_API_KEY}
          >
            <Button>Paiement</Button>
          </StripeCheckout>
        )
      )}
    </Container>
  );
};

export default Summary;
