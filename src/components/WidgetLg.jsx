import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userRequest } from "../requestMethodes";

const Container = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 75);
  padding: 20px;
  overflow:scroll;
  max-height:500px;
`;

const WidgetLgTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
`;

const WidgetLgTable = styled.table`
  width: 100%;
  border-spacing: 20px;
`;

const WidgetLgTr = styled.tr``;

const WidgetLgTh = styled.th`
  text-align: left;
`;

const WidgetLgUser = styled.td`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const WidgetLgImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const WidgetLgName = styled.span``;
const WidgetLgDate = styled.td``;
const WidgetLgAmount = styled.td``;
const WidgetLgStatus = styled.td``;

const WidgetLgButton = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
  background-color: #${(props) => props.backgroundColor};
  color: #${(props) => props.color};
`;

const WidgetLg = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch (error) {}
    };
    getOrders();
  }, []);

  const dateFormat = (date) => {
    const dateF = new Date(date);
    return dateF.getDate() + "/" + dateF.getMonth() + "/" + dateF.getFullYear();
  };

  return (
    <Container>
      <WidgetLgTitle>Latest transactions</WidgetLgTitle>
      <WidgetLgTable>
        <WidgetLgTr>
          <WidgetLgTh>Customer</WidgetLgTh>
          <WidgetLgTh>Date</WidgetLgTh>
          <WidgetLgTh>Amount</WidgetLgTh>
          <WidgetLgTh>Status</WidgetLgTh>
        </WidgetLgTr>
        {orders.map((order) => (
          <WidgetLgTr key={order._id}>
            <WidgetLgUser>
              <WidgetLgImg src="./img/model.png" />
              <WidgetLgName>{order.userId}</WidgetLgName>
            </WidgetLgUser>
            <WidgetLgDate>{dateFormat(order.createdAt)}</WidgetLgDate>
            <WidgetLgAmount>{order.amount} E</WidgetLgAmount>
            <WidgetLgStatus>
              <WidgetLgButton
                type={order.status}
                backgroundColor="e5faf2"
                color="3bb077"
              >
                {order.status}
              </WidgetLgButton>
              {/* <Button /> */}
            </WidgetLgStatus>
          </WidgetLgTr>
        ))}
      </WidgetLgTable>
    </Container>
  );
};

export default WidgetLg;
