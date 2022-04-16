import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getWhish, login } from "../redux/apiCalls";
import { StyleLink } from "./NavBar/Categories";
import { Button } from "./Settings";

const Container = styled.div``;

const Body = styled.div`
  display: flex;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
`;

const BodyTitle = styled.h1``;
const BodyForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 60px 100px;
  & > label {
    font-size: 20px;
    color: gray;
    margin-bottom: 5px;
  }
  & > input {
    padding: 10px;
    height: 35px;
    width: 350px;
    font-size: 23px;
    border: 1px solid #bec3cc;
    margin-bottom: 30px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CnxPopUp = ({ open, setOpen }) => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errors, setErrors] = useState("");
  const { isFetching, error, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    currentUser && setOpen(false) && getWhish(dispatch);
    error && setErrors("L'email ou/et le mot de passe sont incorrecte");
  }, [currentUser, error, dispatch, setOpen]);

  const handleClick = (e) => {
    e.preventDefault();
    if (email.length > 0 && pwd.length > 0) {
      login(dispatch, { email, pwd });
    } else {
      setErrors("Tous les champs doivent être remplis");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setErrors("");
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <Container>
          <Body>
            <BodyContainer>
              <BodyTitle>Connexion</BodyTitle>
              <div style={{ color: "red" }}>{errors}</div>
              <BodyForm>
                <label>E-Mail:</label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Entrez Votre Email"
                />
                <label>Mot De Passe:</label>
                <input
                  type="password"
                  name="pwd"
                  onChange={(e) => setPwd(e.target.value)}
                  placeholder="Entrez Votre Mot De Passe"
                />
                <ButtonContainer>
                  <Button
                    type="sub"
                    style={{ height: "60px" }}
                    onClick={handleClick}
                    disabled={isFetching}
                  >
                    Connexion
                  </Button>
                  <StyleLink to="/register">
                    <Button style={{ height: "60px", marginTop: "20px" }}>
                      S'inscire
                    </Button>
                  </StyleLink>
                </ButtonContainer>
              </BodyForm>
            </BodyContainer>
          </Body>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default CnxPopUp;
