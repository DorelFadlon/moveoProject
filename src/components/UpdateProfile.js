import { doc, updateDoc, getDoc } from "firebase/firestore/lite";
import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export default function UpdateProfile() {
  // const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const addressRef = useRef();
  const birthdayRef = useRef();
  const fullNameRef = useRef();
  const {
    currentUser,
    updateUserPassword,
    deleteAccount,
    updateDocumentAddress,
    updateDocumentBirthday,
    updateDocumentFullName,
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();
  const userRef = doc(db, "users", currentUser.email);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "users", currentUser.email);
      const docSnap = await getDoc(docRef);
      setAddress(docSnap.data().address);
      setFullName(docSnap.data().fullname);
      setBirthday(docSnap.data().birthday);
    };
    getData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    console.log(birthday);

    const promises = [];
    setLoading(true);
    setError("");

    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }

    if (addressRef.current.value !== address) {
      promises.push(updateDocumentAddress(addressRef.current.value));
    }

    // if (birthdayRef.current.value !== birthday) {
    //   promises.push(updateDocumentBirthday(birthdayRef.current.value));
    // }

    if (fullNameRef.current.value !== fullName) {
      promises.push(updateDocumentFullName(fullNameRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function handleDelete() {
    setError("");

    try {
      await deleteAccount();
      navigate("/signup");
    } catch {
      setError("Failed to delete account");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert verient="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                // placeholder={emailRef}
                disabled
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                ref={addressRef}
                placeholder={address}
                defaultValue={address}
              />
            </Form.Group>
            <Form.Group id="date">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                ref={birthdayRef}
                placeholder={birthday}
                defaultValue={birthday}
                // onChange={(e) => {
                //   setNewBirthday(e.target.value);
                // }}
              />
            </Form.Group>
            <Form.Group id="fullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="name"
                ref={fullNameRef}
                placeholder={fullName}
                defaultValue={fullName}
                // onChange={(e) => {
                //   setNewFullName(e.target.value);
                // }}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-2" type="submit">
              Update
            </Button>
            <Button
              disabled={loading}
              className="w-100 mt-2"
              onClick={handleDelete}
            >
              Delete Account
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
