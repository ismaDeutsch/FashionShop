import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import CnxPopUp from "../components/CnxPopUp";
import Summary from "../components/Summary";
import { Delete } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { removeProduct } from "../redux/cartRedux";
import { Link } from "react-router-dom";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "trasparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;
const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #${(props) => props.color};
`;

const ProductSize = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Button = styled.button`
  width: ${(props) => (props.empty ? "null" : "100%")};
  margin-top: 18px;
  padding: 10px;
  background-color: black;
  color: white;
  border:none;
  font-weight: 600;
  cursor: pointer;
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Panier = styled.img`
  height: 240px;
`;

const EmptyMessage = styled.p`
  font-size: 27px;
  text-align: center;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handlePopUp = () => {
    setOpen(!open);
  };

  const handleDelete = (product) => {
    dispatch(removeProduct(product));
  };

  return (
    <Container>
      <NavBar />
      <Wrapper>
        <Title>Votre Pannier</Title>
        <Top>
          {cart.amout ? <TopButton>Continuer les achats</TopButton> : null}
          <TopTexts>
            <TopText>Pannier({cart.amount})</TopText>
            <TopText>List de souhaits(0)</TopText>
          </TopTexts>
        </Top>
        <Hr />
        {cart.amount ? (
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <Product key={product._id}>
                  <ProductDetail>
                    <Image src={product.image} />
                    <Details>
                      <ProductName>
                        <b>Produit:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Taille:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <ProductAmount>{product.amount}</ProductAmount>
                      <Delete
                        style={{
                          fontSize: 30,
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(product)}
                      />
                    </ProductAmountContainer>
                    <ProductPrice>
                      {(product.price * product.amount).toFixed(2)} €
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
            <Summary cart={cart} handle={handlePopUp} payment={true} />
          </Bottom>
        ) : (
          <Empty>
            <Panier src="./img/panier.png" />
            <EmptyMessage>VOTRE PANIER EST VIDE!</EmptyMessage>
            <Link to="/products">
              <Button empty={true}>ACHETER MAINTENANT</Button>
            </Link>
          </Empty>
        )}
        <CnxPopUp open={open} setOpen={setOpen} />
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
