let allProducts = []; // Global variable to store all products

// Fetch data from the Fake Store API
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json()) // Convert the response to JSON
  .then((data) => {
    allProducts = data; // Store the data in the global variable
    populateProducts(allProducts); // Populate the products on the page
    populateCategories(data); // Populate category filter options
  })
  .catch((error) => {
    console.error("Error fetching products:", error);
    displayErrorMessage("Error loading products. Please try again later.");
  });

// Event listeners for category change and search input
document
  .getElementById("categorySelect")
  .addEventListener("change", handleCategoryChange); // Event listener for category filter change

// Function to populate products on the page
function populateProducts(products) {
  const grid = document.getElementById("productsGrid"); // Get the product grid element
  let cardsHtml = "";

  // Iterate over each product and create HTML cards
  products.forEach((product) => {
    cardsHtml += `
      <div class="col-md-3 mb-4">
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${
      product.title
    }">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><small class="text-muted">$${
              product.price
            }</small></p>
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = cardsHtml; // Set the grid's HTML to the cards
}
// Function to populate category filter options
function populateCategories(products) {
  const categorySelect = document.getElementById("categorySelect");
  const categories = new Set(); // Use a Set to store unique categories

  // Add each product's category to the Set
  products.forEach((product) => {
    categories.add(product.category);
  });

   // Create and append option elements for each category
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

// Function to handle category filter change
function handleCategoryChange() {
  const selectedCategory = document.getElementById("categorySelect").value;
  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);
  populateProducts(filteredProducts);  // Repopulate products based on selected category
}

// Function to display error messages
function displayErrorMessage(message) {
  const container = document.getElementById("productsGrid");
  container.innerHTML = `<p class="error-message">${message}</p>`; // Set the error message in the product grid container
}
  