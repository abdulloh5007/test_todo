const cards = document.querySelector('.cards')

fetch('https://nodejs-production-cfdf.up.railway.app/') // Отправка GET запроса на сервер
    .then(response => response.json()) // Преобразование полученных данных в JSON
    .then(data => {
        // Использование полученного массива данных
        // Например, вывести имена на страницу
        data.forEach(e => {
            const card = document.createElement('div');
            card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src=${e.img ? e.img : ''} class="card-img-top myImg" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${e.name}</h5>
                    <p class="card-text">${e.age}</p>
                    <button type="button" class="btn btn-danger delete">Delete</button>
                </div>
            </div>`;
            cards.appendChild(card)
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

const form = document.querySelector('.form')
const inpName = document.querySelector('.name')
const inpAge = document.querySelector('.age')
const inpImg = document.querySelector('.img')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const age = e.target.age.value;
    const img = e.target.img.value;

    inpName.style.border = name.length < 3 ? '2px solid red' : '1px solid gray';
    inpAge.style.border = age.length === 0 ? '2px solid red' : '1px solid gray';
    inpImg.style.border = age.length === 8 ? '2px solid red' : '1px solid gray';

    fetch('https://nodejs-production-cfdf.up.railway.app/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, img })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Здесь можно обрабатывать ответ от сервера
        })
        .catch(error => {
            console.error('Error:', error);
        });

});
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.card');

    document.getElementById('searchForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const searchText = searchInput.value.toLowerCase();

        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();

            if (title.includes(searchText)) {
                card.style.backgroundColor = 'yellow';
            } else {
                card.style.backgroundColor = ''; // Если не найдено, сбросить стиль
            }
        });
    });
});

const delBtn = document.querySelector('.delete')

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const card = event.target.closest('.card');
        const name = card.querySelector('.card-title').textContent;

        fetch('https://nodejs-production-cfdf.up.railway.app/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Обработка ответа от сервера
            card.remove(); // Удаление карточки со страницы
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
