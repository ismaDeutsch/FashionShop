import { React, useState, useEffect } from "react";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import Reviews from "../components/Reviews";
import { publicRequest } from "../requestMethods";
import ChooseColor from "../components/subComponent/ChooseColor";
import ChooseSize from "../components/subComponent/ChooseSize";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import NavBar from "../components/NavBar/NavBar";

const Container = styled.div``;

const Wrapper = styled.div`
  padding-left: 15%;
  padding-right: 15%;
`;

const SelectBox = styled.div`
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px dashed #e5e5e5;
`;

const ColorTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  display: inline-block;
`;

const ImgContainer = styled.div`
  width: 670px;
  min-width: 465px;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 85vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const RelateColorContainer = styled.section`
  margin-top: 4px;
  display: flex;
  margin-left: 12px;
  align-items: center;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const Size = styled.div`
  margin-top: 15px;
`;

const ProductContainer = styled.div`
  display: flex;
  margin-top: 50px;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    type === "dec"
      ? amount > 1 && setAmount(amount - 1)
      : amount < product.countInStock && setAmount(amount + 1);
  };

  const handleClick = () => {
    if (product.color.length !== 0 && product.size.length !== 0) {
      if (size && color) {
        dispatch(addProduct({ ...product, amount, color, size }));
        setErrors("");
      } else setErrors("Ils faut choisir une couleur et/ou une taille");
    } else if (product.color.length !== 0 || product.size.length !== 0) {
      if (size || color) {
        dispatch(addProduct({ ...product, amount, color, size }));
        setErrors("");
      } else setErrors("Ils faut choisir une couleur et/ou une taille");
    } else {
      dispatch(addProduct({ ...product, amount, color, size }));
      setErrors("");
    }
  };

  return (
    <Container>
      <NavBar />
      <Wrapper>
        <ProductContainer>
          <ImgContainer>
            <Image src={product.image} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.description}</Desc>
            <Price>{product.price} €</Price>
            <SelectBox>
              <span style={{ color: "red" }}>{errors}</span>
              <br />
              {product.color?.length !== 0 ? (
                <ColorTitle>Couleur:</ColorTitle>
              ) : null}
              <RelateColorContainer>
                <ChooseColor
                  colors={product.color}
                  choose={color}
                  handle={setColor}
                />
              </RelateColorContainer>
              <Size>
                {product.size?.length !== 0 ? (
                  <ColorTitle>Taille: </ColorTitle>
                ) : null}
                <ChooseSize
                  sizes={product.size}
                  choose={size}
                  handle={setSize}
                />
              </Size>
            </SelectBox>
            <AddContainer>
              <AmountContainer>
                <Remove
                  onClick={() => handleQuantity("dec")}
                  style={{ cursor: "pointer" }}
                />
                <Amount>{amount}</Amount>
                <Add
                  onClick={() => handleQuantity("inc")}
                  style={{ cursor: "pointer" }}
                />
              </AmountContainer>
              {product.countInStock > 0 ? (
                <Button onClick={handleClick}>Ajouter au panier</Button>
              ) :  <Button style={{cursor:"not-allowed", color:"red"}}>Rupture de stock</Button>}
            </AddContainer>
          </InfoContainer>
        </ProductContainer>
        <Reviews reviews={product.reviews} ratings={product.ratings} />
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Product;
