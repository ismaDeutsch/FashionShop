import {React} from "react";
import styled from "styled-components";

const SizeChoose = styled.div`
  margin-top: 15px;
`;

const SizeRadio = styled.div`
  display: inline-block;
  position: relative;
  max-width: 100%;
  cursor: pointer;
`;

const SizeRadioInner = styled.div`
  position: relative;
  min-width: 66px;
  height: 32px;
  line-height: 30px;
  font-size: 0;
  display: inline-block;
  margin-left: 12px;
  margin-bottom: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  border: ${(props) => (props.isSelect === true ? "1px solid black" : "none")};
`;

const SizeRadioTutle = styled.div`
  padding: 0 12px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
`;

const ChooseSize = ({sizes, choose, handle}) => {
  
  return (
    <>
      <SizeChoose>
        {sizes?.map((size, index) => (
          <SizeRadio
            key={index}
            onClick={() => handle(size)}
          >
            <SizeRadioInner isSelect={choose === size ? true : false}>
              <SizeRadioTutle> {size} </SizeRadioTutle>
            </SizeRadioInner>
          </SizeRadio>
        ))}
      </SizeChoose>
    </>
  );
};

export default ChooseSize;
