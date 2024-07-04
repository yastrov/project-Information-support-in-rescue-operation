document.addEventListener("DOMContentLoaded", function () {
  var formBase = document.getElementById("formBase");
  var openFormBtn3 = document.getElementById("openFormBtn3");
  var form3 = document.getElementById("form3");
  var openFormBtn4 = document.getElementById("openFormBtn4");
  var form4 = document.getElementById("form4");
  var openFormBtn5 = document.getElementById("openFormBtn5");
  var form5 = document.getElementById("form5");
  var saveCardBtn = document.getElementById("saveCard");
  var form6 = document.getElementById("form6");
  var SearchBtn = document.getElementById("btnSearch");
  var formSearch = document.getElementById("formSearch");
  var buttonDeletePol = document.getElementById("buttonDeletePol");

  function hideFormBase() {
    formBase.style.display = "none";
  }

  function showFormBase() {
    formBase.style.display = "block";
  }

  function checkAndToggleFormBase() {
    if (
      form3.style.display === "none" &&
      form4.style.display === "none" &&
      form5.style.display === "none" &&
      form6.style.display === "none" &&
      formSearch.style.display === "none"
    ) {
      showFormBase();
    } else {
      hideFormBase();
    }
  }


  openFormBtn3.addEventListener("click", function () {
    if (form3.style.display === "none" || form3.style.display === "") {
      form3.style.display = "block";
      form4.style.display = "none";
      form5.style.display = "none";
      form6.style.display = "none";
      formSearch.style.display === "none";
    } else {
      form3.style.display = "none";
    }
    checkAndToggleFormBase();
  });

  openFormBtn4.addEventListener("click", function () {
    if (form4.style.display === "none" || form4.style.display === "") {
      form4.style.display = "block";
      form3.style.display = "none";
      form5.style.display = "none";
      form6.style.display = "none";
      formSearch.style.display === "none";
    } else {
      form4.style.display = "none";
    }
    checkAndToggleFormBase();
  });

  openFormBtn5.addEventListener("click", function () {
    if (form5.style.display === "none" || form5.style.display === "") {
      form5.style.display = "block";
      form3.style.display = "none";
      form4.style.display = "none";
      form6.style.display = "none";
      formSearch.style.display === "none";
    } else {
      form5.style.display = "none";
    }
    checkAndToggleFormBase();
  });

  saveCardBtn.addEventListener("click", function () {
    if (form6.style.display === "none" || form6.style.display === "") {
      form6.style.display = "block";
      form3.style.display = "none";
      form4.style.display = "none";
      form5.style.display = "none";
      formSearch.style.display === "none";
    } else {
      form6.style.display = "none";
    }
    checkAndToggleFormBase();
  });

  SearchBtn.addEventListener("click", function () {
    if (formSearch.style.display === "none" || formSearch.style.display === "") {
      formSearch.style.display = "block";
      form3.style.display = "none";
      form4.style.display = "none";
      form5.style.display = "none";
      form6.style.display === "none";
    } else {
      formSearch.style.display = "none";
    }
    checkAndToggleFormBase();
  });
  // По умолчанию показываем форму базы, так как ни одна другая форма не открыта
  showFormBase();
});


const openFormBtnIPP = document.getElementById('openFormBtnIPP');
const openFormBtnPol = document.getElementById('openFormBtnPol');
const formIPP = document.getElementById('formIPP');
const formPol = document.getElementById('formPol');
const mainForm = document.getElementById('form6');

openFormBtnIPP.addEventListener('click', function () {
  mainForm.style.display = 'none';
  formIPP.classList.add('active');
});

openFormBtnPol.addEventListener('click', function () {
  mainForm.style.display = 'none';
  formPol.classList.add('active');
});

document.getElementById('backToMainFormIPP').addEventListener('click', function () {
  mainForm.style.display = 'block';
  formIPP.classList.remove('active');
});

document.getElementById('backToMainFormPol').addEventListener('click', function () {
  mainForm.style.display = 'block';
  formPol.classList.remove('active');
});

// Модальное окно Входа
document.addEventListener('DOMContentLoaded', function () {
  const modalOverlay = document.getElementById('modalOverlay');
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('errorMessage');

  // Проверка формы и закрытие модального окна при успешной проверке
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const login = document.getElementById('login').value;
    const pass = document.getElementById('pass').value;

    if (login === 'user' && pass === 'user') {
      modalOverlay.style.display = 'none';
    } else {
      errorMessage.style.display = 'block';
    }
  });
});
// Модальное окно Входа

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formData');
  const listCard = document.getElementById('listCard'); // Получаем контейнер для данных

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Предотвратить отправку формы по умолчанию

    // Получаем данные из формы
    const formData = new FormData(form);
    const status = formData.get('status');
    const description = formData.get('description');
    const latitude = parseFloat(formData.get('latitude'));
    const longitude = parseFloat(formData.get('longitude'));
    const time_user = parseInt(formData.get('time_user'));

    // Отправляем данные на сервер
    try {
      const response = await fetch('/addData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, description, latitude, longitude, time_user })
      });
      const data = await response.json();
      console.log('Серверный ответ:', data);

      // Если данные успешно добавлены, обновляем содержимое контейнера на странице
      if (data.success) {
        const newItem = document.createElement('button');
        newItem.type = 'button';
        newItem.classList.add('user-card');
        newItem.classList.add(data.newData.status === 'active' ? 'active' : 'completed');
        if (data.newData.status === 'completed') {
          newItem.id = 'cardCompleted';
        } else if (data.newData.status === 'active') {
          newItem.id = 'cardActive';
        }
        newItem.dataset.status = data.newData.status;
        newItem.dataset.description = data.newData.description;
        newItem.dataset.latitude = data.newData.latitude;
        newItem.dataset.longitude = data.newData.longitude;
        newItem.dataset.time_user = data.newData.time_user;

        newItem.innerHTML = `
                  <p class="cardStatus">${data.newData.status}</p>
                  <p class="cardDesc">Описание: ${data.newData.description}</p>
                  <p class="cardTime">Time: ${data.newData.time_user}</p>
              `;

        listCard.appendChild(newItem); // Добавляем новый элемент с новыми данными в контейнер
      }
    } catch (error) {
      console.error('Ошибка отправки данных:', error);
    }
  });
});

// Модальное окно (Справочник)
// Получаем ссылку на кнопку и на модальное окно
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalBtn");
// var span = document.getElementsByClassName("close")[0];
var navLinks = document.getElementsByClassName("navLink");
// Когда пользователь кликает на кнопку, отобразить модальное окно
btn.onclick = function () {
  modal.style.display = "block";
}
// Когда пользователь кликает на <span> (x), закройте модальное окно
// span.onclick = function () {
//   modal.style.display = "none";
// }
// Когда пользователь щелкает вне модального окна, закройте его
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Добавляем обработчики событий для ссылок навигации
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].onclick = function () {
    var contentId = this.getAttribute("data-content");
    var contentToShow = document.getElementById(contentId);
    // Скрываем все контенты
    var contents = document.getElementsByClassName("content");
    for (var j = 0; j < contents.length; j++) {
      contents[j].style.display = "none";
    }
    // Показываем выбранный контент
    contentToShow.style.display = "block";
    return false; // Предотвращаем переход по ссылке
  }
}
// Модальное окно (Справочник)
