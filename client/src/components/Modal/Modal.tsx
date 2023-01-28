import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";

interface ModalProps {
  text: string;
  variant: "primary" | "secondary";
  isSignUpFlow: boolean;
}

const ErrorMessage = styled.p`
  color: red;
`;

export default function ModalComponent({
  text,
  variant,
  isSignUpFlow,
}: ModalProps) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [state, setState] = useContext(UserContext);

  const handleClick = async () => {
    let response;
    if (isSignUpFlow) {
      const { data: signUpData } = await axios.post(
        "http://localhost:8080/auth/signup",
        {
          email,
          password,
        }
      );
      response = signUpData;
    } else {
      const { data: loginData } = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
          password,
        }
      );

      response = loginData;
    }

    if (response.errors.length) {
      return setErrorMsg(response.errors[0].msg);
    }

    setState({
      data: {
        id: response.user.id,
        email: response.user.email,
      },
      loading: false,
      error: null,
    });

    localStorage.setItem("token", response.token);
    axios.defaults.headers.common["authorization"] = `Bearer ${response.token}`;
    navigate("/article");
  };

  return (
    <>
      <Button
        variant={variant}
        onClick={handleShow}
        size="lg"
        style={{ marginRight: "1rem", width: "100%" }}
      >
        {text}
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {errorMsg ? <ErrorMessage>{errorMsg}</ErrorMessage> : ""}
        </Modal.Body>
        <Modal.Footer>
          <Button variant={variant} type="submit" onClick={handleClick}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
