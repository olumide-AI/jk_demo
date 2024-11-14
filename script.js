"use strict";

// Airtable Configuration
const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'patalfq5yroYtu7wV.77b794fc190f162598e9f93cc9207da0fdcd337901d7694394a4a1085cc0524c' }).base('https://api.airtable.com/v0/appVWWY9vo2FICye0/Furnitures');

// Fetch Products
function fetchProducts() {
  base('Products')
    .select({
      view: "Grid view" // Use Airtable view name
    })
    .eachPage((records, fetchNextPage) => {
      records.forEach(record => {
        displayProduct(record.fields);
      });
      fetchNextPage();
    });
}

// Display Product (Example List View)
function displayProduct(product) {
  const productList = document.getElementById('product-list');
  const productItem = `
    <div class="product">
      <img src="${product.Image[0].url}" alt="${product.Name}">
      <h3>${product.Name}</h3>
      <p>${product.Description}</p>
      <p>Price: ${product.Price}</p>
    </div>
  `;
  productList.innerHTML += productItem;
}

// Call the Function
fetchProducts();
function displayDetailedView(product) {
  const main = document.querySelector('main');
  main.innerHTML = `
    <div class="detailed-view">
      <img src="${product.Image[0].url}" alt="${product.Name}">
      <h2>${product.Name}</h2>
      <p>${product.Description}</p>
      <p>Price: ${product.Price}</p>
      <button onclick="fetchProducts()">Back to List</button>
    </div>
  `;
}


// look up window.location.search and split, so this would take
// https://dmspr2021-airtable-app.glitch.me/index.html?id=receHhOzntTGZ44I5
// and look at the ?id=receHhOzntTGZ44I5 part, then split that into an array
// ["?id=", "receHhOzntTGZ44I5"] and then we only choose the second one
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {

  // has at least ["?id=", "OUR ID"]
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
;
  fetchProducts(); // no id given, fetch summaries
}