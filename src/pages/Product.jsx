import { Publish } from "@material-ui/icons";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Chart from "../components/Chart";
import { userRequest } from "../requestMethodes";
import CheckBox from "../components/CheckBox";
import { filter } from "../utils";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ChromePicker } from "react-color";
import ChooseColor from "../components/ChooseColor";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { updateProduct } from "../redux/apiCalls";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;
const Wrapper = styled.div`
  flex: 4;
`;

const ProductTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProductTitle = styled.h1``;

const ProductTop = styled.div`
  display: flex;
`;

const ProductBottom = styled.div`
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 75);
`;

const ProductTopLeft = styled.div`
  flex: 1;
`;

const ProductTopRight = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 75);
`;

const ProductInfoTop = styled.div`
  display: flex;
  align-items: center;
`;

const ProductInfoBottom = styled.div`
  margin-top: 10px;
`;

const ProductInfoImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const ProductName = styled.span`
  font-weight: 600;
`;

const ProductInfoItem = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
`;

const ProductInfoKey = styled.span``;
const ProductInfoValue = styled.span``;

const ProductForm = styled.form`
  display: flex;
  justify-content: space-between;
`;

const ProductFormLeft = styled.div`
  display: flex;
  flex-direction: column;
  & > label {
    margin-bottom: 10px;
    color: gray;
  }
  & > input,
  textarea {
    margin-bottom: 10px;
    border: none;
    padding: 5px;
    border-bottom: 1px solid gray;
    resize: none;
    width: 200px;
  }
`;

const ProductFormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductUploadImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

export const ProductButton = styled.button`
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  cursor: pointer;
  width: 200px;
`;

const Wrappe = styled.div`
  display: flex;
  width: 800px;
  flex-wrap: wrap;
`;

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.products.products.find((product) => product._id === productId)
  );
  const [productStats, setProductStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [size, setSize] = useState(product?.size);
  const [cat, setCat] = useState(product?.categories);
  const [file, setFile] = useState(null);
  const [color, setColor] = useState("#fff");
  const [colors, setColors] = useState(product?.color);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [brand, setBrand] = useState(product?.brand);
  const dispatch = useDispatch();

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
        const res = await userRequest.get("/orders/income?pid");
        res.data.map((item) => {
          setProductStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ]);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);

  const countSales = () => {
    let count = 0;
    productStats.forEach((product) => {
      count += product.Sales;
    });
    return count;
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handlerColorPicker = (e) => {
    e.preventDefault();
    if (showColorPicker) {
      setColors((prev) => {
        return [...prev, color.replace("#", "")];
      });
      setShowColorPicker(false);
    } else {
      setShowColorPicker(true);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            const product = {
              ...inputs,
              image: downloadURL,
              size,
              color: colors,
              brand: brand,
              categories: cat,
            };
            updateProduct(dispatch, productId, product);
          });
        }
      );
    } else {
      const product = {
        ...inputs,
        size,
        color: colors,
        brand: brand,
        categories: cat,
      };
      updateProduct(dispatch, productId, product);
    }
  };

  return (
    <>
      <Topbar />
      <Container>
        <Sidebar />
        <Wrapper>
          <ProductTitleContainer>
            <ProductTitle>Product</ProductTitle>
          </ProductTitleContainer>
          <ProductTop>
            <ProductTopLeft>
              <Chart
                data={productStats}
                dataKey="Sales"
                title="Sales Performance"
              />
            </ProductTopLeft>
            <ProductTopRight>
              <ProductInfoTop>
                <ProductInfoImg src={product?.image} />
                <ProductName>{product?.title}</ProductName>
              </ProductInfoTop>
              <ProductInfoBottom>
                <ProductInfoItem>
                  <ProductInfoKey>{product?._id}</ProductInfoKey>
                  <ProductInfoValue>123</ProductInfoValue>
                </ProductInfoItem>
                <ProductInfoItem>
                  <ProductInfoKey>sales:</ProductInfoKey>
                  <ProductInfoValue>{countSales()}</ProductInfoValue>
                </ProductInfoItem>
                <ProductInfoItem>
                  <ProductInfoKey>in stock:</ProductInfoKey>
                  <ProductInfoValue>{product.countInStock}</ProductInfoValue>
                </ProductInfoItem>
              </ProductInfoBottom>
            </ProductTopRight>
          </ProductTop>
          <ProductBottom>
            <ProductForm>
              <ProductFormLeft>
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder={product.title}
                  name="title"
                  onChange={handleChange}
                />
                <label>Product Description</label>
                <textarea
                  type="text"
                  placeholder={product.description}
                  name="description"
                  onChange={handleChange}
                />
                <label>Brand</label>
                <FormControl
                  variant="standard"
                  sx={{ width: 210, marginBottom: 1 }}
                >
                  <Select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Shein"}>Shein</MenuItem>
                    <MenuItem value={"Nike"}>Nike</MenuItem>
                    <MenuItem value={"Adidas"}>Adidas</MenuItem>
                  </Select>
                </FormControl>
                <label>Catégories</label>
                <Wrappe>
                  <CheckBox
                    options={filter.categories}
                    checking={product.categories}
                    handleFilters={setCat}
                  />
                </Wrappe>
                <label>Size</label>
                <Wrappe>
                  <CheckBox
                    options={filter.size}
                    checking={product.size}
                    handleFilters={setSize}
                  />
                </Wrappe>
                <label>Color</label>
                <ProductButton onClick={handlerColorPicker}>
                  Ajouter une couleur
                </ProductButton>
                {showColorPicker && (
                  <>
                    <ChromePicker
                      color={color}
                      onChange={(updateColor) => setColor(updateColor.hex)}
                    />
                    <ProductButton
                      onClick={(e) => {
                        e.preventDefault();
                        setShowColorPicker(false);
                      }}
                    >
                      Annuler
                    </ProductButton>
                  </>
                )}
                <ChooseColor colors={colors} setColors={setColors} />
                <label>Product Price</label>
                <input
                  type="number"
                  placeholder={product.price}
                  name="price"
                  onChange={handleChange}
                />
                <label>In Stock</label>
                <input
                  type="number"
                  placeholder={product?.countInStock}
                  name="countInStock"
                  onChange={handleChange}
                />

                <ProductButton onClick={handleUpdate}>Update</ProductButton>
              </ProductFormLeft>
              <ProductFormRight>
                <ProductUpload>
                  <ProductUploadImg src={product.image} />
                  <label htmlFor="file">
                    <Publish style={{ fontSize: 50 }} />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </ProductUpload>
              </ProductFormRight>
            </ProductForm>
          </ProductBottom>
        </Wrapper>
      </Container>
    </>
  );
};

export default Product;
