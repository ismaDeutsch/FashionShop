import React from "react";
import styled from "styled-components";
import Categories from "./Categories";
import Header from "./Header";

const Container = styled.div`
  height: 150px;
`;

const NavBar = () => {
  return (
    <Container>
      <Header />
      <Categories />
    </Container>
  );
};

export default NavBar;
