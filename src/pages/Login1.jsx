import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../components/Settings";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import { publicRequest } from "../requestMethods";

const Container = styled.div``;

const Main = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 1;
`;

const Right = styled.div`
  flex: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ImageBackground = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Title = styled.h1`
  font-size: 35px;
  text-align: center;
`;

const Input = styled.input`
  margin: 20px 0 0 31%;
  padding: 0 30px 0 30px;
  height: 55px;
  width: 300px;
  font-size: 20px;
`;

const Forgot = styled.a`
  font-size: 14px;
  text-decoration: underline;
  color: #626161;
  margin: 5px 0 0 528px;
  cursor: pointer;
`;

const Or = styled.hr`
  margin: 40px 0 0 350px;
  border: none;
  border-top: 1px solid #bec3cc;
  color: #bec3cc;
  overflow: visible;
  text-align: center;
  height: 5px;
  width: 245px;
  &:after {
    background: #f7f8fa;
    content: "ou";
    padding: 0 4px;
    position: relative;
    top: -13px;
    padding: 0 25px 0 25px;
  }
`;

export const Error = styled.span`
  color: red;
  font-size: 20px;
  margin: 50px 280px;
`;

const Login = () => {
  const [inputs, setInputs] = useState({});
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [errors, setErrors] = useState("");
  const [popErrors, setPopErrors] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const check = Object.values(inputs).every((value) => {
    if (value === null || value === undefined || value === "") {
      return true;
    }
    return false;
  });

  const handleClick = async (e) => {
    e.preventDefault();
    setErrors("");
    if (!check) {
      await login(dispatch, inputs);
      if (currentUser) {
        navigate("/");
      } else {
        setErrors("L'email ou/et le mot de passe sont incorrecte");
      }
    } else {
      setErrors("Tous les champs doivent être remplis");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setPopErrors("");
    if (email) {
      const res = await publicRequest.post("/user/password-reset", { email });
      if (res.status === "400") {
        setPopErrors("");
        setOpen(false);
      } else setPopErrors("l'email n'éxiste pas");
    } else {
      setPopErrors("Il faut remplir les champs");
    }
  };

  return (
    <Container>
      <NavBar />
      <Main>
        <Left>
          <Form>
            <Error>{errors}</Error>
            <Title>J'AI DÉJÀ UN COMPTE</Title>
            <Input
              type="email"
              name="email"
              placeholder="Votre email"
              onChange={handleChange}
            />
            <Input
              type="password"
              name="pwd"
              placeholder="Votre mot de passe"
              onChange={handleChange}
            />
            <Forgot onClick={() => setOpen(true)}>Mot de passe oublié?</Forgot>
            <Button
              type="sub"
              onClick={handleClick}
              style={{ width: "360px", height: "55px", margin: "20px 0 0 31%" }}
            >
              SE CONNECTER
            </Button>
            <Or />
            <Link to="/register">
              <Button
                style={{
                  width: "360px",
                  height: "55px",
                  margin: "30px 0 0 31%",
                }}
              >
                JE CRÉE UN COMPTE
              </Button>
            </Link>
          </Form>
        </Left>
        <Right>
          <ImageBackground src="./img/registerImg.png" />
        </Right>
      </Main>
      <Dialog
        open={open}
        onClose={() => {
          setPopErrors("");
          setEmail("")
          setOpen(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Mot de passe oublié</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez renseigner votre email :
          </DialogContentText>
          <span style={{ color: "red" }}>{popErrors}</span>
          <br />
          <TextField
            label="Email"
            onChange={handleEmail}
            name="email"
            type="email"
            required
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button type="sub" onClick={handleSend}>
            Reinistialiser
          </Button>
        </DialogActions>
      </Dialog>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Login;
