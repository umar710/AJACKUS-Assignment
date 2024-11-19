import { useEffect, useState } from "react";
import HomeItems from "../HomeItems";
import Loader from "react-loader-spinner";
import "./index.css";

const Home = () => {
  // State to manage the list of user data
  const [showData, setShowData] = useState([]);

  // State to manage the loader visibility
  const [isLoader, setLoader] = useState(true);

  // States for form inputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // States to handle edit functionality
  const [isUpdate, setIsUpdate] = useState(true);
  const [editId, setEditId] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const getApiCall = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      console.log(data);
      const updatedShowData = data.map((eachItem) => ({
        id: eachItem.id,
        name: eachItem.name,
        phone: eachItem.phone,
      }));
      setShowData(updatedShowData);
      setLoader(false);
    };
    getApiCall();
  }, []);

  // Function to handle deleting a user
  const onDeletedItem = async (id) => {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(apiUrl, options);

    if (response.status === 200) {
      setShowData(showData.filter((eachItem) => eachItem.id !== id));
    }
  };

  // Handlers for form input changes
  const onChangeNameInput = (event) => setName(event.target.value);
  const onChangePhoneInput = (event) => setPhone(event.target.value);

  // Function to add a new contact or update an existing one
  const onAddContact = async (event) => {
    event.preventDefault();

    if (name.trim() === "" || phone.trim() === "") {
      alert("Both fields are required!");
      return;
    }

    if (isUpdate) {
      // Add new contact
      const id = showData.length > 0 ? showData[showData.length - 1].id + 1 : 1;
      const newData = { id, name, phone };

      const apiUrl = "https://jsonplaceholder.typicode.com/users";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      };

      const response = await fetch(apiUrl, options);

      if (response.status === 201) {
        setShowData([...showData, newData]);
        setName("");
        setPhone("");
      }
    } else {
      // Update existing contact
      UpdateDataBtn();
    }
  };

  // Function to handle editing a user
  const onEditItem = (id) => {
    const data = showData.find((eachItem) => eachItem.id === id);
    if (data) {
      setName(data.name);
      setPhone(data.phone);
      setIsUpdate(false);
      setEditId(id);
    }
  };

  // Function to update user data
  const UpdateDataBtn = async () => {
    const updatedData = { id: editId, name, phone };

    const apiUrl = `https://jsonplaceholder.typicode.com/users/${editId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    };

    const response = await fetch(apiUrl, options);

    if (response.status === 200) {
      const updatedList = showData.map((eachItem) =>
        eachItem.id === editId ? updatedData : eachItem
      );
      setShowData(updatedList);
      setName("");
      setPhone("");
      setIsUpdate(true);
      setEditId(null);
    }
  };

  return (
    <div className="bg-container">
      <h1>Management Dashboard</h1>
      <form className="contact-form-container" onSubmit={onAddContact}>
        <input
          className="input"
          placeholder="Name"
          value={name}
          onChange={onChangeNameInput}
        />
        <input
          className="input"
          placeholder="Phone No."
          value={phone}
          onChange={onChangePhoneInput}
        />
        <button type="submit" className="button">
          {isUpdate ? "Add" : "Update"}
        </button>
      </form>
      {isLoader ? (
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      ) : (
        <ul className="cards-container">
          {showData.map((eachItem) => (
            <HomeItems
              key={eachItem.id}
              HomeItemsDetails={eachItem}
              onDeletedItem={onDeletedItem}
              onEditItem={onEditItem}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;

/*
import { useEffect, useState } from "react";
import HomeItems from "../HomeItems";
import Loader from "react-loader-spinner";
import "./index.css";

const Home = () => {
  const [showData, setShowData] = useState([]);
  const [isLoader, setLoader] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isUpdate, setIsUpdate] = useState(true);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const getApiCall = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      console.log(data);
      const updatedShowData = data.map((eachItem) => ({
        id: eachItem.id,
        name: eachItem.name,
        phone: eachItem.phone,
      }));
      setShowData(updatedShowData);
      setLoader(false);
    };
    getApiCall();
  }, []);

  const onDeletedItem = async (id) => {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(apiUrl, options);

    if (response.status === 200) {
      setShowData(showData.filter((eachItem) => eachItem.id !== id));
    }
  };

  const onChangeNameInput = (event) => setName(event.target.value);
  const onChangePhoneInput = (event) => setPhone(event.target.value);

  const onAddContact = async (event) => {
    event.preventDefault();

    if (name.trim() === "" || phone.trim() === "") {
      alert("Both fields are required!");
      return;
    }

    if (isUpdate) {
      const id = showData.length > 0 ? showData[showData.length - 1].id + 1 : 1;
      const newData = { id, name, phone };

      const apiUrl = "https://jsonplaceholder.typicode.com/users";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      };

      const response = await fetch(apiUrl, options);

      if (response.status === 201) {
        setShowData([...showData, newData]);
        setName("");
        setPhone("");
      }
    } else {
      UpdateDataBtn();
    }
  };

  const onEditItem = (id) => {
    const data = showData.find((eachItem) => eachItem.id === id);
    if (data) {
      setName(data.name);
      setPhone(data.phone);
      setIsUpdate(false);
      setEditId(id);
    }
  };

  const UpdateDataBtn = async () => {
    const updatedData = { id: editId, name, phone };

    const apiUrl = `https://jsonplaceholder.typicode.com/users/${editId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    };

    const response = await fetch(apiUrl, options);

    if (response.status === 200) {
      const updatedList = showData.map((eachItem) =>
        eachItem.id === editId ? updatedData : eachItem
      );
      setShowData(updatedList);
      setName("");
      setPhone("");
      setIsUpdate(true);
      setEditId(null);
    }
  };

  return (
    <div className="bg-container">
      <h1>Management Dashboard</h1>
      <form className="contact-form-container" onSubmit={onAddContact}>
        <input
          className="input"
          placeholder="Name"
          value={name}
          onChange={onChangeNameInput}
        />
        <input
          className="input"
          placeholder="Phone No."
          value={phone}
          onChange={onChangePhoneInput}
        />
        <button type="submit" className="button">
          {isUpdate ? "Add" : "Update"}
        </button>
      </form>
      {isLoader ? (
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      ) : (
        <ul className="cards-container">
          {showData.map((eachItem) => (
            <HomeItems
              key={eachItem.id}
              HomeItemsDetails={eachItem}
              onDeletedItem={onDeletedItem}
              onEditItem={onEditItem}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;


*/
