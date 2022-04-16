import { React, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Color = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #${(props) => props.color};
  float: left !important;
`;

const RelateColor = styled.section`
  padding: 2px;
  border: 1px solid transparent;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin: 8px 5px;
  float: left !important;
  border-color: ${(props) => (props.isSelect === true ? "black" : "none")};
  position: relative;
  cursor: pointer;
`;

const FilterColor = (props) => {
  const products = useSelector((state) => state.product.products);
  const [filterColor, setFilterColor] = useState([]);

  const handleToggle = (color) => {
    const currentColor = filterColor.indexOf(color);
    const newFilterColor = [...filterColor];
    currentColor === -1
      ? newFilterColor.push(color)
      : newFilterColor.splice(currentColor, 1);
    setFilterColor(newFilterColor);
    props.handleFilters(newFilterColor, "color");
  };

  const colors = products
    .map((product) => product.color)
    .flat()
    .reduce((a, b) => (a.includes(b) ? a : [...a, b]), []);

  return (
    <>
      {colors?.map((color, index) => (
        <RelateColor
          key={index}
          isSelect={filterColor.indexOf(color) === -1 ? false : true}
          onClick={() => handleToggle(color)}
        >
          <Color color={color} />
        </RelateColor>
      ))}
    </>
  );
};

export default FilterColor;
