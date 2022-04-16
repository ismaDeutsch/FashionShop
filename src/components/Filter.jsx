import { Add, Remove } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import CheckBox from "./subComponent/CheckBox";
import FilterColor from "./subComponent/FilterColor";
import PriceSlider from "./subComponent/PriceSlider";
import { useState } from "react";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 16px;
`;

const Text = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  font-weight: bold;
`;

const Content = styled.div`
  display: block;
`;

const Filter = ({ filter, handleFilters }) => {
  const [expanded, setExpanded] = useState(true);
  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  const products = useSelector((state) => state.product.products);
  const sizes = products
    .map((product) => product.size)
    .flat()
    .reduce((a, b) => (a.includes(b) ? a : [...a, b]), []);

  return (
    <Container>
      <Text>
        {filter.name}
        {expanded ? (
          <Remove onClick={handleExpanded} style={{ cursor: "pointer" }} />
        ) : (
          <Add onClick={handleExpanded} style={{ cursor: "pointer" }} />
        )}
      </Text>
      {expanded ? (
        <Content>
          {filter.name === "Couleur" ? (
            <FilterColor handleFilters={handleFilters} />
          ) : filter.name === "Prix" ? (
            <PriceSlider handleFilters={handleFilters} />
          ) : filter.name === "Taille" ? (
            <CheckBox
              options={sizes}
              type={"size"}
              handleFilters={handleFilters}
            />
          ) : (
            <CheckBox
              options={filter.content}
              type={"categories"}
              handleFilters={handleFilters}
            />
          )}
        </Content>
      ) : null}
    </Container>
  );
};

export default Filter;
