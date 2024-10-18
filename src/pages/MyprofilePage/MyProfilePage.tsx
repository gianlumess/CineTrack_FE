import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import styles from "./MyProfilePage.module.scss";

const MyProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    firstName: user?.name || "",
    lastName: user?.surname || "",
    email: user?.email || "",
    password: "",
  });

  return (
    <div className={styles.profilePage}>
      <Card className={styles.profileCard}>
        <Card.Body>
          <div className={styles.profileHeader}>
            <img src={user.avatar} alt="Profile" className={styles.profileImage} />
            {editMode && (
              <Form.Group>
                <Form.Control className="mt-2" />
                <Button className="mt-2">Aggiorna foto</Button>
              </Form.Group>
            )}
          </div>
          <Form className={styles.profileForm}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={formData.username} disabled={!editMode} />
            </Form.Group>
            <Form.Group controlId="formFirstName" className="mt-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="firstName" value={formData.firstName} disabled={!editMode} />
            </Form.Group>
            <Form.Group controlId="formLastName" className="mt-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" name="lastName" value={formData.lastName} disabled={!editMode} />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} disabled={!editMode} />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Nuova password" disabled={!editMode} />
            </Form.Group>
            <div className="mt-4">
              {editMode ? (
                <>
                  <Button className="me-2">Salva</Button>
                  <Button variant="secondary" onClick={() => setEditMode(false)}>
                    Annulla
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditMode(true)}>Modifica</Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyProfilePage;
