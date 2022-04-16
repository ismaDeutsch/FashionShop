import React, { useState } from "react";
import { Favorite, FavoriteBorderOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CnxPopUp from "../components/CnxPopUp";
import { useDispatch, useSelector } from "react-redux";
import { addToWhish } from "../redux/apiCalls";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 18%;
  padding: 0 10px;
  position: relative;
  outline: 0;
  min-width: 270px;
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  background-color: #f7f7f7;
  box-sizing: border-box;
  overflow: hidden;
`;

const ImageContainer = styled.img`
  cursor: pointer;
  outline: 0;
  position: relative;
  display: inline-block;
  width: 100%;
  height: 399px;
`;

const ProductInfo = styled.div`
  min-height: 116px;
`;

const ProductName = styled.div`
  padding-top: 8px;
  position: relative;
  height: 14px;
  line-height: 14px;
  font-size: 12px;
  box-sizing: content-box;
`;

const ProductLink = styled.a`
  cursor: pointer;
  outline: 0;
  display: block;
  width: 100%;
  color: #767676;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductPrice = styled.section`
  text-align: left;
  margin-top: 6px;
  position: relative;
  min-height: 16px;
`;

const ProductPrices = styled.div`
  display: flex;
  max-width: calc(100% - 25px);
`;

const ProductRetailPrice = styled.span`
  display: inline-block;
  line-height: 16px;
  font-size: 14px;
  font-weight: 700;
  color: #000;
`;

const AddWishlist = styled.div`
  right: 0;
  margin-right: 4px;
  cursor: pointer;
  position: absolute;
  top: -1px;
  width: 16px;
  height: 18px;
  z-index: 30;
`;

const Product = ({ item }) => {
  const [open, setOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const whishs = useSelector((state) => state.whish.products);
  const dispatch = useDispatch();

  const handleAddWhish = (id) => {
    if (currentUser) {
      addToWhish(dispatch, currentUser.user._id, id);
    } else setOpen(true);
  };

  return (
    <Section>
      <Link to={`/product/${item._id}`}>
        <Wrapper>
          <ImageContainer src={item.image} />
        </Wrapper>
      </Link>
      <ProductInfo>
        <ProductName>
          <ProductLink>{item.title}</ProductLink>
        </ProductName>
        <div>
          <ProductPrice>
            <ProductPrices>
              <div>
                <ProductRetailPrice> {item.price}€</ProductRetailPrice>
              </div>
            </ProductPrices>
            <AddWishlist>
              {whishs.indexOf(item._id) !== -1 ? (
                <Favorite style={{ color: "#BA0001" }} />
              ) : (
                <FavoriteBorderOutlined
                  onClick={() => handleAddWhish(item._id)}
                />
              )}
            </AddWishlist>
          </ProductPrice>
        </div>
      </ProductInfo>
      <CnxPopUp open={open} setOpen={setOpen} />
    </Section>
  );
};

export default Product;
