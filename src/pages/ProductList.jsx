import { React, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar/NavBar";
import Products from "../components/Products";
import SideNav from "../components/SideNav";

const Container = styled.div``;

const Title = styled.h3`
  margin: 20px;
`;

const FilerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 50px 0 20px;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const Main = styled.main`
  display: flex;
  flex: 1;
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [sort, setSort] = useState("popular");
  const [sizeFilter, setSizeFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [catFilter, setCatFilter] = useState([]);

  const handleFilters = (data, type) => {
    type === "color"
      ? setColorFilter(data)
      : type === "size"
      ? setSizeFilter(data)
      : type === "price"
      ? setPriceFilter(data)
      : setCatFilter(data);
  };
  const filters = { sizeFilter, colorFilter, priceFilter, catFilter };

  return (
    <Container>
      <NavBar />
      <Title>
        Accueil /{" "}
        {cat
          ? cat === "news"
            ? "Nouveauté /"
            : cat[0].toUpperCase() + cat.slice(1)
            + " /"
          : null}{" "}
         Voir Tout
      </Title>
      <FilerContainer>
        <Filter>
          <FilterText>
            {cat
              ? cat === "news"
                ? "Nouveauté"
                : cat[0].toUpperCase() + cat.slice(1)
              : null}{" "}
          </FilterText>
        </Filter>
        <Filter>
          <FilterText>Trie par:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="popular">Populaire</Option>
            <Option value="selling">Les plus vendu</Option>
            <Option value="asc">Prix bas à élevé</Option>
            <Option value="desc">Prix élevé à bas</Option>
          </Select>
        </Filter>
      </FilerContainer>
      <Main>
        <SideNav handleFilters={handleFilters} />
        <Products cat={cat} filters={filters} sort={sort} />
      </Main>
      <Footer />
    </Container>
  );
};

export default ProductList;
