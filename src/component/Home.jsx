import React, { useEffect } from "react";
import Card from "../common/Card";

import { db } from "../firebaseConfig.js";

import { collection, addDoc } from "firebase/firestore";

function Home() {
  useEffect(() => {
    async function addData() {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    addData();
  }, []);
  return (
    <>
      <div className="container mt-3 d-flex">
        <Card name="State" to="/state" />
        <Card name="City" to="/city" />
        <Card name="User" to="/user" />
        <Card name="Auction" to="/auction" />
        <Card name="Product" to="/product" />
      </div>
    </>
  );
}

export default Home;
