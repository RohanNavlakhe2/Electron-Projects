const db = require('electron-db');
const path = require('path');
const TABLE_NAME = "Product";
const DB_PATH = path.join(__dirname, 'Database');

//let submitBtn = $('#submitRecordBtn');
let addProuductBtn = $('#addProductBtn');
let addProductDiv = $('#addProductDiv');
let productsDiv = $('#productsDiv');
let bookName = $('#bookName');
let bookPrice = $('#bookPrice');
let recordTable = $('#recordTable');


let initDb = () => {

    db.createTable(TABLE_NAME, DB_PATH, (succ, msg) => {
        console.log("Succ", succ);
        console.log("msg", msg);
    })
};

function insertContentIntoTable(content)
{
    //recordTable.remove();
    let nodes = content.map(function (book) {
        console.log(`Data: ${book.name} ${book.price}`)
        let row = document.createElement('tr');
        let nameData = document.createElement('td');
        nameData.textContent = book.name;
        let priceData = document.createElement('td');
        priceData.textContent = book.price;

        row.appendChild(nameData);
        row.appendChild(priceData);

        return row;
    });

    recordTable.append(...nodes);
}

function loadRecords()
{
    db.getAll(TABLE_NAME, DB_PATH, (succ, data) => {
        insertContentIntoTable(data);
    })
}

addProuductBtn.on('click', () => {
    console.log("Add Pro");
    addProductDiv.css('display', 'block');
    bookName.val("");
    bookPrice.val("");
    productsDiv.css('display', 'none');
});

$('#addProductForm').on('submit', (event) => {
    event.preventDefault();

    addProductDiv.css('display', 'none');
    productsDiv.css('display', 'block');
    let book = {
        name: bookName.val(),
        price: bookPrice.val()
    };

    if (db.valid(TABLE_NAME, DB_PATH)) {
        db.insertTableContent(TABLE_NAME, DB_PATH, book, (succ, msg) => {
            console.log(`Insertion Result: ${succ} Msg: ${msg} Obj: ${book.name} ${book.price}`);
            recordTable.empty();
            loadRecords();
        })
    }
});



$(document).on('DOMContentLoaded',function () {
    console.log('Dom Loaded');
    initDb();
    loadRecords()
});






