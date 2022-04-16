import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Chart from "../components/Chart";
import FeaturedInfo from "../components/FeaturedInfo";
import Topbar from "../components/Topbar";
import WidgetLg from "../components/WidgetLg";
import WidgetSm from "../components/WidgetSm";
import { userRequest } from "../requestMethodes";
import Sidebar from "../components/Sidebar";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  flex: 4;
`;

const HomeWidgets = styled.div`
  display: flex;
  margin: 20px;
`;

const Home = () => {
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Fev",
      "Mar",
      "Avr",
      "Mai",
      "Jun",
      "Jul",
      "Aou",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/user/stats");
        res.data.map((item) => {
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ]);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <>
      <Topbar />
      <Container>
        <Sidebar />
        <Wrapper>
          <FeaturedInfo />
          <Chart
            data={userStats}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
          <HomeWidgets>
            <WidgetSm />
            <WidgetLg />
          </HomeWidgets>
        </Wrapper>
      </Container>
    </>
  );
};

export default Home;
