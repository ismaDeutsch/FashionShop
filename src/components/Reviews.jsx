import { Star, StarBorder } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import Comment from "./subComponent/Comment";
import Rating from "@mui/material/Rating";

const Container = styled.div`
  color: #767676;
  margin-top: 75px;
  margin-bottom: 40px;
  font-size: 12px;
`;

const ReviewsTitle = styled.h2`
  padding: 20px 0;
  font-size: 24px;
  font-family: Arial Black;
  font-weight: 700;
  text-transform: capitalize;
`;

const CustomerReviews = styled.div``;

const AverateContainer = styled.div`
  background-color: #f7f8fa;
  display: table;
  width: 100%;
  height: 148px;
`;

const AverateItem = styled.div`
  padding: 25px;
  display: table-cell;
  width: 50%;
  vertical-align: top;
`;

const AverateItemName = styled.div`
  margin-bottom: 15px;
  font-size: 16px;
  color: #222;
`;

const Averate = styled.div`
  color: #ffc016;
  font-size: 20px;
  font-weight: 700;
`;

const CommonRate = styled.div`
  display: flex;
  align-items: center;
`;

const RateStar = styled.span`
  font-size: 0;
  margin-right: 6px;
`;

const FitItem = styled.div`
  display: flex;
  align-items: center;
  color: #222;
  margin-top: 12px;
  font-size: 20px;
`;

const Progress = styled.div`
  margin-right: 15px;
  background-color: #e4e4e4;
  border-radius: 4px;
  width: 190px;
  height: 8px;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.width}%;
  background-color: #222;
  border-radius: 4px;
  height: 100%;
`;

const Reviews = ({ reviews, ratings }) => {
  const [value, setValue] = useState(ratings?.avgRating.toFixed(1));
  let avg = {};
  for (let i = 5; i > 0; i--) {
    avg[i] =
      (reviews?.filter((item) => item.rating === i).length * 100) /
      reviews?.length;
  }
  return (
    <Container>
      <ReviewsTitle>Commetaires Des Clients </ReviewsTitle>
      <CustomerReviews>
        <AverateContainer>
          <AverateItem>
            <AverateItemName>Note Moyenne</AverateItemName>
            <Averate>
              <CommonRate>
                <RateStar>
                  <Rating
                    value={value}
                    icon={<Star fontSize="large" />}
                    emptyIcon={<StarBorder fontSize="large" />}
                    precision={0.5}
                    readOnly
                  />
                </RateStar>
                {ratings?.avgRating.toFixed(1)}
              </CommonRate>
            </Averate>
          </AverateItem>
          <AverateItem>
            <AverateItemName>
              Description Sommaire De La notation
            </AverateItemName>
            {Object.entries(avg).map(([key, subject], i) => (
              <FitItem key={i}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  {key}
                </span>
                <Star />
                <Progress>
                  <ProgressBar width={subject ? subject : 0} />
                </Progress>
                <span>{subject ? subject.toFixed(0) : 0} %</span>
              </FitItem>
            ))}
          </AverateItem>
        </AverateContainer>
      </CustomerReviews>
      <Comment reviews={reviews}/>
    </Container>
  );
};

export default Reviews;
