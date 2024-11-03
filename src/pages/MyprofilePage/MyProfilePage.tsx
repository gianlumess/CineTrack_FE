import { useState, useEffect } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import styles from "./MyProfilePage.module.scss";
import Mynavbar from "../../components/Navbar/Mynavbar";
import { DataRegistration } from "../../interfaces/UserInterfaces";
import { editMyProfileFetch, updateProfilePictureFetch } from "../../redux/actions/userActions";

const MyProfilePage = () => {
  const token: string | null = localStorage.getItem("token");
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<DataRegistration>({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  // Aggiorna i dati del form quando user cambia o il modale viene aperto
  useEffect(() => {
    if (user && showEditModal) {
      setFormData({
        username: user.username || "",
        name: user.name || "",
        surname: user.surname || "",
        email: user.email || "",
        password: "", // La password rimane vuota per motivi di sicurezza
      });
    }
  }, [user, showEditModal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const toggleEditModal = () => setShowEditModal(!showEditModal);
  const toggleAvatarModal = () => setShowAvatarModal(!showAvatarModal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      dispatch(editMyProfileFetch(token, formData));
      toggleEditModal();
    }
  };

  return (
    <>
      <Mynavbar />
      <div className={styles.profilePage}>
        <Card className={`${styles.profileCard} border border-accent`}>
          <div className={`${styles.profileHeader} bg-secondary text-light`}>
            <img src={user?.avatar} alt="Profile" className={styles.profileImage} />
            <div className={styles.profileInfo}>
              <h3>{user?.username}</h3>
              <p>{user?.email}</p>
            </div>
          </div>
          <Card.Body className="bg-dark text-light">
            <p>
              <strong>Nome:</strong> {user?.name}
            </p>
            <p>
              <strong>Cognome:</strong> {user?.surname}
            </p>

            <div className={styles.editButton}>
              <Button className={styles.primaryButton} onClick={toggleEditModal}>
                Modifica Dati
              </Button>
              <Button variant="secondary" onClick={toggleAvatarModal} className="ms-2">
                Cambia Foto Profilo
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Modale per modificare i dati dell'utente */}
        <Modal show={showEditModal} onHide={toggleEditModal}>
          <Form className="bg-dark text-light rounded" onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Modifica Dati Personali</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3 ">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Inserisci la nuova password"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={toggleEditModal}>
                Annulla
              </Button>
              <Button className={styles.primaryButton} variant="primary" type="submit">
                Salva
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Modale per cambiare la foto profilo */}
        <Modal show={showAvatarModal} onHide={toggleAvatarModal}>
          <Form className="bg-dark text-light  rounded">
            <Modal.Header closeButton>
              <Modal.Title>Cambia Foto Profilo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Carica una nuova foto</Form.Label>
                <Form.Control type="file" onChange={handleAvatarChange} />
                {previewUrl && <img src={previewUrl} alt="Anteprima Avatar" className="mt-3 w-100" />}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={toggleAvatarModal}>
                Annulla
              </Button>
              <Button
                className={styles.primaryButton}
                variant="primary"
                onClick={() => {
                  if (newAvatar && token) {
                    dispatch(updateProfilePictureFetch(token, newAvatar, user.id));
                    toggleAvatarModal();
                  }
                }}
              >
                Salva Foto
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default MyProfilePage;
