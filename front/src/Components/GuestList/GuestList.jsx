import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Background,
  GuestCard,
  GuestCardContainer,
  H1Styled,
} from "./GuestList.style";

export const GuestList = () => {
  const [guestList, setGuestList] = useState([]);

  useEffect(() => {
    const fetchGuestList = async () => {
      try {
        const response = await axios.get("http://localhost:5000/");
        setGuestList(response.data);
      } catch (error) {
        console.error("Error fetching guest list:", error);
      }
    };
    //s
    fetchGuestList();
  }, []);

  const guestDelete = async (guestId) => {
    try {
      await axios.delete(`http://localhost:3000/${guestId}`);

      setGuestList(guestList.filter((guest) => guest._id !== guestId));
      console.log(guestId);
      alert("Guest deleted succesfully");
    } catch (error) {
      alert("Failed to delete guest.");
    }
  };

  return (
    <Background>
      <div className="d-flex">
        <H1Styled className="text-center">Guest list</H1Styled>
        <GuestCardContainer>
          {guestList.map((guest) => (
            <GuestCard key={guest._id}>
              <p>Name: {guest.name}</p>
              <p>Mail: {guest.mail}</p>
              <p>Age: {guest.age}</p>
              <button onClick={() => guestDelete(guest._id)}>Delete</button>
            </GuestCard>
          ))}
        </GuestCardContainer>
      </div>
    </Background>
  );
};
