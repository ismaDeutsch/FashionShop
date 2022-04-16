import { React, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CheckoutBar from "../components/CheckoutBar";
import Address from "../components/Address";
import Summary from "../components/Summary";
import { Button } from "../components/Settings";
import AddressForm from "../components/AddressForm";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  margin-top: 50px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
`;

const Right = styled.div`
  margin-left: auto;
  margin-right: 30px;
`;

const Main = styled.main`
  display: flex;
  width: 100%;
`;

const Title = styled.h1`
  margin: ${(props) => (!props.type ? "60px 0 0 20px" : "null")};
  font-weight: 400;
`;

const Span = styled.span`
  font-size: 18px;
  margin: 0 20px 20px 0;
`;

const Payment = () => {
  const cart = useSelector((state) => state.cart);
  const [address, setAddresse] = useState();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState();

  const handleEdit = (address) => {
    setEdit(address);
    setOpen(true);
  };

  return (
    <Container>
      <CheckoutBar />
      <Title>Adresse De Livraison: </Title>
      <Wrapper>
        <Main>
          <Left>
            <Address
              handleAddress={setAddresse}
              check={address}
              select={"ok"}
              handleEdit={handleEdit}
            />
            <AddressForm
              open={open}
              setOpen={setOpen}
              edit={edit}
              setEdit={setEdit}
            />
          </Left>
          <Span>
            <Button style={{ width: "auto" }} onClick={() => setOpen(true)}>
              Ajouter une addresse
            </Button>
          </Span>
          <Right>
            <Summary cart={cart} address={address} payment={false} />
          </Right>
        </Main>
      </Wrapper>
    </Container>
  );
};
export default Payment;
