import { React, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getProduct } from "../redux/apiCalls";
import Product1 from "./Product1";

const Container = styled.div`
  margin-left: 60px;
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
`;

const Products = ({ cat, filters, sort, home }) => {
  const products = useSelector((state) => state.product.products);
  const [filtredProduct, setFiltredProduct] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct(dispatch, cat);
  }, [cat, dispatch]);

  const applyFilters = useCallback(() => {
    let dataFiltred = products;
    //Size Filter
    if (filters.sizeFilter.length) {
      dataFiltred = dataFiltred.filter((item) =>
        Object.values(filters.sizeFilter).some((value) =>
          item.size.includes(value)
        )
      );
    }
    //Color Filter
    if (filters.colorFilter.length) {
      dataFiltred = dataFiltred.filter((item) =>
        Object.values(filters.colorFilter).some((value) =>
          item.color.includes(value)
        )
      );
    }
    //PriceFilter
    if (filters.priceFilter.length) {
      dataFiltred = dataFiltred.filter(
        (item) =>
          item.price >= filters.priceFilter[0] &&
          item.price <= filters.priceFilter[1]
      );
    }
    //CategorieFilter
    if (filters.catFilter.length) {
      dataFiltred = dataFiltred.filter((item) =>
        Object.values(filters.catFilter).some((value) =>
          item.categories.includes(value.toLowerCase())
        )
      );
    }
    setFiltredProduct(dataFiltred);
  }, [filters, products]);

  useEffect(() => {
    cat && applyFilters();
  }, [cat, applyFilters]);

  useEffect(() => {
    switch (sort) {
      case "popular":
        setFiltredProduct((prev) =>
          [...prev].sort((a, b) => b.reviews.length - a.reviews.lenght)
        );
        break;
      case "asc":
        setFiltredProduct((prev) =>
          [...prev].sort((a, b) => a.price - b.price)
        );
        break;
      case "desc":
        setFiltredProduct((prev) =>
          [...prev].sort((a, b) => b.price - a.price)
        );
        break;
      default:
        return;
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filtredProduct.map((item) => <Product1 item={item} key={item._id} />)
        : home
        ? products
            .slice(0, 10)
            .map((item) => <Product1 item={item} key={item._id} />)
        : products.map((item) => <Product1 item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
