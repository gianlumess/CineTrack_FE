import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { DataRegistration } from "../../interfaces/UserInterfaces";
import styles from "./RegistrationPage.module.scss";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const dataRegistration: DataRegistration = { username, name, surname, email, password };
    registrationFetch(dataRegistration);
  };

  const registrationFetch = async (dataRegistration: DataRegistration) => {
    try {
      const response = await fetch("http://localhost:3001/authorization/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataRegistration),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || "errore durante la registrazione");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={styles.registrationPage}>
      <Row>
        <Col>
          <h2 className="mb-3">Registrati</h2>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci Cognome"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci email"
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
              Registrati
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationPage;
