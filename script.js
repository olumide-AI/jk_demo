"use strict";

const productListSection = document.getElementById("product-list");
const productDetailSection = document.getElementById("product-detail");
const backButton = document.getElementById("back-button");

// Function to fetch and display all products (List View)
async function getProducts() {
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer patalfq5yroYtu7wV.77b794fc190f162598e9f93cc9207da0fdcd337901d7694394a4a1085cc0524c`,
        },
    };

    try {
        const response = await fetch(
            `https://api.airtable.com/v0/appVWWY9vo2FICye0/Furnitures`,
            options
        );
        const data = await response.json();

        productListSection.innerHTML = ""; // Clear the container

        data.records.forEach((record) => {
            const { id } = record;
            const { Name, Image, Price } = record.fields;

            const productCard = document.createElement("div");
            productCard.className = "product-card";
            productCard.addEventListener("click", () => showProductDetail(id));

            productCard.innerHTML = `
                <img src="${Image ? Image[0].url : "placeholder.jpg"}" alt="${Name}">
                <h3>${Name}</h3>
                <p><strong>Price:</strong> $${Price}</p>
            `;

            productListSection.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        productListSection.innerHTML = "<p>Failed to load products. Please try again later.</p>";
    }
}

// Function to fetch and display a single product (Detail View)
async function showProductDetail(productId) {
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer YOUR_AIRTABLE_API_KEY`,
        },
    };

    try {
        const response = await fetch(
            `https://api.airtable.com/v0/YOUR_AIRTABLE_BASE_ID/Furniture/${productId}`,
            options
        );
        const data = await response.json();
        const { Name, Image, Description, Material, Price, Availability, Color } = data.fields;

        productDetailSection.innerHTML = `
            <img src="${Image ? Image[0].url : "placeholder.jpg"}" alt="${Name}">
            <h2>${Name}</h2>
            <p>${Description}</p>
            <p><strong>Material:</strong> ${Material}</p>
            <p><strong>Color:</strong> ${Color}</p>
            <p><strong>Price:</strong> $${Price}</p>
            <p><strong>Availability:</strong> ${Availability}</p>
        `;

        // Switch views
        productListSection.classList.add("hidden");
        productDetailSection.classList.remove("hidden");
        backButton.classList.remove("hidden");
    } catch (error) {
        console.error("Error fetching product detail:", error);
        productDetailSection.innerHTML = "<p>Failed to load product details. Please try again later.</p>";
    }
}

// Function to return to the list view
function showListView() {
    productListSection.classList.remove("hidden");
    productDetailSection.classList.add("hidden");
    backButton.classList.add("hidden");
}

// Event listener for the back button
backButton.addEventListener("click", showListView);

// Fetch products on page load
document.addEventListener("DOMContentLoaded", getProducts);
