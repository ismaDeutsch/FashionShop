import React, { useEffect } from "react";
import styled from "styled-components";
import SideNav from "../components/SideNav";
import NavBar from "../components/NavBar/NavBar";
import Settings from "../components/Settings";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, getWhish } from "../redux/apiCalls";

const Container = styled.div``;

const Main = styled.main`
  display: flex;
  flex: 1;
  padding-left: 10rem;
  padding-right: 10rem;
`;

const Profil = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct(dispatch, null);
    user && getWhish(dispatch, user.user._id);
  }, [dispatch, user]);

  return (
    <Container>
      <NavBar />
      <Main>
        <SideNav profil={true} />
        <Settings />
      </Main>
    </Container>
  );
};

export default Profil;
