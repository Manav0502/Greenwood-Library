// Catalog Dataset
const books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    year: 1960,
    available: true,
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    year: 2008,
    available: true,
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    year: 1988,
    available: false,
    cover: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    title: "Sapiens: A Brief History",
    author: "Yuval Noah Harari",
    category: "History",
    year: 2011,
    available: true,
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 5,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    category: "Technology",
    year: 1999,
    available: true,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 6,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    year: 1925,
    available: true,
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400"
  }
];

let activeCategory = "All";
let searchQuery = "";

// DOM Elements
const booksGrid = document.getElementById("books-grid");
const searchInput = document.getElementById("search-input");
const categoryFilters = document.getElementById("category-filters");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const bookModal = document.getElementById("book-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalContent = document.getElementById("modal-content");

// Initialize Render
document.addEventListener("DOMContentLoaded", () => {
  renderBooks();
  setupEventListeners();
});

// Render Book Cards
function renderBooks() {
  const filtered = books.filter((book) => {
    const matchesCategory = activeCategory === "All" || book.category === activeCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery) || book.author.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    booksGrid.innerHTML = `
      <div class="col-span-full text-center py-12 text-stone-500">
        <p class="text-lg font-medium">No books found matching your criteria.</p>
        <button onclick="resetFilters()" class="mt-3 text-sm text-forest-700 underline">Clear search and filters</button>
      </div>
    `;
    return;
  }

  booksGrid.innerHTML = filtered.map((book) => `
    <article class="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
      <div class="h-48 overflow-hidden bg-stone-100 relative">
        <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover">
        <span class="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
          book.available ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
        }">
          ${book.available ? 'Available' : 'Checked Out'}
        </span>
      </div>
      <div class="p-5 flex-grow flex flex-col justify-between">
        <div>
          <span class="text-xs text-forest-600 font-semibold tracking-wide uppercase">${book.category}</span>
          <h3 class="font-serif font-bold text-lg text-stone-900 mt-1 leading-snug">${book.title}</h3>
          <p class="text-sm text-stone-600 mt-1">by ${book.author} (${book.year})</p>
        </div>
        <button 
          onclick="openBookModal(${book.id})" 
          class="mt-4 w-full text-center bg-stone-100 hover:bg-forest-700 hover:text-white text-stone-800 text-sm font-medium py-2 rounded-lg transition"
        >
          View Details
        </button>
      </div>
    </article>
  `).join("");
}

// Event Listeners
function setupEventListeners() {
  // Search
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderBooks();
  });

  // Category Filtering
  categoryFilters.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
      const buttons = categoryFilters.querySelectorAll(".filter-btn");
      buttons.forEach(btn => {
        btn.className = "filter-btn bg-white text-stone-600 hover:bg-stone-100 font-medium px-4 py-1.5 rounded-full border border-stone-200 transition";
      });

      e.target.className = "filter-btn bg-forest-700 text-white font-medium px-4 py-1.5 rounded-full shadow-sm transition";
      activeCategory = e.target.getAttribute("data-category");
      renderBooks();
    }
  });

  // Mobile Menu Toggle
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Modal Close
  closeModalBtn.addEventListener("click", closeModal);
  bookModal.addEventListener("click", (e) => {
    if (e.target === bookModal) closeModal();
  });
}

function resetFilters() {
  activeCategory = "All";
  searchQuery = "";
  searchInput.value = "";
  renderBooks();
}

// Modal Handling
function openBookModal(id) {
  const book = books.find((b) => b.id === id);
  if (!book) return;

  modalContent.innerHTML = `
    <span class="text-xs font-semibold uppercase text-forest-600">${book.category}</span>
    <h3 class="font-serif font-bold text-2xl text-stone-900 mt-1">${book.title}</h3>
    <p class="text-sm text-stone-600">Author: ${book.author} • Released ${book.year}</p>
    
    <div class="mt-4 pt-4 border-t border-stone-200">
      <p class="text-sm text-stone-700 leading-relaxed">
        This item is currently stored in Section ${book.category[0]}-4. Reserved members can request immediate pickup at the front desk.
      </p>
      <div class="mt-6 flex items-center justify-between">
        <span class="text-sm font-medium ${book.available ? 'text-emerald-700' : 'text-rose-700'}">
          ${book.available ? '● Ready for Borrowing' : '● Currently Unavailable'}
        </span>
        <button 
          ${!book.available ? 'disabled' : ''} 
          onclick="alert('Book reserved successfully!')" 
          class="bg-forest-700 disabled:bg-stone-300 hover:bg-forest-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          Reserve Book
        </button>
      </div>
    </div>
  `;
  bookModal.classList.remove("hidden");
  bookModal.classList.add("flex");
}

function closeModal() {
  bookModal.classList.add("hidden");
  bookModal.classList.remove("flex");
}
