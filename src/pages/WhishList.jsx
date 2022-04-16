import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import NavBar from "../components/NavBar/NavBar";
import SideNav from "../components/SideNav";
import { DeleteOutline } from "@material-ui/icons";
import { getWhish, removeFromWhish } from "../redux/apiCalls";

const Container = styled.div``;

const Wrapper = styled.div`
  margin-left: 20px;
  padding-top: 25px;
  width: 100%;
`;

const Main = styled.main`
  display: flex;
  margin-left: 10rem;
`;

const Title = styled.h1`
  text-align: center;
`;

const SideRightArticlesItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  margin: 32px;
`;

const SideRightArticlesImg = styled.img`
  height: 300px;
  width: 250px;
`;

const SideRightArticlesItemDiv = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SideRightArticlesPrice = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const SideRightArticlesName = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 250px;
  overflow: hidden;
  color: #636364;
  font-size: 16px;
  margin-top: 10px;
`;

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const WhishList = () => {
  const products = useSelector((state) => state.product.products);
  const whishs = useSelector((state) => state.whish.products);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getWhish(dispatch, currentUser.user._id);
  }, [dispatch, currentUser]);

  const handleRemoveWhish = (id) => {
    removeFromWhish(dispatch, id);
  };

  return (
    <Container>
      <NavBar />
      <Main>
        <SideNav profil={true} />
        <Wrapper>
          <Title>MA LISTE D'ENVIE</Title>
          <Items>
            {products
              .filter((product) => whishs.includes(product._id))
              .map((product) => (
                <SideRightArticlesItem key={product._id}>
                  <SideRightArticlesImg src={product.image} />
                  <SideRightArticlesName>{product.title}</SideRightArticlesName>
                  <SideRightArticlesItemDiv>
                    <SideRightArticlesPrice>
                      {product.price}€
                    </SideRightArticlesPrice>
                    <DeleteOutline
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemoveWhish(product._id)}
                    />
                  </SideRightArticlesItemDiv>
                </SideRightArticlesItem>
              ))}
          </Items>
        </Wrapper>
      </Main>
    </Container>
  );
};

export default WhishList;
