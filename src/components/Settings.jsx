import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";


const Container = styled.div`
  margin: 40px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1``;

const Info = styled.div`
  margin: 30px;
  width: 80vh;
`;

const InfoItem = styled.div`
  border-bottom: 1px solid #636364;
  padding: 35px 0;
`;

const InfoEdit = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div``;
const EditTitle = styled.h2``;

const OldText = styled.span`
  font-size: 24px;
  color: #636364;
`;

const Form = styled.form`
  margin-top: 30px;
  display: ${(props) => (!props.active ? "none" : "flex")};
  flex-direction: column;
  width: 300px;
`;

const Control = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  width: ${(props) => (props.type === "edit" ? "200px" : "140px")};
  font-weight: 600;
  border: ${(props) => (props.type === "sub" ? "none" : "1px solid black")};
  background-color: ${(props) =>
    props.type === "sub" ? "black" : "transparent"};
  color: ${(props) => (props.type === "sub" ? "white" : "black")};
  &:hover {
    background-color: ${(props) =>
      props.type === "sub" ? "gray" : "lightgray"};
  }
  cursor: pointer;
`;

const Settings = () => {
  const [showPw, setShowPw] = useState(false);
  const [password, setPassword] = useState("");
  const [cpwd, setCPwd] = useState();
  const [errors, setErrors] = useState("")
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleChange = (e, type) => {
    type === "pwd" ? setPassword(e.target.value) : setCPwd(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length >= 8) {
      if (password === cpwd) {
        try {
          await userRequest.put(`/user/password/${currentUser.user._id}`, {
            pwd: password,
          });
          setShowPw(false);
        } catch (error) {
          console.log(error);
        }
      }else{
        setErrors("Il faut rentrer le même mot de passe")
      }
    }else{
      setErrors("Le mot de passe doit contenir au moins 8 caractères")
    }
  };

  return (
    <Container>
      <Title>MON PROFIL</Title>
      <Info>
        {/* <InfoItem>
          <InfoEdit>
            <Left>
              <EditTitle>Modifier Votre E-Mail</EditTitle>
              <OldText>hamzasaoulajane9@gmail.com</OldText>
            </Left>
            <Button type="edit" onClick={() => setShowEmail(!showEmail)}>
              Modifier
            </Button>
          </InfoEdit>
          <Form active={showEmail}>
            <Stack direction="column" spacing={4}>
              <TextField label="Nouveau E-mail" name="email" type="email" />
              <TextField
                label="Confirmer l'E-mail"
                name="emailConf"
                type="email"
              />
            </Stack>
            <Control>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setShowEmail(!showEmail);
                }}
              >
                Annuler
              </Button>
              <Button type="sub">Confirmer</Button>
            </Control>
          </Form>
        </InfoItem> */}
        <InfoItem>
          <InfoEdit>
            <Left>
              <EditTitle>Modifier Votre Mot de passe</EditTitle>
              <OldText>********</OldText>
            </Left>
            <Button type="edit" onClick={() => setShowPw(!showPw)}>
              Modifier
            </Button>
          </InfoEdit>
          {showPw && (
            <Form active={showPw}>
              <Stack direction="column" spacing={4}>
                <span style={{color:"red", marginBottom:2}}>{errors}</span>
                <TextField
                  label="Nouveau Mot de Passe"
                  name="npwd"
                  type="password"
                  onChange={(e) => handleChange(e, "pwd")}
                />
                <TextField
                  label="Confirmer Mot de passe"
                  name="cpwd"
                  type="password"
                  onChange={(e) => handleChange(e, "cpwd")}
                />
              </Stack>
              <Control>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPw(!showPw);
                    setErrors("")
                  }}
                >
                  Annuler
                </Button>
                <Button type="sub" onClick={handleSubmit}>
                  Confirmer
                </Button>
              </Control>
            </Form>
          )}
        </InfoItem>
      </Info>
    </Container>
  );
};

export default Settings;
