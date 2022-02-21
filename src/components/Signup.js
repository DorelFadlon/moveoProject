import { doc, setDoc, Timestamp } from "firebase/firestore/lite";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const addressRef = useRef();
  const birthdayRef = useRef();
  const fullNameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function addDocument() {
    const userRef = doc(db, "users", emailRef.current.value);
    await setDoc(userRef, {
      address: addressRef.current.value,
      fullname: fullNameRef.current.value,
      birthday: birthdayRef.current.value,
    });

    return userRef;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    var numeric_alpha = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    if (
      passwordRef.current.value <= 6 ||
      !passwordRef.current.value.match(numeric_alpha)
    ) {
      return setError(
        "Password must be at least 6 charcters and to contain numbers and letters"
      );
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      addDocument();
      console.log(birthdayRef.current.value);
      navigate("/");
    } catch (e) {
      console.log(e);
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert verient="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group id="address">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" ref={addressRef} required />
            </Form.Group>
            <Form.Group id="date">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control type="date" ref={birthdayRef} required />
            </Form.Group>
            <Form.Group id="fullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="name" ref={fullNameRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-2" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already hace an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
