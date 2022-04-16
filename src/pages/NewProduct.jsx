import styled from "styled-components";
import React, { useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { filter } from "../utils";
import ChooseColor from "../components/ChooseColor";
import { ChromePicker } from "react-color";
import CheckBox from "../components/CheckBox";
import { ProductButton } from "./Product";
import { addProduct } from "../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useDispatch } from "react-redux";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;
const Wrapper = styled.div`
  flex: 4;
`;

const NewProductTitle = styled.h1``;
const NewProductForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const NewProductItem = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  & > label {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: rgb(151, 150, 150);
  }
  & > input {
    padding: 10px;
    border: none;
    border-bottom: 1px solid gray;
  }
  & > select {
    padding: 10px;
  }
  & > textarea {
    border: none;
    border-bottom: 1px solid gray;
    resize: none;
  }
`;

const NewProductButton = styled.button`
  border: none;
  background-color: darkblue;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 10px;
  cursor: pointer;
`;

const Wrappe = styled.div`
  display: flex;
  width: 800px;
  flex-wrap: wrap;
`;

const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [size, setSize] = useState([]);
  const [cat, setCat] = useState([]);
  const [file, setFile] = useState(null);
  const [color, setColor] = useState("#fff");
  const [colors, setColors] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [brand, setBrand] = useState("");
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();

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

  const handleCreate = (e) => {
    e.preventDefault();
    if (file && cat && brand && Object.keys(inputs).length > 3) {
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
            addProduct(dispatch, product);
          });
        }
      );
    } else {
      setErrors("Il faut remplir tous les champs");
    }
  };

  return (
    <>
      <Topbar />
      <Container>
        <Sidebar />
        <Wrapper>
          <NewProductTitle>New Product</NewProductTitle>
          <NewProductForm>
            <NewProductItem>
              <label>Image</label>
              <input
                type="file"
                placeholder="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </NewProductItem>

            <NewProductItem>
              <label>Name</label>
              <input
                name="title"
                placeholder="Apple Airpods"
                onChange={handleChange}
              />
            </NewProductItem>
            <NewProductItem>
              <label>Description</label>
              <textarea
                placeholder="A good product"
                name="description"
                onChange={handleChange}
              />
            </NewProductItem>
            <NewProductItem>
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
            </NewProductItem>
            <NewProductItem>
              <label>Catégories</label>
              <Wrappe>
                <CheckBox
                  options={filter.categories}
                  checking={cat}
                  handleFilters={setCat}
                />
              </Wrappe>
            </NewProductItem>
            <NewProductItem>
              <label>Size</label>
              <Wrappe>
                <CheckBox
                  options={filter.size}
                  checking={size}
                  handleFilters={setSize}
                />
              </Wrappe>
            </NewProductItem>
            <NewProductItem>
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
            </NewProductItem>
            <NewProductItem>
              <label>Product Price</label>
              <input
                type="number"
                placeholder="25.2"
                name="price"
                onChange={handleChange}
              />
            </NewProductItem>
            <NewProductItem>
              <label>Stock</label>
              <input
                type="number"
                name="countInStock"
                placeholder="123"
                onChange={handleChange}
              />
            </NewProductItem>
            <NewProductItem>
              <span style={{ color: "red" }}>{errors}</span>
              <NewProductButton onClick={handleCreate}>Create</NewProductButton>
            </NewProductItem>
          </NewProductForm>
        </Wrapper>
      </Container>
    </>
  );
};

export default NewProduct;
