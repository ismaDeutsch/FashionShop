import { Star } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { dateFormat } from "../../util";

const Container = styled.div``;

const CommentEach = styled.div`
  padding: 25px 0;
  border-bottom: 1px dashed #e5e5e5;
  position: relative;
  width: 100%;
`;

const CommentLeft = styled.div`
  float: left !important;
  width: 288px;
  white-space: nowrap;
`;

const NikeName = styled.div`
  margin-bottom: 15px;
  color: #222;
  font-weight: 700;
`;

const CommentRight = styled.div`
  padding-right: 150px;
  position: relative;
  width: calc(100% -288px);
  display: flex;
`;

const CommentDetail = styled.div`
  padding-right: 40px;
  width: 50%;
`;

const RateStar = styled.div`
  margin-bottom: 7px;
  font-size: 16px;
`;

const RateDesc = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  color: #222;
  line-height: 21px;
  word-break: break-word;
  outline: 0;
`;

const Date = styled.div`
  right: 0;
  position: absolute;
  font-size: 13px;
`;

const Comment = ({ reviews }) => {
  return (
    <Container>
      {reviews?.map((review, index) => (
        <CommentEach key={index}>
          <CommentLeft>
            <NikeName>
              {review._id.replace(review._id.substring(0, 13), "*")}
            </NikeName>
          </CommentLeft>
          <CommentRight>
            <CommentDetail>
              <RateStar>
                <span>
                  {Array(review.rating).fill(
                    <Star style={{ color: "#faaf00" }} />
                  )}
                </span>
              </RateStar>
              <RateDesc>{review.comment}</RateDesc>
              <Date>{dateFormat(review.createdAt)}</Date>
            </CommentDetail>
          </CommentRight>
        </CommentEach>
      ))}
    </Container>
  );
};

export default Comment;
