import { Add } from "@material-ui/icons";
import styled from "styled-components";
import NavBar from "../components/NavBar/NavBar";
import SideNav from "../components/SideNav";
import { Button } from "../components/Settings";
import { useState } from "react";
import Address from "../components/Address";
import AddressForm from "../components/AddressForm";

const Container = styled.div``;

const Wrapper = styled.div`
  margin-left: 20px;
  padding-top: 25px;
  width: 100%;
`;

const Main = styled.main`
  display: flex;
  margin-left: 10rem;
`;

const Title = styled.h1`
  text-align: center;
`;

const Info = styled.div`
  margin: 60px;
`;

const BookAddress = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState();

  const handleEdit = (address) => {
    setEdit(address);
    setOpen(true);
  };

  return (
    <Container>
      <NavBar />
      <Main>
        <SideNav profil={true} />
        <Wrapper>
          <Title>CARNET D'ADRESSES</Title>
          <Info>
            <Button
              type="sub"
              onClick={() => setOpen(true)}
              style={{ width: "auto" }}
            >
              <Add style={{ marginRight: 5 }} />
              AJOUTER UNE NOUVELLE ADRESSE
            </Button>
            <Address handleEdit={handleEdit} />
          </Info>
          <AddressForm
            open={open}
            setOpen={setOpen}
            edit={edit}
            setEdit={setEdit}
          />
        </Wrapper>
      </Main>
    </Container>
  );
};

export default BookAddress;
