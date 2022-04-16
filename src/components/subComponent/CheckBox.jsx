import { React, useState } from "react";
import styled from "styled-components";

const ContentEach = styled.div`
  min-width: 50%;
  margin-top: 8px;
  float: left !important;
  position: relative;
  line-height: 18px;
  box-sizing: border-box;
`;

const CheckBox = ({ options, type, handleFilters }) => {
  const [checked, setChecked] = useState([]);
  const handleChange = (option) => {
    const currentIndex = checked.indexOf(option);
    const newChecked = [...checked];
    currentIndex === -1
      ? newChecked.push(option)
      : newChecked.splice(currentIndex, 1);
    setChecked(newChecked);
    handleFilters(newChecked, type);
  };

  return (
    <>
      {options.map((option, index) => (
        <ContentEach key={index}>
          <input
            type="checkbox"
            onChange={() => handleChange(option)}
            checked={checked.indexOf(option) === -1 ? false : true}
            style={{ cursor: "pointer" }}
          />
          <label htmlFor={option}> {option}</label>
        </ContentEach>
      ))}
    </>
  );
};

export default CheckBox;
