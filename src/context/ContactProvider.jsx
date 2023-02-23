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

  const editContact = async (contact, id) => {
    const { data, error } = await supabase
      .from("contacts")
      .update(contact)
      .eq("id", id)
      .select();
    if (error) {
      setErrorMsg(error.message);
      console.error(error);
    }
    if (data) {
      setMsg("Contact Updated");
      const updatedContacts = contacts.map((contact) => {
        if (id === contact.id) {
          return { ...contact, ...data[0] };
        }
        return contact;
      });
      setContacts(updatedContacts);
    }
  };

  const deleteContact = async (id) => {
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setMsg("Contact Deleted Successfully");
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
    }
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
        fetchAll,
        editContact,
        deleteContact
      }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
