
import * as storage from './serviceStorage'

import {createRow} from './createElements';

export const deleteContactRow = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach((del) => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.del-icon') || target.closest('.table__btn_del')) {
      const tr = target.closest('tr');
      const firstname = tr.querySelector('td:nth-child(2)').textContent;
      const surname = tr.querySelector('td:nth-child(3)').textContent;
      const number = tr.querySelector('td:nth-child(4)').textContent;

      const contact = {
        name: firstname,
        surname: surname,
        phone: number,
      };
      storage.removeStorage('contacts', contact);
      target.closest('.contact').remove();
    }
  });
};

export const popupControl = (btnAdd, formOverlay) => {
  const openPopup = () => {
    formOverlay.classList.add('is-visible');
  };

  const closePopup = () => {
    formOverlay.classList.remove('is-visible');
  };
  const mainContainer = document.querySelector('main');
  mainContainer.addEventListener('click', (e) => {
    const target = e.target;
    // !!! Open Pop-up
    if (target === btnAdd) {
      openPopup();
    }
    // !!! Close Pop-up
    if (target.closest('.close') || target.classList.contains('form-overlay')) {
      closePopup();
    }
  });

  return { openPopup, closePopup };
};

export const getSortRows = () => {
  const rows = Array.from(document.querySelectorAll('tr')).slice(1);
  const tableBody = document.querySelector('tbody');

  document.querySelectorAll('.contact').forEach((tr) => {
    tr.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('.name')) {
        rows.sort((rowA, rowB) =>
          rowA.cells[1].innerHTML > rowB.cells[1].innerHTML ? 1 : -1
        );
        tableBody.append(...rows);
      }
      if (target.closest('.surname')) {
        rows.sort((rowA, rowB) =>
          rowA.cells[2].innerHTML > rowB.cells[2].innerHTML ? 1 : -1
        );
        tableBody.append(...rows);
      }
    });
  });

  return rows;
};

export const addContactToPage = (contact, list) => {
  list.append(createRow(contact));
  getSortRows();
};

export const formControl = (form, list, closePopup) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    newContact._id = newContact.phone;

    storage.setStorage('contacts', newContact);
    storage.getStorage(newContact.phone);
    addContactToPage(newContact, list);
    getSortRows();

    form.reset();
    closePopup();
  });
};
