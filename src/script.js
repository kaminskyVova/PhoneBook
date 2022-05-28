import {
  renderPhoneBook,
  renderContactsFromLocalStorage as contactsFromStorage,
  hoverRow,
} from './script/render';

import {
  deleteContactRow,
  popupControl,
  getSortRows,
  formControl,
} from './script/control';

import './index.html';
import './scss/index.scss';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const { list, logo, btnAdd, btnDel, formOverlay, form } = renderPhoneBook(
      app,
      title
    );

    // * Функционал
    const { closePopup } = popupControl(btnAdd, formOverlay);
    const allRow = contactsFromStorage(list);

    formControl(form, list, closePopup);
    deleteContactRow(btnDel, list);
    getSortRows();
    hoverRow(allRow, logo);
  };

  init('#app', 'Vladimir');
}
