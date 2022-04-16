import React from "react";
import styled from "styled-components";
import { Slider } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";

const PriceText = styled.div`
  line-height: normal;
`;

const PriceLower = styled.div`
  float: left;
`;

const PriceUpper = styled.div`
  float: right;
`;

const PriceSlider = ({ handleFilters }) => {
  const products = useSelector((state) => state.product.products);

  const larges = products.reduce((a, b) => {
    return a > b.price ? a : b.price;
  });

  const [value, setValue] = useState([0, larges]);
  
  const handleChange = (e, newValue) => {
    setValue(newValue);
    handleFilters(newValue, "price");
  };

  return (
    <>
      <Slider value={value} max={larges} onChange={handleChange} />
      <PriceText>
        <PriceLower>
          <span>{value[0]} €</span>
        </PriceLower>
        <PriceUpper>
          <span>{value[1]} €</span>
        </PriceUpper>
      </PriceText>
    </>
  );
};

export default PriceSlider;
