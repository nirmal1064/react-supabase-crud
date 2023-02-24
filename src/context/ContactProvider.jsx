import { createContext, useContext, useState } from "react";

const ContactContext = createContext({});

export const useContacts = () => useContext(ContactContext);

const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <ContactContext.Provider
      value={{
        contacts,
        msg,
        setMsg,
        errorMsg,
        setErrorMsg
      }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
