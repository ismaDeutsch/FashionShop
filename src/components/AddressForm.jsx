import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../components/Settings";
import {
  Stack,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, updateAddress } from "../redux/apiCalls";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const AddressForm = ({ setOpen, open, edit, setEdit }) => {
  const { error } = useSelector((state) => state.address);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [inputs, setInputs] = useState({});
  const [name, setName] = useState({});
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (edit) {
      setInputs(
        Object.keys(edit)
          .filter((key) => key !== "name" && key !== "_id")
          .reduce((obj, key) => {
            obj[key] = edit[key];
            return obj;
          }, {})
      );
      setName(edit.name);
    }
  }, [edit]);

  const handleChange = (e) => {
    e.target.name === "firstName" || e.target.name === "lastName"
      ? setName((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        })
      : setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
  };

  const handleClose = () => {
    setOpen(false);
    setInputs({});
    setName({});
    setErrors("");
    edit && setEdit({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(inputs).length >= 4 && Object.keys(name).length > 1) {
      const address = { ...inputs, name };
      edit
        ? updateAddress(dispatch, edit?._id, currentUser.user._id, address)
        : addAddress(dispatch, currentUser.user._id, address);
      if (!error) {
        handleClose();
      }
    } else {
      setErrors("Il faut remplir tous les champs qu'ils ont *");
    }
  };

  return (
    <Form>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Adresse de livraison</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Veuillez renseigner une nouvelle adresse : <br />
            <span style={{ color: "red" }}>{errors}</span>
          </DialogContentText>
          <br />
          <TextField
            label="Pays"
            onChange={handleChange}
            name="country"
            defaultValue={edit?.country}
            required
          />
          <Stack direction="row" spacing={4} style={{ marginTop: "20px" }}>
            <TextField
              label="Prénom"
              name="firstName"
              onChange={handleChange}
              fullWidth
              required
              defaultValue={edit?.name?.firstName}
            />
            <TextField
              label="Nom"
              name="lastName"
              onChange={handleChange}
              fullWidth
              required
              defaultValue={edit?.name?.lastName}
            />
          </Stack>
          <Stack direction="column" spacing={4} style={{ marginTop: "20px" }}>
            <TextField
              label="Ligne 1"
              onChange={handleChange}
              name="line1"
              fullWidth
              required
              defaultValue={edit?.line1}
            />
            <TextField
              label="Ligne 2"
              onChange={handleChange}
              name="line2"
              fullWidth
              defaultValue={edit?.line2}
            />
          </Stack>
          <Stack direction="row" spacing={4} style={{ marginTop: "20px" }}>
            <TextField
              label="Code Postal"
              name="postal_code"
              onChange={handleChange}
              fullWidth
              required
              defaultValue={edit?.postal_code}
            />
            <TextField
              label="Ville"
              name="city"
              onChange={handleChange}
              fullWidth
              defaultValue={edit?.city}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="sub" onClick={handleSubmit}>
            {edit ? "Modifier" : "Conserver"}
          </Button>
        </DialogActions>
      </Dialog>
    </Form>
  );
};

export default AddressForm;
