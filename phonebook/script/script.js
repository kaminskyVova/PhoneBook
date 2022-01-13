'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

{
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
    const form = createForm();
    const footer = createFooter();

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, form.overlay);

    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: form.overlay,
      form: form.form,
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

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    // allRow.sort((a, b) => (a.name > b.name ? -1 : 1));
    elem.append(...allRow);

    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach((contact) => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = `
          Имя Контакта: ${contact.name.textContent} 
          Тел: ${contact.phoneLink.textContent}
        `;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phoneBook = renderPhoneBook(app, title);

    const { list, logo, btnAdd, btnDel, formOverlay, form } = phoneBook;

    // * Функционал
    const allRow = renderContacts(list, data);
    hoverRow(allRow, logo);

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
    getSortRows();

    const closeOpenPopup = () => {
      const mainContainer = document.querySelector('main');
      mainContainer.addEventListener('click', (e) => {
        const target = e.target;
        // !!! Open Pop-up
        if (target === btnAdd) {
          formOverlay.classList.add('is-visible');
        }
        // !!! Close Pop-up
        if (
          target.closest('.close') ||
          target.classList.contains('form-overlay')
        ) {
          formOverlay.classList.remove('is-visible');
        }
      });
    };
    closeOpenPopup();

    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach((del) => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', (e) => {
      const target = e.target;

      if (target.closest('.del-icon') || target.closest('.table__btn_del')) {
        target.closest('.contact').remove();
      }
    });
  };

  window.phoneBookInit = init;
}
