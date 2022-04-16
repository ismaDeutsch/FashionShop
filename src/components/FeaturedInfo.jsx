import styled from "styled-components";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../requestMethodes";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FeaturedItem = styled.div`
  flex: 1;
  margin: 0px 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 75);
`;

const FeaturedTitle = styled.span`
  font-size: 20px;
`;

const FeaturedMoneyContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`;

const FeaturedMoney = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const FeaturedMoneyRate = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const FeaturedSub = styled.span`
  font-size: 15px;
  color: gray;
`;

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [incomePerc, setIncomePerc] = useState(0);
  const [sales, setSales] = useState([]);
  const [salesPerc, setSalesPerc] = useState(0);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income", {
          withCredentials: true,
        });
        setIncome(res.data);
        setIncomePerc(
          (res.data[res.data.length - 1].total /
            res.data[res.data.length - 2].total) *
            100
        );
      } catch (error) {
        console.log(error);
      }
    };
    const getSales = async () => {
      try {
        const res = await userRequest.get("orders/sales", {
          withCredentials: true,
        });
        setSales(res.data);
        setSalesPerc(
          (res.data[res.data.length - 1].total /
            res.data[res.data.length - 2].total) *
            100
        );
      } catch (error) {
        console.log(error);
      }
    };
    currentUser && getIncome() && getSales();
  }, [currentUser]);

  return (
    <Container>
      <FeaturedItem>
        <FeaturedTitle>Revanue</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>
            {Math.floor(income[income.length - 1]?.total)} €
          </FeaturedMoney>
          <FeaturedMoneyRate>
            {Math.floor(incomePerc)}%{" "}
            {incomePerc < 0 ? (
              <ArrowDownward
                style={{ fontSize: 14, marginLeft: 5, color: "red" }}
              />
            ) : (
              <ArrowUpward
                style={{ fontSize: 14, marginLeft: 5, color: "green" }}
              />
            )}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>

      <FeaturedItem>
        <FeaturedTitle>Sales</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>
            {Math.floor(sales[sales.length - 1]?.total)}
          </FeaturedMoney>
          <FeaturedMoneyRate>
            {Math.floor(salesPerc)}%{" "}
            {salesPerc < 0 ? (
              <ArrowDownward
                style={{ fontSize: 14, marginLeft: 5, color: "red" }}
              />
            ) : (
              <ArrowUpward
                style={{ fontSize: 14, marginLeft: 5, color: "green" }}
              />
            )}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
    </Container>
  );
};

export default FeaturedInfo;
