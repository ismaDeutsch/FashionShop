import styled from "styled-components";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, getProduct } from "../redux/apiCalls";
import { useSelector } from "react-redux";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;
const Wrapper = styled.div`
  flex: 4;
`;

const ProductListItem = styled.div`
  display: flex;
  align-items: center;
`;

const ProductListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ProductListEdit = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;
const ProductAddButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin:20px;
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  useEffect(() => {
    getProduct(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <ProductListItem>
            <ProductListImg src={params.row.image} />
            {params.row.title}
          </ProductListItem>
        );
      },
    },
    { field: "countInStock", headerName: "Stock", width: 200 },
    {
      field: "size",
      headerName: "Sizes",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <ProductListEdit>Edit</ProductListEdit>
            </Link>
            <DeleteOutline
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
    <Topbar/>
    <Container>
    <Sidebar />
    <Wrapper>
    
      <Link to="/newProduct">
        <ProductAddButton>Create</ProductAddButton>
      </Link>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Wrapper>
    </Container>
    </>
  );
};

export default ProductList;
