
import {
  renderPhoneBook,
  renderContactsFromLocalStorage as contactsFromStorage,
  hoverRow,
} from './modules/render.js';

import {
  deleteContactRow,
  popupControl,
  getSortRows,
  formControl,
} from './modules/control.js';

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

  window.phoneBookInit = init;
}
