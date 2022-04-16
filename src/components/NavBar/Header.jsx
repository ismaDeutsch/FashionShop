import React, { useState } from "react";
import { Badge } from "@material-ui/core";
import {
  ExitToAppOutlined,
  FavoriteBorder,
  PersonOutline,
  Search,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";
import { deleteWhish } from "../../redux/whishRedux";
import { StyleLink } from "./Categories";

const colorIcon = "#636364";
const mainColor = "#F7F8FA";
const Container = styled.div`
  background: ${mainColor};
  height: 80px;
`;
const Wrapper = styled.div`
  margin-top: -10px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  align-items: center;
`;

const SearchContainer = styled.div`
  box-shadow: inset 0px 0em 1em lightgray;
  height: 40px;
  width: 400px;
  margin-left: 100px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  background: transparent;
  padding-left: 15px;
  font-size: 18px;
  height: 60px;
  width: 370px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Left = styled.div`
  flex: 1;
`;

const Logo = styled.img`
  margin-left: 33px;
  height: 70px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 20px;
  color: ${colorIcon};
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 20px;
  cursor: pointer;
  margin-left: 25px;
  color: ${colorIcon};
`;

const ScrollSearch = styled.div`
  height: auto;
  max-height: 400px;
  width: 398px;
  margin-left: 100px;
  background: white;
  position: absolute;
  z-index: 999;
  overflow: scroll;
  display: ${(props) => (props.search.length > 3 ? "block" : "none")};
`;

const ScrollSearchItem = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid gray;
  display: flex;
  &:hover {
    background-color: lightgray;
  }
`;

const ScrollSearchItemImg = styled.img`
  width: 100px;
  margin: 5px;
`;

const ScrollSearchItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ScrollSearchItemDivSpan = styled.span`
  margin: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Header = () => {
  const amount = useSelector((state) => state.cart.amount);
  const currentUser = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.product.products);
  const whish = useSelector((state) => state.whish.products);
  const [search, setSearch] = useState("");
  const [searchProducts, setProducts] = useState(products);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(deleteWhish());
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (search.length >= 3) {
      setProducts(
        products.filter(
          (product) =>
            product.brand.toLowerCase().includes(search.toLowerCase()) ||
            product.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else setProducts(products);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <StyleLink to="/">
            <Logo src={process.env.PUBLIC_URL + "/img/logo.png"} />
          </StyleLink>
        </Left>
        <Center>
          <SearchContainer>
            <Input
              placeholder="Search here..."
              name="search"
              onChange={handleChange}
            />
            <Search style={{ fontSize: 25, marginRight: 10 }} />
          </SearchContainer>
          <ScrollSearch search={search}>
            {searchProducts.map((product) => (
              <StyleLink to={`/product/${product._id}`} key={product._id}>
                <ScrollSearchItem>
                  <ScrollSearchItemImg src={product.image} />
                  <ScrollSearchItemDiv>
                    <ScrollSearchItemDivSpan>
                      {product.title}
                    </ScrollSearchItemDivSpan>
                    <ScrollSearchItemDivSpan>
                      {product.brand}
                    </ScrollSearchItemDivSpan>
                    <ScrollSearchItemDivSpan>
                      {product.price}
                    </ScrollSearchItemDivSpan>
                  </ScrollSearchItemDiv>
                </ScrollSearchItem>
              </StyleLink>
            ))}
          </ScrollSearch>
        </Center>
        <Right>
          <StyleLink to="/profil">
            <MenuItem>
              <PersonOutline style={{ fontSize: 40, color: colorIcon }} />
            </MenuItem>
          </StyleLink>
          <StyleLink to="/cart">
            <MenuItem>
              <Badge badgeContent={amount} color="primary">
                <ShoppingCartOutlined
                  style={{ fontSize: 30, color: colorIcon }}
                />
              </Badge>
            </MenuItem>
          </StyleLink>
          <StyleLink to="/profil/mywhishlist">
            <MenuItem>
              <Badge badgeContent={whish.length} color="primary">
                <FavoriteBorder style={{ fontSize: 30, color: colorIcon }} />
              </Badge>
            </MenuItem>
          </StyleLink>
          {currentUser ? (
            <MenuItem>
              <ExitToAppOutlined
                style={{ fontSize: 30, color: colorIcon }}
                onClick={handleLogOut}
              />
            </MenuItem>
          ) : (
            <Language>FR</Language>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
