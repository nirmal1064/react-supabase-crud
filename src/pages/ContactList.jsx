import { useState } from "react";
import { Button } from "react-bootstrap";
import ContactModal from "../components/ContactModal";

const ContactList = () => {
  const { msg, setMsg, errorMsg, setErrorMsg } = useContacts();
  const [showContactModal, setShowContactModal] = useState(false);
  const [type, setType] = useState("");
  const [activeContact, setActiveContact] = useState({});

  const closeContactModal = () => {
    setActiveContact({});
    setShowContactModal(false);
    setType("");
  };

  const handleAdd = () => {
    setType("Add");
    setShowContactModal(true);
  };

  return (
    <div>
      <ToastMessage
        type="Success"
        show={msg ? true : false}
        message={msg}
        handleClose={() => setMsg("")}
      />
      <ToastMessage
        type="Error"
        show={errorMsg ? true : false}
        message={errorMsg}
        handleClose={() => setErrorMsg("")}
      />
      <ContactModal
        show={showContactModal}
        handleClose={closeContactModal}
        type={type}
        contact={activeContact}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "10px",
          marginBottom: "10px"
        }}>
        <h2 className="text-center">Contact List</h2>
        <Button onClick={handleAdd}>Add Contact</Button>
      </div>
    </div>
  );
};

export default ContactList;
