export const getStorage = (key) => {
  const contact = JSON.parse(localStorage.getItem(key));
  return localStorage.length > 0 ? contact : [];
};

export const setStorage = (key, contact) => {
  let contacts = [];
  if (localStorage.length > 0) {
    contacts = JSON.parse(localStorage.getItem(key));
  } else {
    localStorage.setItem(key, JSON.stringify(contact));
  }
  if (contacts) {
    localStorage.removeItem(key);
    contacts.push(contact);
    localStorage.setItem(key, JSON.stringify(contacts));
  }
};

export const removeStorage = (key, contact) => {
  let contacts = JSON.parse(localStorage.getItem(key));
  let newContacts = [];
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].phone != contact.phone) {
      newContacts.push(contacts[i]);
    }
  }

  localStorage.setItem(key, JSON.stringify(newContacts));
};

export default {
  getStorage,
  setStorage,
  removeStorage,
};

