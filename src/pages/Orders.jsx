import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar/NavBar";
import { Button } from "../components/Settings";
import SideNav from "../components/SideNav";
import { getOrders } from "../redux/apiCalls";
import { dateFormat } from "../util";

const Container = styled.div``;

const Wrapper = styled.div`
  margin: 40px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Main = styled.main`
  display: flex;
  flex: 1;
  padding-left: 10rem;
  padding-right: 10rem;
`;

const Title = styled.h1`
  text-align: center;
`;

const Top = styled.div`
  margin: 50px 0 20px 0;
  display: flex;
  justify-content: space-around;
  background-color: #f7f8fa;
  height: 40px;
  align-items: center;
`;

const TopTitle = styled.span`
  font-size: 20px;
`;

const Contente = styled.div`
  margin-top: 20px;
`;

const Item = styled.div`
  padding-top: 10px;
  border: 1px solid lightgray;
`;

const Ref = styled.span`
  margin: 20px;
  font-size: 12px;
`;

const Details = styled.div`
  padding: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  height: 140px;
`;

const Span = styled.span`
  font-size: ${(props) => (props.ar ? "18px" : "24px")};
  font-weight: ${(props) => (props.ar ? "null" : "600")};
`;

const Orders = () => {
  const user = useSelector((state) => state.user.currentUser);
  const orders = useSelector((state) => state.order.orders);
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  
  useEffect(() => {
    getOrders(dispatch, user.user._id);
  }, [user, dispatch]);

  return (
    <Container>
      <NavBar />
      <Main>
        <SideNav profil={true} />
        <Wrapper>
          <Title>MES COMMANDES</Title>
          {/* 
                    Quand il n'y a aucune commande

                <ListAlt style={{marginTop:40, fontSize: 70, color: "gray"}} />
                <SideRightText>Vide ici :-(</SideRightText>
                */}
          <Top>
            <TopTitle>Les articles</TopTitle>
            <TopTitle>Total</TopTitle>
            <TopTitle>État</TopTitle>
            <TopTitle>Activités de commande</TopTitle>
          </Top>
          <Contente>
            {orders &&
              orders?.map((order) => (
                <Item key={order._id}>
                  <Ref>
                    {dateFormat(order.createdAt)} Numéro de commande {order._id}
                  </Ref>
                  <Details>
                    <Column>
                      <Img
                        src={
                          products.filter(
                            (product) =>
                              product._id === order.products[0].productId
                          )[0].image
                        }
                      />
                      <Span ar="true">{order.products.length} Articles</Span>
                    </Column>
                    <Column>
                      <Span>{order.amount} €</Span>
                    </Column>
                    <Column>
                      <Span>{order.status}</Span>
                    </Column>
                    <Column>
                      <Link to={`/profil/myorders/review/${order._id}`}>
                        <Button type="sub">Commentaire</Button>
                      </Link>
                    </Column>
                  </Details>
                </Item>
              ))}
          </Contente>
        </Wrapper>
      </Main>
    </Container>
  );
};

export default Orders;
