import {
  LocationSearching,
  MailOutline,
  PermIdentity,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { updateUser } from "../redux/apiCalls";
import { userRequest } from "../requestMethodes";
import { ProductButton } from "./Product";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  flex: 4;
`;

const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserTitle = styled.h1``;
const UserContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const UserShow = styled.div`
  flex: 1;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 75);
`;

const UserUpdate = styled.div`
  flex: 2;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 75);
  margin-left: 20px;
`;

const UserShowTop = styled.div`
  display: flex;
  align-items: center;
`;

const UserShowBottom = styled.div`
  margin-top: 20px;
`;

const UserShowImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserShowTopTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const UserShowUsername = styled.span`
  font-weight: 600;
`;

const UserShowUserTitle = styled.span``;
const UserShowTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: rgb(175, 170, 170);
`;

const UserShowInfoTitle = styled.span`
  margin-left: 10px;
`;

const UserShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;

const UserUpdateTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const UserUpdateForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const UserUpdateLeft = styled.div``;
const UserUpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  & > label {
    margin-bottom: 5px;
    font-size: 14px;
  }
`;

const UserUpdateInput = styled.input`
  border: none;
  width: 250px;
  height: 30px;
  border-bottom: 1px solid gray;
`;

const User = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.users.users.find((user) => user._id === userId)
  );
  const [inputs, setInputs] = useState({});
  const [userName, setUserName] = useState(user?.userName);
  const [address, setAddress] = useState(null)

  const handleChange = (e) => {
    if (e.target.name === "lastName" || e.target.name === "firstName") {
      setUserName((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    } else {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  useEffect(() => {
    const getAddress = async () => {
      try {
        const res = await userRequest.get(`/user/address/find/${user._id}`);
        if(res.data.length > 0) setAddress(res.data[0].address[0])
      } catch (error) {
        console.log(error)
      }
    }
    getAddress()
  }, [user])
  

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser(userId, { ...inputs, userName }, dispatch);
  };

  return (
    <>
      <Topbar />
      <Container>
        <Sidebar />
        <Wrapper>
          <UserTitleContainer>
            <UserTitle>Edit User</UserTitle>
          </UserTitleContainer>
          <UserContainer>
            <UserShow>
              <UserShowTop>
                <UserShowImg src="https://lesexpertsdurecouvrement.com/wp-content/uploads/2015/11/default-avatar.jpg" />
                <UserShowTopTitle>
                  <UserShowUsername>
                    {user?.userName.firstName + " " + user?.userName.lastName}
                  </UserShowUsername>
                  <UserShowUserTitle>
                    {user?.isAdmin ? "Admin" : "Not Admin"}
                  </UserShowUserTitle>
                </UserShowTopTitle>
              </UserShowTop>
              <UserShowBottom>
                <UserShowTitle>Account Details</UserShowTitle>
                <UserShowInfo>
                  <PermIdentity style={{ fontSize: 16 }} />
                  <UserShowInfoTitle>{user?._id}</UserShowInfoTitle>
                </UserShowInfo>
                <UserShowTitle>Contact Details</UserShowTitle>
                <UserShowInfo>
                  <MailOutline style={{ fontSize: 16 }} />
                  <UserShowInfoTitle>{user?.email}</UserShowInfoTitle>
                </UserShowInfo>

                <UserShowInfo>
                  <LocationSearching style={{ fontSize: 16 }} />
                  <UserShowInfoTitle>
                    {address ?address.city + " | " + address.country : "No Address"}
                  </UserShowInfoTitle>
                </UserShowInfo>
              </UserShowBottom>
            </UserShow>
            <UserUpdate>
              <UserUpdateTitle>Edit</UserUpdateTitle>
              <UserUpdateForm>
                <UserUpdateLeft>
                  <UserUpdateItem>
                    <label>Nom</label>
                    <UserUpdateInput
                      type="text"
                      name="lastName"
                      value={userName?.lastName}
                      onChange={handleChange}
                    />
                  </UserUpdateItem>

                  <UserUpdateItem>
                    <label>Prénom</label>
                    <UserUpdateInput
                      type="text"
                      name="firstName"
                      value={userName?.firstName}
                      onChange={handleChange}
                    />
                  </UserUpdateItem>

                  <UserUpdateItem>
                    <label>Email</label>
                    <UserUpdateInput
                      type="email"
                      name="email"
                      placeholder={user?.email}
                      onChange={handleChange}
                    />
                  </UserUpdateItem>
                  <ProductButton
                    style={{ marginTop: 30 }}
                    onClick={handleUpdate}
                  >
                    Update
                  </ProductButton>
                </UserUpdateLeft>
              </UserUpdateForm>
            </UserUpdate>
          </UserContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default User;
