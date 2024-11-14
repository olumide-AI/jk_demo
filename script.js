// function for our list view
async function fetchProducts() {
  let getResultElement = document.getElementById("brews");

  const options = {
    method: "GET",
    headers: {
      Authorization: `patalfq5yroYtu7wV.77b794fc190f162598e9f93cc9207da0fdcd337901d7694394a4a1085cc0524c`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appVWWY9vo2FICye0/Furnitures \?&view=Stars`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array
