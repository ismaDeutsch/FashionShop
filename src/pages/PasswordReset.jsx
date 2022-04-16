import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../components/Settings";
import { TextField } from "@mui/material";
import { publicRequest } from "../requestMethods";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const PasswordReset = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const token = location.pathname.split("/")[3];
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("")
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.length >= 8) {
      try {
        const res = await publicRequest.post(
          `/user/password-reset/${userId}/${token}`,
          {
            pwd: password,
          }
        );
        console.log(res)
        if (res.data === "password reset sucessfully.") {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    } else setErrors("Le mot de passe doit avoir au moins 8 caractères")
  };

  return (
    <Container>
      <Wrapper>
        <Title>Reset Password</Title>
        <Form>
          <TextField
            label="Nouveau Mot de Passe"
            name="pwd"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span style={{color:"red", marginTop:10}}>{errors}</span>
          <Button
            type="sub"
            style={{ marginTop: "30px" }}
            onClick={handleClick}
          >
            RESET
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default PasswordReset;
