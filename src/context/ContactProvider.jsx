import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const ContactContext = createContext({});

export const useContacts = () => useContext(ContactContext);

const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");

  const addContact = async (contact) => {
    const { data, error } = await supabase
      .from("contacts")
      .insert(contact)
      .select();
    if (data) {
      setContacts((prevContacts) => [...prevContacts, data[0]]);
      setMsg("Contact Added Successfully");
    }
    if (error) {
      setErrorMsg(error.message);
    }
  };

  const fetchAll = async () => {
    const { data, error } = await supabase.from("contacts").select();
    if (data) setContacts(data);
    if (error) setErrorMsg("Error in Fetching Contacts");
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contacts,
        msg,
        setMsg,
        errorMsg,
        setErrorMsg,
        addContact,
        fetchAll
      }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
