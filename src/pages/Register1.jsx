import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar/NavBar";
import { Button } from "../components/Settings";
import Footer from "../components/Footer";
import { publicRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Stack,
  FormLabel,
  FormControl,
  Box,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addAddress } from "../redux/apiCalls";

const Container = styled.div``;

const Form = styled.form`
  width: 50%;
  margin: 50px 0 100px 7.5%;
`;

const Title = styled.h1``;

const Lign = styled.hr`
  margin-top: 10px;
  border: none;
  border-top: 2px solid #636364;
`;

const Remark = styled.p`
  font-size: 15px;
  color: #bec3cc;
  width: 400px;
`;

const Register = () => {
  const [sexe, setSexe] = useState("female");
  const [address, setAddress] = useState({});
  const [inputs, setInputs] = useState({});
  const [name, setName] = useState({});
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddress = (e) => {
    setAddress((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChange = (e) => {
    e.target.name === "firstName" || e.target.name === "lastName"
      ? setName((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        })
      : setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
  };

  useEffect(() => {
    setInputs((prev) => {
      return { ...prev, sexe: sexe };
    });
  }, [sexe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      Object.keys(address).length > 3 &&
      Object.keys(inputs).length > 2 &&
      Object.keys(name).length > 1
    ) {
      const res = await publicRequest.post("/user/register", {
        userName: name,
        ...inputs,
      });
      if (res.data) {
        addAddress(dispatch, res.data.user._id, {
          ...address,
          name: { ...name },
        });
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } else {
      setErrors("Tous les champs avec * sont obligatoire");
    }
  };

  return (
    <Container>
      <NavBar />
      <Form>
        <Title>CRÉER UN COMTPE</Title>
        <Lign />
        <div style={{ marginTop: 20, color: "red" }}>{errors}</div>
        <Box sx={{ marginTop: "30px" }}>
          <FormControl required>
            <FormLabel>Civilité</FormLabel>
            <RadioGroup
              row
              name="sexe"
              value={sexe}
              onChange={(e) => setSexe(e.target.value)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Femme"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Homme"
              />
            </RadioGroup>
          </FormControl>
          <Stack direction="row" spacing={4} sx={{ marginTop: "30px" }}>
            <TextField
              onChange={handleChange}
              label="Nom"
              name="firstName"
              required
              fullWidth
            />
            <TextField
              label="Prénom"
              name="lastName"
              required
              fullWidth
              onChange={handleChange}
            />
          </Stack>
          <Stack direction="row" spacing={4} sx={{ marginTop: "30px" }}>
            <TextField
              label="Votre email"
              name="email"
              type="email"
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Mot de passe"
              name="pwd"
              type="password"
              onChange={handleChange}
              required
              fullWidth
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ marginRight: "60px" }}
          >
            <Remark>
              Doit contenir 8 caractères minimum dont une majuscule, une
              minuscule et un chiffre.
            </Remark>
          </Stack>
          <Stack direction="row" spacing={4} sx={{ marginTop: "30px" }}>
            <TextField
              label="Pays"
              name="country"
              onChange={handleAddress}
              sx={{ width: "460px" }}
              required
            />
          </Stack>
          <Stack direction="row" spacing={4} sx={{ marginTop: "30px" }}>
            <TextField
              label="Code postal"
              name="postal_code"
              onChange={handleAddress}
              required
              fullWidth
            />
            <TextField
              label="Ville"
              name="city"
              required
              fullWidth
              onChange={handleAddress}
            />
          </Stack>
          <Stack direction="row" spacing={4} sx={{ marginTop: "30px" }}>
            <TextField
              label="Adresse"
              name="line1"
              required
              fullWidth
              onChange={handleAddress}
            />
            <TextField
              label="Complément d'adresse"
              name="line2"
              fullWidth
              onChange={handleAddress}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-start"
            sx={{ marginTop: "60px" }}
          >
            <Button type="sub" style={{ width: "auto" }} onClick={handleSubmit}>
              JE CRÉE UN COMPTE
            </Button>
          </Stack>
        </Box>
      </Form>
      <Footer />
    </Container>
  );
};

export default Register;
