import { Button } from "react-bootstrap";

const ContactList = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "10px",
          marginBottom: "10px"
        }}>
        <h2 className="text-center">Contact List</h2>
        <Button>Add Contact</Button>
      </div>
    </div>
  );
};

export default ContactList;
