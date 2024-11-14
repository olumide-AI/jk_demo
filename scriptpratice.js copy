"use strict";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("product-list");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patalfq5yroYtu7wV.77b794fc190f162598e9f93cc9207da0fdcd337901d7694394a4a1085cc0524c`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appVWWY9vo2FICye0/Furnitures`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear brews

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let image = data.records[i].fields["image"]; // here we are getting column values
        let name = data.records[i].fields["name"];
        let status = data.records[i].fields["status"];

        newHtml += `
        
         <div class="col-xl-4 cardImageText">
          <div class="card list move border-dark mb-5" style="width: 20rem;">
          <a href="product.html?id=${
            data.records[i].id
          }">${
          image
            ? `<img class="card-img-top rounded list-view" alt="${name}" src="${image[0].url}">`
            : ``
        }
          </a>
          <p  class="card-key">${status}</p>
          <p> ${name}</p>
          </div>
          </div>
        </div>
        
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
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
  getAllRecords(); // no id given, fetch summaries
}