import styled from "styled-components";
import { Visibility } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { userRequest } from "../requestMethodes";

const Container = styled.div`
  flex: 1;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 75);
  padding: 20px;
  margin-right: 20px;
`;
const WidgetSmTitle = styled.span`
  font-size: 22px;
  font-weight: 600;
`;
const WidgetSmList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const WidgetSmListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px;
`;
const WidgetSmImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const WidgetSmUser = styled.div`
  display: flex;
  flex-direction: column;
`;
const WidgetSmUsername = styled.span`
  font-weight: 600;
`;

const WidgetSmButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 7px 10px;
  background-color: #eeeef7;
  color: #555;
  cursor: pointer;
`;

const WidgetSm = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("user/?new=true");
        setUsers(res.data);
      } catch (error) {}
    };
    getUsers();
  }, []);

  return (
    <Container>
      <WidgetSmTitle>New Join Members</WidgetSmTitle>
      <WidgetSmList>
        {users.map((user) => (
          <WidgetSmListItem key={user._id}>
            <WidgetSmImg src="./img/model.png" />
            <WidgetSmUser>
              <WidgetSmUsername>{user.userName.lastName} {user.userName.name}</WidgetSmUsername>
            </WidgetSmUser>
            <WidgetSmButton>
              <Visibility style={{ fontSize: 16, marginRight: 5 }} />
              Display
            </WidgetSmButton>
          </WidgetSmListItem>
        ))}
      </WidgetSmList>
    </Container>
  );
}

export default WidgetSm;
