import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 70px;
  background: white;
  box-shadow: 0px 3px 5px lightgray;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const MenuItem = styled.div`
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin: 25px 0 0 40px;
  display: flex;
  align-items: center;
  &:hover {
    color: gray;
  }
`;

export const StyleLink = styled(Link)`
    text-decoration: none;
    color:inherit;
`

const Categories = () => {
  return (
    <Container>
      <Wrapper>
        <StyleLink to="/products/news">
          <MenuItem>NOUVEAUTÉ</MenuItem>
        </StyleLink>
        <StyleLink to="/products/homme">
          <MenuItem>HOMME</MenuItem>
        </StyleLink>
        <StyleLink to="/products/femme">
          <MenuItem>FEMME</MenuItem>
        </StyleLink>
        <StyleLink to="/products/enfant">
          <MenuItem>ENFANT</MenuItem>
        </StyleLink>
      </Wrapper>
    </Container>
  );
};

export default Categories;
