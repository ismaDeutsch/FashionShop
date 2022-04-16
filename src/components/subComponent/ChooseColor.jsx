import { React } from "react";
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
  border-color: ${(props) => props.isSelect === true ? 'black' : 'none'};
  position: relative;
  cursor: pointer;
`;

const ChooseColor = ({colors, choose, handle}) => {
  return (
    <>
      {colors?.map((color, index) => (
        <RelateColor
          key={index}
          isSelect={choose === color ? true : false}
          onClick={() => handle(color)}
        >
          <Color color={color} />
        </RelateColor>
      ))}
    </>
  );
};

export default ChooseColor;
