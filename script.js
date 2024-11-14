"use strict";

// function for our list view
async function fetchProducts() {
  let getResultElement = document.getElementById("product-list");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patalfq5yroYtu7wV.77b794fc190f162598e9f93cc9207da0fdcd337901d7694394a4a1085cc0524c`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appVWWY9vo2FICye0/Furnitures \?&view=Stars`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear brews

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let logo = data.records[i].fields["name"]; // here we are getting column values
        let name = data.records[i].fields["images"];
        let neighborhood = data.records[i].fields["Neighborhood"];

        newHtml += `
        
         <div class="col-xl-4 cardImageText">
          <div class="card list move border-dark mb-5" style="width: 20rem;">
          <a href="breweries.html?id=${
            data.records[i].id
          }">${
          logo
            ? `<img class="card-img-top rounded" alt="${name}" src="${logo[0].url}">`
            : ``
        }
          </a>
          <p hidden class="card-key">${neighborhood}</p>
          </div>
          </div>
        </div>
        
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}