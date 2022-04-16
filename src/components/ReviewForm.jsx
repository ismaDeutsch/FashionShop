import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  margin-top: 50px;
  width: 50%;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 60px;
  flex: 1;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

const Image = styled.img`
  width: 150px;
  height: 200px;
`;

const P = styled.span`
  font-size: 15px;
  margin-top: 10px;
`;

const Notation = styled.div`
  display: flex;
  align-items: center;
`;

const Span = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin: 30px;
`;

const Form = styled.form`
  display: flex;
  margin: 30px;
  width: 90%;
  flex-direction: column;
  & > label {
    font-size: 24px;
    font-weight: 600;
    margin-right: 30px;
  }
  & > textarea {
    margin-top: 20px;
    resize: none;
    border: 1px solid lightgrey;
    font-size: 18px;
    padding: 10px;
    height: 80px;
  }
`;

const labels = {
  1: "Inutile",
  2: "Pauvre",
  3: "Ok",
  4: "Bien",
  5: "Excellent",
};

const ReviewForm = ({ product, img, name, setAllReviews, allReviews }) => {
  const [value, setValue] = useState(5);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState({});

  const handleChange = (e, id) => {
    setComment((prev) => ({
      ...prev,
      comment: e.target.value,
      productId: id,
      rating: value,
    }));
    if (Object.keys(comment).length > 0) {
      const isExist = allReviews.find((review) => review.productId === id);
      isExist
        ? setAllReviews(
            allReviews.map((review) =>
              review.productId === id
                ? { ...review, comment: e.target.value }
                : review
            )
          )
        : setAllReviews((prev) => [...prev, comment]);
    }
  };

  const handleRating = (e, id) => {
    setValue(e.target.value);
    setComment((prev) => ({
      ...prev,
      productId: id,
      rating: e.target.value,
    }));
    if (Object.keys(comment).length > 0) {
      const isExist = allReviews.find((review) => review.productId === id);
      isExist
        ? setAllReviews(
            allReviews.map((review) =>
              review.productId === id
                ? { ...review, rating: e.target.value }
                : review
            )
          )
        : setAllReviews((prev) => [...prev, comment]);
    }
  };

  return (
    <Box>
      <Left>
        <Image src={img} />
        <P>{name} </P>
        <P>
          {product.color} / {product.size}
        </P>
        <P>Quantité(s): {product.quantity}</P>
      </Left>
      <Right>
        <Notation>
          <Span>Notation</Span>
          <Rating
            value={value}
            onChange={(e) => handleRating(e, product.productId)}
            onChangeActive={(e, newHover) => {
              setHover(newHover);
            }}
          />
          <Span>{labels[hover !== -1 ? hover : value]}</Span>
        </Notation>
        <Form>
          <label>Commentaire*</label>
          <textarea
            onChange={(e) => handleChange(e, product.productId)}
            name="comment"
            placeholder="Commentez avec plus de 10 caractères."
          />
        </Form>
      </Right>
    </Box>
  );
};

export default ReviewForm;
