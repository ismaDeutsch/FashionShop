import React from "react";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 999;
`;
const TopbarWrapper = styled.div`
  height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TopLeft = styled.div``;
const TopRight = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.span`
  font-weight: bold;
  font-size: 30px;
  color: darkblue;
  cursor: pointer;
`;
const TopbarIconContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  color: #555;
`;

const TopAvatar = styled.img`
  border-radius: 50px;
  cursor: pointer;
`;

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <Container>
      <TopbarWrapper>
        <TopLeft>
          <Logo>Admin</Logo>
        </TopLeft>
        <TopRight>
          {user ? (
            <TopbarIconContainer>
              <LogoutIcon onClick={handleLogOut} />
            </TopbarIconContainer>
          ) : null}

          <TopAvatar
            src="https://lesexpertsdurecouvrement.com/wp-content/uploads/2015/11/default-avatar.jpg"
            width={40}
            height={40}
          />
        </TopRight>
      </TopbarWrapper>
    </Container>
  );
};

export default Topbar;
