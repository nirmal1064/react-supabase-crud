import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";

const ContactContext = createContext({});

export const useContacts = () => useContext(ContactContext);

const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");

  const addContact = async (contact) => {
    const { error } = await supabase.from("contacts").insert(contact);
    if (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        msg,
        setMsg,
        errorMsg,
        setErrorMsg,
        addContact
      }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
