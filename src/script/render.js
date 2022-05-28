import {
  createImageLogo,
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
  createRow,
} from './createElements';

import { getStorage } from './serviceStorage.js';

export const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const imageLogo = createImageLogo();
  const logo = createLogo(title);
  const main = createMain();
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);

  const table = createTable();
  const { form, overlay } = createForm();
  const footer = createFooter();

  header.headerContainer.append(imageLogo, logo);
  main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);

  app.append(header, main, footer);

  return {
    list: table.tbody,
    logo,
    btnAdd: buttonGroup.btns[0],
    btnDel: buttonGroup.btns[1],
    formOverlay: overlay,
    form,
  };
};

export const renderContacts = (elem, contacts) => {
  const allRow = contacts.map(createRow);
  elem.append(...allRow);

  return allRow;
};

export const hoverRow = (allRow, logo) => {
  const text = logo.textContent;

  const tbody = document.querySelector('tbody');
  tbody.classList.add('table__body');

  tbody.addEventListener(
    'mouseenter',
    (e) => {
      const target = e.target;
      if (e.target.className === 'contact') {
        logo.textContent = `
            Имя Контакта: ${target.name.textContent} 
            Тел: ${target.phoneLink.textContent}
          `;
      }

      target.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    },
    true
  );
};

export const renderContactsFromLocalStorage = (el) => {
  let contacts = [];
  if (localStorage.length > 0) {
    contacts = getStorage('contacts');
    const allRow = contacts.map(createRow);
    el.append(...allRow);
    return allRow;
  } else {
    return;
  }
};
