import React from "react";
import styled from "styled-components";
import Filter from "./Filter";
import { filter } from "../util";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.nav`
  padding-top: 3rem;
  padding-left: 3rem;
  flex: 0 0 220px;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  margin: 30px 20px;
`;

const Nav = styled.ul`
  list-style: none;
  font-size: 22px;
  color: #636364;
`;

const NavItem = styled.li`
  margin-top: 20px;
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const SideNav = (props) => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Container>
      <Hr />
      {props.profil ? (
        <>
          <Title>Mon Compte</Title>
          <Nav>
            <StyleLink to="/profil">
              <NavItem>Mon Profil</NavItem>
            </StyleLink>
            <StyleLink to={`/profil/myorders/${user.user._id}`}>
              <NavItem>Mes Commandes</NavItem>
            </StyleLink>
            <StyleLink to="/profil/mybookaddress">
              <NavItem>Mon carnet d'adresses</NavItem>
            </StyleLink>
            <StyleLink to="/profil/mywhishlist">
              <NavItem>Mes Souhaits</NavItem>
            </StyleLink>
          </Nav>
        </>
      ) : (
        filter.map((filter) => (
          <Filter
            key={filter.name}
            filter={filter}
            handleFilters={props.handleFilters}
          />
        ))
      )}
    </Container>
  );
};

export default SideNav;
