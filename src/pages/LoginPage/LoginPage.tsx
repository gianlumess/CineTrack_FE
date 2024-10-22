import { useState } from "react";
import { DataLogin } from "../../interfaces/UserInterfaces";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const dataRegistration: DataLogin = { email, password };
    loginUserFetch(dataRegistration);
  };

  const loginUserFetch = async (dataLogin: DataLogin) => {
    try {
      const response = await fetch("http://localhost:3001/authorization/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataLogin),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.token); //salva il token nel localStorage
        navigate("/");
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || "errore durante il login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className={styles.loginPage}>
      <Row>
        <Col>
          <h2 className="mb-3">Accedi</h2>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
