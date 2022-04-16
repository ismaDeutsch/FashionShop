import React, { useEffect } from "react";
import styled from "styled-components";
import { CheckCircle } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, getAddress } from "../redux/apiCalls";

const AddressList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const AddressItem = styled.div`
  position: relative;
  border: 1px solid lightgray;
  border-left: 5px dashed blue;
  width: 350px;
  height: 155px;
  padding: 10px;
  margin-right: 20px;
  margin-top: 30px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    border-color: black;
  }
`;

const UserInfo = styled.div`
  margin-top: 10px;
`;

const AddressDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  font-size: 20px;
`;

const Span = styled.span`
  font-size: 20px;
  margin-right: 30px;
`;

const Edit = styled.div`
  display: flex;
  justify-content: end;
  position: absolute;
  z-index: 2;
`;

const EditButton = styled.button`
  background-color: transparent;
  border: none;
  color: #1e90ff;
  font-size: 18px;
  margin: 30px 0 0 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const Address = ({ handleAddress, check, select, handleEdit }) => {
  const address = useSelector((state) => state.address.address);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getAddress(dispatch, currentUser.user._id);
  }, [currentUser.user._id, dispatch]);

  const handleSelect = (address) => {
    if (select === "ok") handleAddress(address);
  };

  const handleDelete = (address) => {
    deleteAddress(dispatch, address, currentUser.user._id);
  };

  return (
    <AddressList>
      {address.map((adr) => (
        <AddressItem key={adr._id}>
          <div onClick={() => handleSelect(adr)}>
            <UserInfo>
              <Span>{adr?.name?.firstName + " " + adr.name?.lastName}</Span>
              {adr === check ? (
                <CheckCircle style={{ float: "right", color: "#4CAF50" }} />
              ) : null}
            </UserInfo>
            <AddressDetails>
              <Span>
                {adr.line1 + " " + (adr.line2 ? adr.line2 : "")}
                <br />
                {adr.postal_code + " " + adr.city + " " + adr.country}
              </Span>
            </AddressDetails>
          </div>
          <Edit>
            <EditButton onClick={() => handleDelete(adr._id)}>
              Effacer
            </EditButton>
            <EditButton onClick={() => handleEdit(adr)}>Modifier</EditButton>
          </Edit>
        </AddressItem>
      ))}
    </AddressList>
  );
};

export default Address;
