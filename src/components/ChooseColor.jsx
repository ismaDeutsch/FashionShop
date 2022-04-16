import { React } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;
const Color = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #${(props) => props.color};
  float: left !important;
  border: 1px solid black;
`;
const CloseButton = styled.button`
  background: transparent;
  border: none;
  display: none;
  margin: 0;
  color: white;
  margin-top: 2px;
`;
const RelateColor = styled.section`
  padding: 2px;
  border: 1px solid transparent;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin: 8px 5px;
  float: left !important;
  position: relative;
  cursor: pointer;
  &:hover {
    zoom: 1.2;
  }
  &:hover button${CloseButton} {
    display: block;
  }
`;

const ChooseColor = ({ colors, setColors }) => {
  const handleClose = (e, code) => {
    e.preventDefault();
    setColors(colors.filter((color) => color !== code));
  };
  
  return (
    <Container>
      {colors?.map((color, index) => (
        <RelateColor key={index}>
          <Color color={color}>
            <CloseButton onClick={(e) => handleClose(e, color)}>X</CloseButton>
          </Color>
        </RelateColor>
      ))}
    </Container>
  );
};

export default ChooseColor;
