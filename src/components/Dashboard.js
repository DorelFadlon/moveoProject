import { doc, getDoc, Timestamp } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "users", currentUser.email);
      const docSnap = await getDoc(docRef);
      setAddress(docSnap.data().address);
      setName(docSnap.data().fullname);
      setBirthday(docSnap.data().birthday);
      // console.log(docSnap.data().address);
      // console.log(docSnap.data().fullname);
      // console.log(docSnap.data().birthday);
    };
    getData();
  }, []);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert verient="danger">{error}</Alert>}
          <p>
            <strong>Email: </strong> {currentUser?.email}
          </p>
          <p>
            <strong>Full Name: </strong> {name}
          </p>
          <p>
            <strong>Address: </strong> {address}
          </p>
          <strong>Birth Date: </strong> {birthday}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
