import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { addUser } from "../redux/apiCalls";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;
const Wrapper = styled.div`
  flex: 4;
`;
const NewUserTitle = styled.h1``;
const NewUserForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const NewUserItem = styled.div`
  width: 460px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
  & > label {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: rgb(151, 150, 150);
  }
  & > input {
    height: 20px;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
  }
`;
const NewUserGender = styled.div`
  & > input {
    margin-top: 15px;
  }
  & > label {
    margin: 10px;
    font-size: 18px;
    color: #555;
  }
`;
const NewUserSelect = styled.select`
  height: 40px;
  border-radius: 5px;
`;
const NewUserButton = styled.button`
  width: 200px;
  border: none;
  background-color: darkblue;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 30px;
  cursor: pointer;
`;

const NewUser = () => {
  const [inputs, setInputs] = useState({});
  const [userName, setUserName] = useState({});
  const [isAdmin, setAdmin] = useState("true");
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "lastName" || e.target.name === "firstName") {
      setUserName((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    } else {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };
  const handleCreate = (e) => {
    e.preventDefault();
    if (Object.keys(userName).length > 1 && Object.keys(inputs).length > 2)
      addUser({ ...inputs, userName, isAdmin }, dispatch);
    else setErrors("Il faut remplir tous les champs");
  };

  return (
    <>
      <Topbar />
      <Container>
        <Sidebar />
        <Wrapper>
          <NewUserTitle>New User</NewUserTitle>
          <NewUserForm>
            <NewUserItem>
              <label>FirstName</label>
              <input
                type="text"
                placeholder="jon"
                name="firstName"
                onChange={handleChange}
              />
            </NewUserItem>

            <NewUserItem>
              <label>LastName</label>
              <input
                type="text"
                placeholder="jon Snow"
                name="lastName"
                onChange={handleChange}
              />
            </NewUserItem>

            <NewUserItem>
              <label>Email</label>
              <input
                type="email"
                placeholder="jon@gmail.com"
                name="email"
                onChange={handleChange}
              />
            </NewUserItem>

            <NewUserItem>
              <label>Password</label>
              <input
                type="password"
                placeholder="password"
                name="pwd"
                onChange={handleChange}
              />
            </NewUserItem>

            <NewUserItem>
              <label>Admin</label>
              <NewUserSelect
                name="isAdmin"
                onChange={(e) => setAdmin(e.target.value)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </NewUserSelect>
            </NewUserItem>

            <NewUserItem>
              <label>Gender</label>
              <NewUserGender>
                <input
                  type="radio"
                  name="sexe"
                  id="homme"
                  value="homme"
                  onChange={handleChange}
                />
                <label for="homme">Homme</label>
                <input
                  type="radio"
                  name="sexe"
                  id="femme"
                  value="femme"
                  onChange={handleChange}
                />
                <label for="femme">Femme</label>
              </NewUserGender>
            </NewUserItem>

            <NewUserItem>
              <span style={{ color: "red" }}>{errors}</span>
              <NewUserButton onClick={handleCreate}>Create</NewUserButton>
            </NewUserItem>
          </NewUserForm>
        </Wrapper>
      </Container>
    </>
  );
};

export default NewUser;
