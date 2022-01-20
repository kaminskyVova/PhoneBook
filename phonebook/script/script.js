'use strict';

{
  let contacts = [];
  // !!! Перебор хранилища
  const getLocalStorageData = () =>
    Object.entries(localStorage).reduce((acc, [key, value]) => {
      try {
        contacts = JSON.parse(value);
      } catch {
        contacts = value;
      }
      return {
        ...acc,
        [key]: contacts,
      };
    }, {});
  getLocalStorageData();

  const getStorage = (key) => {
    const contact = JSON.parse(localStorage.getItem(key));
    return localStorage.length > 0 ? contact : [];
  };

  const setStorage = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
    const contactFromStorage = getStorage(key);
    contacts.push(contactFromStorage);

    localStorage.setItem('contacts', JSON.stringify(contacts));
    localStorage.removeItem(key);
  };

  const removeStorage = (key, contact) => {
    let contacts = JSON.parse(localStorage.getItem(key));
    let newContacts = [];
    for (let i = 0; i < contacts.length; i++) {
      if (
        contacts[i].name != contact.name &&
        contacts[i].surname != contact.surname &&
        contacts[i].phone != contact.phone
      ) {
        newContacts.push(contacts[i]);
      }
    }
    localStorage.setItem(key, JSON.stringify(newContacts));
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `
			Телефонный справочник: ${title}
		`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonsGroup = (params) => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({ className, type, text }) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;

      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML(
      'beforeend',
      `
			<tr>
				<th class="delete">Удалить</th>
				<th>Имя</th>
				<th>Фамилия</th>
				<th>Телефон</th>
			</tr>
		`
    );

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');

    form.insertAdjacentHTML(
      'beforeend',
      `
			<button class="close" type="button"></button>
			<h2 class="form-title">Добавить контакт</h2>
			<div class="form-group">
				<label class="form-label" for="name">Имя:</label>
				<input class="form-input" name="name" id="name" type="text" required>
			</div>
			<div class="form-group">
				<label class="form-label" for="surname">Фамилия:</label>
				<input class="form-input" name="surname" id="surname" type="text" required>
			</div>
			<div class="form-group">
				<label class="form-label" for="phone">Телефон:</label>
				<input class="form-input" name="phone" id="phone" type="number" required>
			</div>
		`
    );

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отменить',
      },
    ]);

    form.append(...buttonGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
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

    header.headerContainer.append(logo);
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

  const createRow = ({ name: firstName, surname, phone }) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    tdName.classList.add('name');
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    tdSurname.classList.add('surname');
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tdPhone.append(phoneLink);

    tr.phoneLink = phoneLink;
    tr.name = tdName;

    const btnEdit = createButtonsGroup([
      {
        className: 'btn table__btn_edit',
        type: 'button',
      },
      {
        className: 'btn table__btn_del',
        type: 'button',
      },
    ]);

    const btnTd = document.createElement('td');
    btnTd.append(...btnEdit.btns);

    tr.append(tdDel, tdName, tdSurname, tdPhone, btnTd);

    return tr;
  };

  const renderContacts = (elem, contacts) => {
    const allRow = contacts.map(createRow);
    elem.append(...allRow);

    return allRow;
  };

  const hoverRow = (allRow, logo) => {
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

  const deleteContactRow = (btnDel, list) => {
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
        removeStorage('contacts', contact);
        target.closest('.contact').remove();
      }
    });
  };

  const popupControl = (btnAdd, formOverlay) => {
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
      if (
        target.closest('.close') ||
        target.classList.contains('form-overlay')
      ) {
        closePopup();
      }
    });

    return { openPopup, closePopup };
  };

  const getSortRows = () => {
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

  const addContactToPage = (contact, list) => {
    list.append(createRow(contact));
    getSortRows();
  };

  const formControl = (form, list, closePopup) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);
      newContact._id = newContact.phone;

      setStorage(newContact.phone, newContact);
      getStorage(newContact.phone);
      addContactToPage(newContact, list);
      getSortRows();

      form.reset();
      closePopup();
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const { list, logo, btnAdd, btnDel, formOverlay, form } = renderPhoneBook(
      app,
      title
    );

    // * Функционал
    const { closePopup } = popupControl(btnAdd, formOverlay);
    const allRow = renderContacts(list, contacts);

    formControl(form, list, closePopup);
    deleteContactRow(btnDel, list);
    getSortRows();
    hoverRow(allRow, logo);
  };

  window.phoneBookInit = init;
}
