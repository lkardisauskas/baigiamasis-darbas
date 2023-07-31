import React, { useState, useEffect } from "react";
import axios from "axios";
import { GuestList } from "./Components/GuestList/GuestList";
import { ButtonStyled, FormStyled, InputStyled } from "./app.style";
function App() {
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    age: "",
  });

  const [guestList, setGuestList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/", formData);
      const newGuest = response.data;
      alert(`Guest ${newGuest.name} added successfully`);
      setGuestList([...guestList, newGuest]);
      setFormData({
        name: "",
        mail: "",
        age: "",
      });
    } catch (error) {
      console.error("Error adding guest:", error);
      alert("Failed to add guest. Please try again.");
    }
  };

  useEffect(() => {
    const fetchGuestList = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        setGuestList(response.data);
      } catch (error) {
        console.error("Error fetching guest list:", error);
      }
    };

    fetchGuestList();
  }, []);

  return (
    <div>
      <FormStyled onSubmit={handleSubmit}>
        <InputStyled
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputStyled
          type="text"
          name="mail"
          placeholder="Mail"
          value={formData.mail}
          onChange={handleChange}
        />
        <InputStyled
          type="text"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <ButtonStyled type="submit">Add Guest</ButtonStyled>
      </FormStyled>
      <GuestList />
    </div>
  );
}

export default App;
