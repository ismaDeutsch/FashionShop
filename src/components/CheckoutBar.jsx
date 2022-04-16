import React from "react";
import styled from "styled-components";
import { Lock, ArrowRight } from "@material-ui/icons";
import { StyleLink } from "./NavBar/Categories";

const Container = styled.div`
  height: 70px;
  box-shadow: 0px 3px 5px lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 55px;
`;

const Logo = styled.img`
  margin-left: 33px;
  height: 70px;
`;

const MenuItem = styled.div`
  font-size: 20px;
  margin-left: 15px;
  display: flex;
  align-items: center;
  color: #85b294;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  font-size: 20px;
  margin-right: 80px;
`;

const PayementHeader = () => {
  return (
    <Container>
      <Left>
        <Logo src={process.env.PUBLIC_URL + "/img/logo.png"} />/
        <MenuItem>
          <Lock
            style={{
              fontSize: 30,
              background: "#85B294",
              borderRadius: 50,
              color: "white",
              padding: 10,
              marginRight: 15,
            }}
          />
          PAIEMENT FIABLE
        </MenuItem>
      </Left>
      <StyleLink to={`/products`}>
        <Right>
          CONTINUER MES ACHATS
          <ArrowRight style={{ fontSize: 40 }} />
        </Right>
      </StyleLink>
    </Container>
  );
};

export default PayementHeader;
