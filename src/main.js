// Fetch data from JSON file and render product cards
fetch("src/data/camera.json")
  .then((response) => response.json())
  .then((products) => {
    const container = document.getElementById("product-container");

    products.forEach((product) => {
      const card = `
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <img src="${product.image}" alt="${
        product.name
      }" class="w-48 h-48 object-cover">
          <div class="p-4">
            <h2 class="text-lg font-semibold text-gray-800">${product.name}</h2>
            <p class="text-gray-600">${product.description}</p>
            <div class="mt-2 text-lg font-bold text-blue-500">$${product.price.toFixed(
              2
            )}</div>
            <button class="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Add to Cart</button>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });
  })
  .catch((error) => console.error("Error loading products:", error));

// click drop down
// Dropdown Class for creating interactive dropdowns
class Dropdown {
  constructor(options) {
    // Default configuration
    this.config = {
      containerId: options.containerId,
      triggerText: options.triggerText || "Select an Option",
      items: options.items || [],
      onSelect: options.onSelect || function () {},
    };

    // Initialize the dropdown
    this.init();
  }

  // Create the dropdown structure
  init() {
    const container = document.getElementById(this.config.containerId);
    if (!container) {
      console.error(`Container with ID ${this.config.containerId} not found`);
      return;
    }

    // Create dropdown wrapper
    this.dropdownWrapper = document.createElement("div");
    this.dropdownWrapper.className = "dropdown-wrapper";

    // Create trigger button
    this.triggerButton = document.createElement("button");
    this.triggerButton.className = "dropdown-trigger";
    this.triggerButton.textContent = this.config.triggerText;
    this.triggerButton.addEventListener("click", () => this.toggleDropdown());

    // Create dropdown menu
    this.dropdownMenu = document.createElement("ul");
    this.dropdownMenu.className = "dropdown-menu";
    this.dropdownMenu.style.display = "none";

    // Populate dropdown items
    this.config.items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item.label;
      listItem.className = "dropdown-item";
      listItem.addEventListener("click", () => this.selectItem(item));
      this.dropdownMenu.appendChild(listItem);
    });

    // Append elements
    this.dropdownWrapper.appendChild(this.triggerButton);
    this.dropdownWrapper.appendChild(this.dropdownMenu);
    container.appendChild(this.dropdownWrapper);

    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (!this.dropdownWrapper.contains(event.target)) {
        this.closeDropdown();
      }
    });
  }

  // Toggle dropdown visibility
  toggleDropdown() {
    const isOpen = this.dropdownMenu.style.display === "block";
    this.dropdownMenu.style.display = isOpen ? "none" : "block";
  }

  // Close the dropdown
  closeDropdown() {
    this.dropdownMenu.style.display = "none";
  }

  // Handle item selection
  selectItem(item) {
    // Update trigger button text
    this.triggerButton.textContent = item.label;

    // Close dropdown
    this.closeDropdown();

    // Call the provided callback
    this.config.onSelect(item);
  }
}

// Example usage
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = new Dropdown({
    containerId: "dropdown-container",
    triggerText: "Choose an Option",
    items: [
      {
        label: "Profile",
        action: () => console.log("Profile selected"),
      },
      {
        label: "Settings",
        action: () => console.log("Settings selected"),
      },
      {
        label: "Logout",
        action: () => console.log("Logout selected"),
      },
    ],
    onSelect: (item) => {
      console.log(`Selected: ${item.label}`);
      // You can add custom logic here
    },
  });
});

// Optional CSS to style the dropdown (you can customize this)
const style = document.createElement("style");
style.textContent = `
    .dropdown-wrapper {
        position: relative;
        width: 200px;
    }
    .dropdown-trigger {
        width: 100%;
        padding: 10px;
        background-color: #f1f1f1;
        border: 1px solid #ddd;
        cursor: pointer;
    }
    .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        list-style-type: none;
        padding: 0;
        margin: 0;
        border: 1px solid #ddd;
        background-color: white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .dropdown-item {
        padding: 10px;
        cursor: pointer;
    }
    .dropdown-item:hover {
        background-color: #f1f1f1;
    }
`;
document.head.appendChild(style);

// HTML structure needed in your page
// <div id="dropdown-container"></div>
