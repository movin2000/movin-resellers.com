<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MovinResellers E-Commerce App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    
    <style>
        /* CSS Variables for Theming */
        :root {
            --primary-color: #0d9488; /* Tailwind teal-600 */
            --secondary-bg: #ffffff;
            --main-bg: #f3f4f6; /* Tailwind gray-100 */
            --text-color: #1f2937; /* Tailwind gray-800 */
            --border-color: #e5e7eb; /* Tailwind gray-200 */
        }

        /* Dark Mode Theme */
        [data-theme="dark"] {
            --secondary-bg: #1f2937; /* Darker gray for cards/modals */
            --main-bg: #111827; /* Even darker for body background */
            --text-color: #f9fafb; /* Light text */
            --border-color: #374151; /* Dark border */
        }
        
        body {
            background-color: var(--main-bg);
            color: var(--text-color);
            transition: background-color 0.3s, color 0.3s;
        }

        /* Custom Styles */
        .app-section {
            display: none;
            min-height: calc(100vh - 80px); /* Subtract header height */
            padding-top: 80px;
        }
        
        /* NEW: Modern Logo Styling */
        .app-logo-text {
            /* Makes the color slightly pop by adding a subtle shadow */
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); 
            transition: transform 0.3s ease-in-out;
        }
        .app-logo-text:hover {
            /* Optional: Add a subtle lift on hover for interactivity */
            transform: translateY(-1px);
        }

        /* Header Navigation */
        .header-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 50;
            background-color: var(--secondary-bg);
            border-bottom: 1px solid var(--border-color);
        }
        .tab-button {
            padding: 0.5rem 1rem;
            color: var(--text-color);
            transition: color 0.2s;
            position: relative;
        }
        .tab-button.active {
            color: var(--primary-color);
            border-bottom: 3px solid var(--primary-color);
            font-weight: bold;
        }
        .tab-button:hover {
            color: var(--primary-color);
        }
        .tab-button .badge {
            position: absolute;
            top: 0px;
            right: 0px;
        }

        /* Product Card specific styling */
        .product-card {
            background-color: var(--secondary-bg);
            border-color: var(--border-color);
        }
        .product-image {
            cursor: pointer;
        }
        .product-card button {
            transition: background-color 0.2s;
        }

        /* Modal styling */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: none; /* Controlled by JS */
            align-items: center;
            justify-content: center;
            z-index: 100;
        }
        .modal-content {
            background-color: var(--main-bg);
            width: 90%;
            max-width: 600px;
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }
        
        /* Form/Input Styling */
        input:focus, textarea:focus, select:focus {
            border-color: var(--primary-color) !important;
            box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.5) !important;
        }
        .input-error {
            border-color: #ef4444 !important; /* Tailwind red-500 */
        }
        .error-text {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }

        /* Toast Notification */
        #toastContainer {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        .toast {
            min-width: 300px;
            margin-top: 10px;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            opacity: 0;
            transform: translateX(100%);
            transition: opacity 0.3s, transform 0.3s;
            display: flex;
            align-items: center;
        }
        .toast.show {
            opacity: 1;
            transform: translateX(0);
        }
        .toast-success { background-color: #d1fae5; color: #065f46; border-left: 5px solid #10b981; }
        .toast-error { background-color: #fee2e2; color: #991b1b; border-left: 5px solid #ef4444; }
        .toast-info { background-color: #e0f2f1; color: #0f766e; border-left: 5px solid #2dd4bf; }
        
        /* Loading Indicator */
        #loadingIndicator {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid #fff;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Ripple Effect */
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background-color: rgba(255, 255, 255, 0.5);
        }
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Cart Animation */
        .flying-image {
            position: fixed;
            z-index: 1000;
            width: 150px; /* start size */
            height: 150px;
            object-fit: cover;
            border-radius: 1rem;
            transition: all 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            transform: scale(0.2);
            opacity: 0.8;
        }
        .cart-hit-animation {
            animation: shake 0.5s;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }

        /* Admin Tab Styling */
        .admin-tab-button.active {
            background-color: var(--primary-color);
            color: white;
        }

        /* Cart Summary Popup */
        #cartSummaryPopup {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease-in-out;
        }
    </style>
</head>
<body class="min-h-screen">

    <div id="loadingIndicator">
        <div class="spinner"></div>
    </div>

    <div id="toastContainer"></div>

    <header class="header-menu bg-white p-4 shadow-md flex justify-between items-center">
        <div class="flex items-center space-x-6">
            <h1 class="text-3xl font-bold text-teal-600 app-logo-text">MovinResellers</h1>
            
            <div class="hidden md:flex items-center w-full max-w-lg bg-gray-100 rounded-xl">
                <input type="text" id="mainSearchInput" placeholder="Search products..." 
                       onkeypress="if(event.key === 'Enter') executeSearch()"
                       class="w-full p-2 bg-gray-100 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-teal-500">
                <button onclick="executeSearch()" class="p-2 bg-teal-600 text-white rounded-r-xl hover:bg-teal-700 ripple-effect">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div>
        
        <nav class="flex items-center space-x-4">
            <button class="tab-button" onclick="showSection('home')" data-target="home">
                <i class="fas fa-home mr-2"></i> Home
            </button>
            <button class="tab-button relative" onclick="showSection('cart')" data-target="cart"
                    onmouseenter="showCartSummary()" onmouseleave="hideCartSummary()">
                <i class="fas fa-shopping-cart mr-2"></i> Cart
                <span id="cartCount" class="badge bg-red-500 text-white text-xs px-2 py-0.5 rounded-full absolute -top-1 -right-1">0</span>
            </button>
            <button class="tab-button" onclick="showSection('profile')" data-target="profile">
                <i class="fas fa-user-circle mr-2"></i> <span id="profileName">Profile</span>
            </button>
            <button class="tab-button" onclick="showSection('admin')" data-target="admin">
                <i class="fas fa-user-shield mr-2"></i> Admin
            </button>
            <button id="themeToggle" class="text-xl p-2 rounded-full hover:bg-gray-100 transition-colors">
                <i id="themeIcon" class="fas fa-moon"></i>
            </button>
        </nav>
    </header>

    <div id="cartSummaryPopup" class="absolute right-0 mt-[65px] mr-4 w-72 bg-secondary-bg rounded-lg shadow-2xl border border-border-color p-4 z-40">
        <h3 class="font-bold text-lg mb-2 border-b pb-2 border-border-color">Cart Summary (<span id="summaryItemCount">0</span> Items)</h3>
        <div id="cartSummaryItems" class="space-y-2 text-sm">
            <p class="text-gray-500 italic">Your cart is empty.</p>
        </div>
        <div class="mt-4 pt-2 border-t border-border-color flex justify-between items-center font-bold">
            <span>Total:</span>
            <span class="text-teal-600" id="summaryTotal">UGX 0</span>
        </div>
        <button onclick="showSection('cart')" class="w-full bg-teal-600 text-white font-bold py-2 mt-3 rounded-lg hover:bg-teal-700 transition-colors ripple-effect text-sm">
            View Cart & Checkout
        </button>
    </div>
    
    <main class="container mx-auto px-4 pb-12 pt-4">

        <section id="home" class="app-section">
            <h2 class="text-3xl font-bold mb-6 text-gray-900">Featured Products</h2>
            
            <div id="quickFilters" class="mb-8 flex flex-wrap gap-3">
                <button id="filter-all" onclick="applyQuickCategoryFilter('all')" class="bg-teal-600 text-white font-semibold py-2 px-4 rounded-xl active transition-colors ripple-effect text-sm">All Products</button>
                <button id="filter-new" onclick="applyQuickStatusFilter('new')" class="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl hover:bg-gray-300 transition-colors ripple-effect text-sm">New Arrivals</button>
                <button id="filter-5star" onclick="applyQuickStatusFilter('5star')" class="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl hover:bg-gray-300 transition-colors ripple-effect text-sm">5-Star Rated</button>
                <button id="filter-under50" onclick="applyQuickStatusFilter('under50')" class="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl hover:bg-gray-300 transition-colors ripple-effect text-sm">Under UGX 200,000</button>
            </div>
            
            <div class="bg-secondary-bg p-6 rounded-2xl shadow-lg mb-8 flex flex-wrap gap-4 items-center border border-border-color">
                <div class="flex-1 min-w-[200px]">
                    <label for="categoryFilter" class="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
                    <select id="categoryFilter" onchange="applyFiltersAndSort()" class="w-full p-2 border border-gray-300 rounded-lg bg-secondary-bg focus:ring-teal-500 focus:border-teal-500">
                        <option value="all">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home Goods">Home Goods</option>
                    </select>
                </div>
                
                <div class="flex-1 min-w-[200px]">
                    <label for="sortSelector" class="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                    <select id="sortSelector" onchange="applyFiltersAndSort()" class="w-full p-2 border border-gray-300 rounded-lg bg-secondary-bg focus:ring-teal-500 focus:border-teal-500">
                        <option value="default">Default</option>
                        <option value="priceAsc">Price: Low to High</option>
                        <option value="priceDesc">Price: High to Low</option>
                        <option value="ratingDesc">Rating: High to Low</option>
                    </select>
                </div>

                <div class="flex-1 min-w-[200px]">
                    <label for="maxPriceFilter" class="block text-sm font-medium text-gray-700 mb-1">Max Price: <span id="priceLabel" class="font-bold text-teal-600">UGX 4,000,000</span></label>
                    <input type="range" id="maxPriceFilter" min="1" max="1000" value="1000" oninput="updatePriceLabel()" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg">
                </div>
            </div>

            <div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                </div>
        </section>

        <section id="productDetail" class="app-section">
            <button onclick="showSection('home')" class="text-teal-600 hover:text-teal-800 font-semibold mb-6">
                <i class="fas fa-arrow-left mr-2"></i> Back to Products
            </button>
            <div id="productDetailContent" class="bg-secondary-bg p-8 rounded-2xl shadow-xl border border-border-color">
                </div>
        </section>

        <section id="searchResults" class="app-section">
            <h2 class="text-3xl font-bold mb-4 text-gray-900">Search Results</h2>
            <p class="text-lg text-gray-600 mb-6">Showing <span id="searchResultCount" class="font-bold text-teal-600">0</span> results for: "<span id="searchQueryDisplay" class="font-bold text-gray-900"></span>"</p>
            
            <div id="searchResultsGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                </div>
        </section>

        <section id="cart" class="app-section">
            <h2 class="text-3xl font-bold mb-6 text-gray-900">Your Shopping Cart</h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-4">
                    <div id="emptyCartMessage" class="hidden bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg">
                        <p class="font-bold">Your cart is empty!</p>
                        <p>Time to find some great deals. <a href="#" onclick="showSection('home')" class="text-yellow-800 underline hover:text-yellow-900">Go shopping!</a></p>
                    </div>
                    <div id="cartItemsList" class="space-y-4">
                        </div>
                </div>
                
                <div class="lg:col-span-1 sticky top-20 h-fit">
                    <div class="bg-secondary-bg p-6 rounded-2xl shadow-xl border border-border-color">
                        <h3 class="text-xl font-bold mb-4 border-b pb-2">Order Summary</h3>
                        
                        <div class="space-y-3 text-gray-700">
                            <div class="flex justify-between">
                                <span>Items (<span id="cartItemCountDisplay">0</span>) Subtotal:</span>
                                <span id="cartSubtotal" class="font-semibold">UGX 0</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Shipping:</span>
                                <span class="font-semibold text-green-600">UGX 55,000</span>
                            </div>
                            <div class="flex justify-between pt-3 border-t border-dashed border-gray-300">
                                <span class="text-xl font-bold">Order Total:</span>
                                <span id="cartTotal" class="text-xl font-bold text-teal-600">UGX 0</span>
                            </div>
                        </div>
                        
                        <button onclick="processCheckout()" class="w-full mt-6 bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-colors ripple-effect">
                            <i class="fas fa-credit-card mr-2"></i> Secure Checkout
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section id="profile" class="app-section">
            <h2 class="text-3xl font-bold mb-6 text-gray-900">Welcome, <span id="profileNameDisplay">User</span></h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-1 sticky top-20 h-fit">
                    <div class="bg-secondary-bg p-6 rounded-2xl shadow-xl border border-border-color text-center">
                        <img src="https://i.pravatar.cc/150?img=1" alt="User Avatar" class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-teal-500">
                        <p class="text-2xl font-bold text-gray-900 mb-1" id="profileNameReadonly">Jane Doe</p>
                        <p class="text-sm text-gray-500">Member Since: <span id="profileMemberSinceReadonly">Jan 15, 2023</span></p>
                    </div>
                    
                    <div class="mt-8 bg-secondary-bg p-6 rounded-2xl shadow-xl border border-border-color">
                        <h3 class="text-xl font-bold mb-4 border-b pb-2">Order History</h3>
                        <div id="orderHistoryList" class="space-y-3">
                            </div>
                    </div>
                </div>
                
                <div class="lg:col-span-2">
                    <div class="bg-secondary-bg p-8 rounded-2xl shadow-xl border border-border-color">
                        <h3 class="text-2xl font-bold mb-6 text-gray-900">Edit Profile Information</h3>
                        
                        <form id="profileEditForm" class="space-y-6">
                            <div>
                                <label for="editProfileName" class="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="editProfileName" required class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-secondary-bg">
                            </div>
                            
                            <div>
                                <label for="editProfileEmail" class="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" id="editProfileEmail" required class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-secondary-bg">
                            </div>
                            
                            <div>
                                <label for="editProfileAddress" class="block text-sm font-medium text-gray-700">Shipping Address</label>
                                <textarea id="editProfileAddress" rows="3" required class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-secondary-bg"></textarea>
                            </div>
                            
                            <button type="submit" class="w-full bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition-colors ripple-effect">
                                <i class="fas fa-save mr-2"></i> Save Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <section id="admin" class="app-section">
            <h2 class="text-3xl font-bold mb-6 text-gray-900">Admin Dashboard</h2>
            
            <div id="adminLoginForm" class="max-w-md mx-auto bg-secondary-bg p-8 rounded-2xl shadow-xl border border-border-color">
                <h3 class="text-2xl font-bold mb-4 text-center">Admin Login</h3>
                <p id="loginMessage" class="text-red-500 text-sm mb-4 text-center hidden">Incorrect password. Access Denied.</p>
                <div class="space-y-4">
                    <div>
                        <label for="adminPassword" class="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="adminPassword" class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-secondary-bg" placeholder="Enter Admin Password">
                    </div>
                    <button id="adminLoginButton" class="w-full bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition-colors ripple-effect">
                        <i class="fas fa-sign-in-alt mr-2"></i> Log In
                    </button>
                </div>
            </div>
            
            <div id="adminContent" class="hidden">
                <div class="flex space-x-4 mb-6 border-b pb-4 border-border-color">
                    <button id="tab-dashboard" onclick="switchAdminTab('dashboard')" class="admin-tab-button bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors ripple-effect active">
                        <i class="fas fa-chart-line mr-2"></i> Dashboard
                    </button>
                    <button id="tab-products" onclick="switchAdminTab('products')" class="admin-tab-button bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors ripple-effect">
                        <i class="fas fa-boxes mr-2"></i> Products
                    </button>
                    <button onclick="adminLogout()" class="ml-auto bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors ripple-effect">
                        <i class="fas fa-sign-out-alt mr-2"></i> Logout
                    </button>
                </div>
                
                <div id="adminDashboardView" class="admin-tab-content">
                    <h3 class="text-2xl font-bold mb-6">Key Metrics</h3>
                    <div id="metricsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        </div>
                </div>

                <div id="adminProductsView" class="admin-tab-content hidden">
                    <div class="flex justify-between items-center mb-6">
                        <div class="relative flex-grow max-w-sm">
                            <input type="text" id="adminSearchInput" oninput="renderAdminProductList()" placeholder="Search products by name or ID" class="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-secondary-bg">
                            <i class="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                        <button onclick="showAddProductModal()" class="bg-teal-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-teal-700 transition-colors ripple-effect">
                            <i class="fas fa-plus-circle mr-2"></i> Add New Product
                        </button>
                    </div>
                    <div id="adminProductList" class="space-y-4">
                        </div>
                </div>
            </div>
        </section>

    </main>
    
    <div id="editProductModal" class="modal-overlay" onclick="if(event.target.id === 'editProductModal') hideEditModal()">
        <div class="modal-content p-8">
            <h3 class="text-2xl font-bold mb-6 border-b pb-2 text-gray-900" id="editProductNameTitle">Edit Product</h3>
            <form id="editProductForm" class="space-y-4">
                <input type="hidden" id="editProductId" value="">
                
                <div>
                    <label for="editName" class="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="editName" required class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-secondary-bg">
                </div>
                
                <div>
                    <label for="editPrice" class="block text-sm font-medium text-gray-700">Price (UGX)</label>
                    <input type="number" id="editPrice" required min="1000" class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-secondary-bg">
                </div>

                <div>
                    <label for="editCategory" class="block text-sm font-medium text-gray-700">Category</label>
                    <select id="editCategory" required class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-secondary-bg">
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home Goods">Home Goods</option>
                    </select>
                </div>

                <div>
                    <label for="editImageUrl" class="block text-sm font-medium text-gray-700">Image URL (Live or Static)</label>
                    <input type="url" id="editImageUrl" name="imageUrl" class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-secondary-bg" placeholder="https://example.com/product-image.jpg">
                </div>
                <div>
                    <label for="editDescription" class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="editDescription" rows="3" required class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-secondary-bg"></textarea>
                </div>
                
                <div class="flex items-center space-x-6">
                    <div>
                        <label for="editStockStatus" class="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                        <select id="editStockStatus" required class="p-3 border border-gray-300 rounded-lg shadow-sm bg-secondary-bg">
                            <option value="inStock">In Stock</option>
                            <option value="lowStock">Low Stock</option>
                            <option value="soldOut">Sold Out</option>
                        </select>
                    </div>
                    <div class="flex items-center mt-3">
                        <input type="checkbox" id="editIsNew" class="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500">
                        <label for="editIsNew" class="ml-2 block text-sm font-medium text-gray-700">New Product</label>
                    </div>
                </div>

                <div class="flex justify-end pt-4 space-x-3">
                    <button type="button" onclick="hideEditModal()" class="bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-400 transition-colors ripple-effect">
                        Cancel
                    </button>
                    <button type="submit" class="bg-teal-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-teal-700 transition-colors ripple-effect">
                        <i class="fas fa-save mr-2"></i> Save Changes
                    </button>
                </div>
            </form>
        </div>
    </div>


<script>
    // --- Utility Functions ---

    // Function to format price with UGX currency
    function formatPrice(price) {
        // Ensures the price is a number and formats it without decimals (UGX is a high-value currency)
        // We'll use the format "UGX 100,000"
        return "UGX " + Math.round(price).toLocaleString('en-US'); 
    }

    // Ripple Effect Logic
    function createRipple(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        button.querySelectorAll('.ripple').forEach(ripple => ripple.remove());

        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');

        button.appendChild(circle);
    }
    
    // Toast Notification System
    function showToast(message, type = 'info', duration = 3000) {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.classList.add('toast', `toast-${type}`);
        
        let iconHtml = '';
        if (type === 'success') {
            iconHtml = '<i class="fas fa-check-circle mr-3"></i>';
        } else if (type === 'error') {
            iconHtml = '<i class="fas fa-times-circle mr-3"></i>';
        } else {
            iconHtml = '<i class="fas fa-info-circle mr-3"></i>';
        }
        
        toast.innerHTML = `${iconHtml} <span>${message}</span>`;
        
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 50);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    }

    // Loading Indicator Controls
    function showLoader() {
        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex';
        }
    }

    function hideLoader() {
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }
    
    // Admin ID Generator
    function generateUniqueId() {
        const maxId = products.reduce((max, product) => Math.max(max, product.id), 0);
        return maxId + 1;
    }

    // --- Data Mockup (Adjusted Prices for UGX scale) ---
    // NOTE: Prices are scaled to realistic Ugandan Shillings (UGX) amounts.
    let products = [
        { id: 1, name: 'Wireless Noise-Cancelling Headphones', price: 740000, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06a244?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', rating: 4.7, isNew: true, stockStatus: 'inStock', description: 'Experience unparalleled audio quality with active noise cancellation and a comfortable, ergonomic design.', 
          reviews: [{user: 'Alex D.', rating: 5, comment: 'Best headphones I have ever owned!'}, {user: 'Sarah M.', rating: 4, comment: 'Great sound, but a bit pricey.'}] },
        { id: 2, name: 'Vintage Leather Backpack', price: 295000, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1550009159-d8e7c1f8c1f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', rating: 4.5, isNew: false, stockStatus: 'lowStock', description: 'A stylish, durable leather backpack perfect for daily commute or weekend travel.', 
          reviews: [{user: 'Tom H.', rating: 5, comment: 'Perfect size and great quality leather.'}] },
        { id: 3, name: 'Smart Home Hub 3.0', price: 1100000, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1594411130386-be67b5e40632?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', rating: 4.9, isNew: true, stockStatus: 'inStock', description: 'The central brain for your smart home devices, offering seamless integration and voice control.', 
          reviews: [{user: 'Dave G.', rating: 5, comment: 'Setup was a breeze, controls all my devices!'}, {user: 'Lena R.', rating: 5, comment: 'Absolutely essential for a modern home.'}] },
        { id: 4, name: 'Minimalist Wooden Desk Lamp', price: 170000, category: 'Home Goods', imageUrl: 'https://images.unsplash.com/photo-1543884802-1bc8187803a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', rating: 4.2, isNew: false, stockStatus: 'inStock', description: 'A sleek, modern desk lamp with an adjustable wooden arm and soft LED lighting.', 
          reviews: [{user: 'Ben K.', rating: 4, comment: 'Looks great on my desk, subtle and modern.'}, {user: 'Mia T.', rating: 4, comment: 'Nice design, wish the cord was longer.'}] },
        { id: 5, name: 'Cotton Crew Neck T-Shirt', price: 92000, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1521572175240-5e60802c347b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', rating: 5.0, isNew: true, stockStatus: 'inStock', description: 'A classic, comfortable cotton tee in a variety of colors.', 
          reviews: [{user: 'Jane A.', rating: 5, comment: 'Incredibly soft and fits true to size.'}] },
        { id: 6, name: 'Classic Analog Watch', price: 445000, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1533139502638-269665979dcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', rating: 4.6, isNew: false, stockStatus: 'lowStock', description: 'Timeless design with a stainless steel case and genuine leather strap.', 
          reviews: [{user: 'Sam P.', rating: 5, comment: 'Elegant and reliable.'}] },
        { id: 7, name: 'Ergonomic Office Chair', price: 1650000, category: 'Home Goods', imageUrl: 'https://images.unsplash.com/photo-1567538096236-fd6d8d742667?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', rating: 4.8, isNew: false, stockStatus: 'inStock', description: 'Fully adjustable chair providing superior lumbar support for long hours.', 
          reviews: [{user: 'Rick O.', rating: 5, comment: 'My back thanks me every day!'}, {user: 'Mona L.', rating: 4, comment: 'Very comfortable, assembly was simple.'}] },
        { id: 8, name: 'High-Speed USB-C Drive', price: 135000, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1621091218151-248792078652?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', rating: 4.0, isNew: true, stockStatus: 'soldOut', description: 'Compact and fast storage solution with USB-C connectivity.', 
          reviews: [{user: 'Chris A.', rating: 4, comment: 'Blazing fast transfer speeds.'}] }
    ];

    let cartItems = [];
    const SHIPPING_COST = 55000; // Increased shipping cost to match UGX scale
    
    // User Data Mockup
    let userData = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        address: '123 E-Commerce Lane, App City, CA 90210',
        avatar: 'https://i.pravatar.cc/150?img=1',
        memberSince: 'Jan 15, 2023'
    };
    
    // Order History Mockup
    let orderHistory = [
        { id: 'ORD-54321', date: 'Oct 1, 2024', total: 795000, status: 'Delivered' },
        { id: 'ORD-98765', date: 'Sep 20, 2024', total: 327000, status: 'Shipped' }
    ];
    
    // --- DOM Elements ---
    const productGrid = document.getElementById('productGrid');
    const cartCountElement = document.getElementById('cartCount');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortSelector = document.getElementById('sortSelector');
    const maxPriceFilter = document.getElementById('maxPriceFilter');
    const priceLabel = document.getElementById('priceLabel');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const adminPasswordInput = document.getElementById('adminPassword');
    const adminLoginButton = document.getElementById('adminLoginButton');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminContent = document.getElementById('adminContent');
    const loginMessage = document.getElementById('loginMessage');
    const editProductModal = document.getElementById('editProductModal');
    const editProductForm = document.getElementById('editProductForm');
    const cartSummaryPopup = document.getElementById('cartSummaryPopup');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const toastContainer = document.getElementById('toastContainer');
    const ADMIN_PASSWORD = 'supersecret';
    const ADMIN_TOKEN_KEY = 'movinResellersAdminToken';

    // --- Theming ---
    function toggleTheme() {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun', 'text-yellow-500');
            themeIcon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun', 'text-yellow-500');
        }
    }

    // --- Section Switching ---
    const allSections = document.querySelectorAll('.app-section');
    const allTabs = document.querySelectorAll('.tab-button');
    function showSection(sectionId) {
        allSections.forEach(section => {
            section.style.display = 'none';
        });
        allTabs.forEach(tab => {
            if (tab.dataset.target === sectionId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            window.scrollTo(0, 0); // Scroll to top when changing section
        }
        if (sectionId === 'cart') {
            renderCart();
        } else if (sectionId === 'profile') {
            renderProfile();
        } else if (sectionId === 'admin') {
            if (localStorage.getItem(ADMIN_TOKEN_KEY) === 'true') {
                 showAdminDashboard();
            }
        }
    }

    // --- Product Card Rendering ---
    function createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card', 'bg-white', 'rounded-2xl', 'shadow-xl', 'overflow-hidden', 'transition-transform', 'hover:scale-[1.02]', 'duration-300', 'border', 'border-gray-100');
        productCard.dataset.id = product.id;

        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        const reviewCount = product.reviews ? product.reviews.length : 0;

        let badgeHtml = '';
        if (product.isNew) {
            badgeHtml = '<span class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">NEW</span>';
        }

        let buttonContent = `<i class="fas fa-cart-plus mr-2"></i> Add to Cart`;
        let buttonDisabled = '';
        let buttonClass = 'bg-teal-600 hover:bg-teal-700';

        if (product.stockStatus === 'soldOut') {
            buttonContent = `<i class="fas fa-exclamation-circle mr-2"></i> Sold Out`;
            buttonDisabled = 'disabled';
            buttonClass = 'bg-gray-400 cursor-not-allowed';
        } else if (product.stockStatus === 'lowStock') {
            buttonContent = `<i class="fas fa-box-open mr-2"></i> Low Stock`;
            buttonClass = 'bg-yellow-500 hover:bg-yellow-600';
        }
        
        productCard.innerHTML = `
            ${badgeHtml}
            <div class="relative overflow-hidden h-48 rounded-t-lg bg-gray-100">
                <img src="${product.imageUrl || 'https://via.placeholder.com/400?text=No+Image'}" alt="${product.name}" class="w-full h-full object-cover product-image" onclick="showProductDetails(${product.id})">
            </div>
            
            <div class="p-4 flex flex-col justify-between h-full">
                <div>
                    <span class="text-xs font-semibold text-teal-600 mb-1">${product.category}</span>
                    <h3 class="text-lg font-bold text-text-color mb-1 cursor-pointer hover:text-teal-600" onclick="showProductDetails(${product.id})">${product.name}</h3>
                    <div class="flex items-center mb-2">
                        <span class="star-rating text-yellow-500 text-sm mr-2">
                            ${'★'.repeat(fullStars)}
                            ${hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
                            ${'☆'.repeat(emptyStars)}
                        </span>
                        <span class="text-xs text-gray-500">(${reviewCount} reviews)</span>
                    </div>
                    <p class="text-sm text-gray-500 mb-3">${product.description.substring(0, 50)}...</p>
                </div>
                <div class="mt-auto">
                    <p class="text-xl font-extrabold text-teal-600 mb-3">${formatPrice(product.price)}</p>
                    <button class="w-full text-white font-bold py-2 rounded-lg transition-colors ripple-effect ${buttonClass}" 
                        onclick="addToCart(event, ${product.id})" ${buttonDisabled}>
                        ${buttonContent}
                    </button>
                </div>
            </div>
        `;
        return productCard;
    }

    function renderProducts(productsToRender) {
        if (!productGrid) return;
        productGrid.innerHTML = '';
        if (productsToRender.length === 0) {
            productGrid.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">No products found matching your filters.</p>`;
            return;
        }
        productsToRender.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
    }

    // --- Product Interactions ---
    // Product Details View
    function renderReviewsList(reviews) {
        if (!reviews || reviews.length === 0) {
            return '<p class="text-gray-500">Be the first to leave a review!</p>';
        }
        let reviewsHtml = '';
        reviews.forEach(review => {
            const reviewStars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            reviewsHtml += `
                <div class="bg-white p-4 rounded-xl shadow-sm border border-border-color">
                    <div class="flex items-center justify-between">
                        <p class="font-bold text-gray-800">${review.user}</p>
                        <span class="star-rating text-yellow-500 text-sm">${reviewStars}</span>
                    </div>
                    <p class="text-gray-700 mt-2">${review.comment}</p>
                </div>
            `;
        });
        return reviewsHtml;
    }

    function renderReviewForm(productId) {
        const container = document.getElementById('reviewFormContainer');
        if (!container) return;

        const reviewerName = userData.name;

        container.innerHTML = `
            <form id="reviewSubmissionForm" data-product-id="${productId}" class="bg-white p-6 rounded-xl shadow-md border border-border-color space-y-4">
                <h3 class="text-xl font-bold border-b pb-2 mb-4">Submit Your Review</h3>
                <p class="text-gray-700">Reviewing as: <span class="font-bold text-teal-600">${reviewerName}</span></p>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                    <input type="hidden" id="reviewRating" value="0">
                    <div id="starRatingInput" class="flex text-3xl text-gray-300">
                        <span class="hover:text-yellow-500 cursor-pointer transition-colors" data-rating="1">★</span>
                        <span class="hover:text-yellow-500 cursor-pointer transition-colors" data-rating="2">★</span>
                        <span class="hover:text-yellow-500 cursor-pointer transition-colors" data-rating="3">★</span>
                        <span class="hover:text-yellow-500 cursor-pointer transition-colors" data-rating="4">★</span>
                        <span class="hover:text-yellow-500 cursor-pointer transition-colors" data-rating="5">★</span>
                    </div>
                    <p id="ratingError" class="error-text hidden">Please select a rating.</p>
                </div>
                
                <div>
                    <label for="reviewComment" class="block text-sm font-medium text-gray-700">Your Comment (Min 10 chars)</label>
                    <textarea id="reviewComment" rows="4" class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white" required></textarea>
                    <p id="commentError" class="error-text hidden">Comment must be at least 10 characters long.</p>
                </div>
                
                <button type="submit" class="bg-teal-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-teal-700 transition-colors ripple-effect">
                    <i class="fas fa-paper-plane mr-2"></i> Submit Review
                </button>
            </form>
        `;
        
        // Attach event listeners for star rating
        document.querySelectorAll('#starRatingInput span').forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.dataset.rating);
                document.getElementById('reviewRating').value = rating;
                document.querySelectorAll('#starRatingInput span').forEach(s => {
                    s.style.color = parseInt(s.dataset.rating) <= rating ? '#f59e0b' : '#d1d5db';
                });
            });
            star.addEventListener('mouseenter', function() {
                const rating = parseInt(this.dataset.rating);
                document.querySelectorAll('#starRatingInput span').forEach(s => {
                    s.style.color = parseInt(s.dataset.rating) <= rating ? '#fcd34d' : '#d1d5db';
                });
            });
            star.addEventListener('mouseleave', function() {
                const currentRating = parseInt(document.getElementById('reviewRating').value);
                document.querySelectorAll('#starRatingInput span').forEach(s => {
                    s.style.color = parseInt(s.dataset.rating) <= currentRating ? '#f59e0b' : '#d1d5db';
                });
            });
        });

        document.getElementById('reviewSubmissionForm').addEventListener('submit', submitReview);
    }

    function submitReview(event) {
        event.preventDefault();

        const form = event.target;
        const productId = parseInt(form.dataset.productId);
        const rating = parseInt(document.getElementById('reviewRating').value);
        const comment = document.getElementById('reviewComment').value.trim();
        const reviewer = userData.name;

        // --- 1. Validation ---
        let hasError = false;
        document.getElementById('ratingError').classList.add('hidden');
        document.getElementById('commentError').classList.add('hidden');

        if (rating === 0) {
            document.getElementById('ratingError').classList.remove('hidden');
            hasError = true;
        }
        if (comment.length < 10) {
            document.getElementById('commentError').classList.remove('hidden');
            hasError = true;
        }

        if (hasError) {
            showToast("Please fix the errors in your review form.", 'error', 3000);
            return;
        }

        // --- 2. Update Product Data ---
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex === -1) return;

        const product = products[productIndex];
        const newReview = { user: reviewer, rating: rating, comment: comment };
        
        if (!product.reviews) product.reviews = [];
        product.reviews.push(newReview);

        // --- 3. Recalculate Average Rating ---
        const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
        const newAverage = totalRating / product.reviews.length;
        product.rating = parseFloat(newAverage.toFixed(1));

        // --- 4. Refresh UI and Provide Feedback ---
        showProductDetails(productId);
        applyFiltersAndSort(); // To update the rating displayed on the home page card
        showToast("Thank you! Your review has been submitted.", 'success');
    }

    function showProductDetails(productId) {
        const product = products.find(p => p.id === productId);
        const detailContainer = document.getElementById('productDetailContent');

        if (!product) {
            detailContainer.innerHTML = '<p class="text-center text-red-500 py-10">Product Not Found!</p>';
            showSection('productDetail');
            return;
        }

        // Calculate current rating stars
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        const starHtml = `
            <span class="star-rating text-yellow-500 text-xl mr-2">
                ${'★'.repeat(fullStars)}
                ${hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
                ${'☆'.repeat(emptyStars)}
            </span>
        `;
        const reviewCount = product.reviews ? product.reviews.length : 0;

        let buttonContent = `<i class="fas fa-cart-plus mr-2"></i> Add to Cart`;
        let buttonDisabled = '';
        let buttonClass = 'bg-teal-600 hover:bg-teal-700';
        
        if (product.stockStatus === 'soldOut') {
            buttonContent = `<i class="fas fa-exclamation-circle mr-2"></i> Sold Out`;
            buttonDisabled = 'disabled';
            buttonClass = 'bg-gray-400 cursor-not-allowed';
        } else if (product.stockStatus === 'lowStock') {
            buttonContent = `<i class="fas fa-box-open mr-2"></i> Low Stock`;
            buttonClass = 'bg-yellow-500 hover:bg-yellow-600';
        }

        detailContainer.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="relative">
                    <img src="${product.imageUrl || 'https://via.placeholder.com/600?text=Product+Image'}" alt="${product.name}" class="w-full object-cover rounded-xl shadow-lg border border-border-color">
                </div>
                <div class="flex flex-col justify-between">
                    <div>
                        <span class="text-sm font-bold text-gray-500 mb-2">${product.category}</span>
                        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">${product.name}</h1>
                        <div class="flex items-center mb-4">
                            ${starHtml}
                            <span class="text-xl font-bold text-gray-900">${product.rating.toFixed(1)}</span>
                            <span class="text-gray-500 ml-2">(${reviewCount} Reviews)</span>
                        </div>
                        <p class="text-3xl font-extrabold text-teal-600 mb-6 border-b pb-4">${formatPrice(product.price)}</p>
                        
                        <p class="text-gray-700 leading-relaxed mb-6">${product.description}</p>
                        
                        <div class="space-y-2 text-sm text-gray-600">
                            <p><i class="fas fa-tag mr-2 text-teal-500"></i> Category: <span class="font-semibold">${product.category}</span></p>
                            <p><i class="fas fa-box mr-2 text-teal-500"></i> Stock Status: <span class="font-semibold text-${product.stockStatus === 'inStock' ? 'green' : product.stockStatus === 'lowStock' ? 'yellow' : 'red'}-600">${product.stockStatus.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span></p>
                            ${product.isNew ? `<p><i class="fas fa-heart mr-2 text-red-500"></i> Status: <span class="font-semibold">New Arrival</span></p>` : ''}
                        </div>
                    </div>

                    <div class="mt-8">
                        <button class="w-full text-white font-bold py-3 rounded-xl transition-colors ripple-effect ${buttonClass}" 
                            onclick="addToCart(event, ${product.id})" ${buttonDisabled}>
                            ${buttonContent}
                        </button>
                    </div>
                </div>
            </div>

            <div id="reviewFormContainer" class="mt-12 pt-8 border-t border-border-color">
            </div>

            <div id="reviewsSection" class="mt-12 pt-8 border-t border-border-color">
                <h2 class="text-2xl font-bold mb-6 text-gray-900">Customer Reviews (${reviewCount})</h2>
                <div id="productReviewsList" class="space-y-4">
                    ${renderReviewsList(product.reviews)}
                </div>
            </div>
        `;

        renderReviewForm(productId);
        showSection('productDetail');
    }

    // Add to Cart
    function addToCart(event, productId) {
        event.stopPropagation();
        const productToAdd = products.find(p => p.id === productId);

        if (!productToAdd || productToAdd.stockStatus === 'soldOut') return;

        // --- 1. Perform Animation ---
        const button = event.currentTarget;
        const productCard = button.closest('.product-card') || button.closest('#productDetailContent');
        const imageElement = productCard.querySelector('img'); 

        if (imageElement) {
            const rect = imageElement.getBoundingClientRect();
            const flyingImage = imageElement.cloneNode();
            
            // Apply flying image styles
            flyingImage.classList.add('flying-image');
            Object.assign(flyingImage.style, { 
                top: `${rect.top}px`, 
                left: `${rect.left}px`, 
                width: `${rect.width}px`, 
                height: `${rect.height}px` 
            });
            document.body.appendChild(flyingImage);

            // Animate it towards the cart icon
            setTimeout(() => {
                const cartIconRect = cartCountElement.getBoundingClientRect();
                flyingImage.style.top = `${cartIconRect.top}px`;
                flyingImage.style.left = `${cartIconRect.left}px`;
                flyingImage.style.transform = 'scale(0.05)';
                flyingImage.style.opacity = '0';
            }, 10);

            // Cleanup and cart hit animation
            setTimeout(() => {
                flyingImage.remove();
                cartCountElement.closest('.tab-button').classList.add('cart-hit-animation');
                setTimeout(() => {
                    cartCountElement.closest('.tab-button').classList.remove('cart-hit-animation');
                }, 500);
            }, 800);
        }

        // --- 2. Update Cart Data and UI ---
        const existingItem = cartItems.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ ...productToAdd, quantity: 1 });
        }
        
        updateCartCount();
        showToast(`Added ${productToAdd.name} to cart.`, 'success', 2000);
    }

    // --- Filtering and Sorting ---
    function updatePriceLabel() {
        const sliderMax = 4000000;
        const sliderValue = parseFloat(maxPriceFilter.value); // Value from 1 to 1000
        const maxPrice = (sliderValue / 1000) * sliderMax; // Scale 1-1000 to 1 - 4M
        priceLabel.textContent = formatPrice(maxPrice);
        applyFiltersAndSort();
    }

    let activeQuickFilter = 'all';
    let activeQuickStatus = null;

    function applyQuickCategoryFilter(category) {
        activeQuickFilter = category;
        activeQuickStatus = null; // Clear status filter when category filter is used
        categoryFilter.value = category;
        applyFiltersAndSort();
    }
    
    function applyQuickStatusFilter(status) {
        activeQuickStatus = status;
        activeQuickFilter = 'all'; // Default to all categories for status filter
        categoryFilter.value = 'all';
        applyFiltersAndSort();
    }

    function applyFiltersAndSort() {
        const maxPriceSliderValue = parseFloat(maxPriceFilter.value);
        const sliderMax = 4000000;
        const maxPrice = (maxPriceSliderValue / 1000) * sliderMax;

        const selectedCategory = categoryFilter.value;
        const selectedSort = sortSelector.value;

        // Visual update for quick filters (Category buttons)
        document.querySelectorAll('#quickFilters button').forEach(btn => btn.classList.remove('active', 'bg-teal-600', 'text-white'));
        
        let activeBtnId = `filter-${activeQuickFilter}`;
        if (activeQuickStatus) {
            activeBtnId = `filter-${activeQuickStatus}`;
        }

        const activeCatBtn = document.getElementById(activeBtnId) || document.getElementById('filter-all');
        if (activeCatBtn) {
            activeCatBtn.classList.add('active');
            activeCatBtn.classList.add('bg-teal-600', 'text-white');
        }


        let filtered = products.filter(product => {
            const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
            const priceMatch = product.price <= maxPrice;
            
            let statusMatch = true;
            if (activeQuickStatus === 'new') {
                statusMatch = product.isNew;
            } else if (activeQuickStatus === '5star') {
                statusMatch = product.rating === 5.0;
            } else if (activeQuickStatus === 'under50') {
                statusMatch = product.price < 200000;
            }

            return categoryMatch && priceMatch && statusMatch;
        });

        // Sorting
        if (selectedSort === 'priceAsc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (selectedSort === 'priceDesc') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (selectedSort === 'ratingDesc') {
            filtered.sort((a, b) => b.rating - a.rating);
        }
        
        renderProducts(filtered);
    }

    // --- Cart Logic ---
    function saveCartToStorage() {
        localStorage.setItem('movinResellersCart', JSON.stringify(cartItems));
    }

    function loadCartFromStorage() {
        const savedCart = localStorage.getItem('movinResellersCart');
        if (savedCart) {
            cartItems = JSON.parse(savedCart);
        }
    }

    function calculateCartTotals() {
        let itemCount = 0;
        let subtotal = 0;
        cartItems.forEach(item => {
            itemCount += item.quantity;
            subtotal += item.price * item.quantity;
        });
        return { itemCount, subtotal, total: subtotal + SHIPPING_COST };
    }

    function updateCartCount() {
        const { itemCount, subtotal, total } = calculateCartTotals();
        cartCountElement.textContent = itemCount;

        // Update Cart Section Totals
        const subtotalEl = document.getElementById('cartSubtotal');
        const totalEl = document.getElementById('cartTotal');
        const itemCountDisplayEl = document.getElementById('cartItemCountDisplay');
        if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
        if (totalEl) totalEl.textContent = formatPrice(total);
        if (itemCountDisplayEl) itemCountDisplayEl.textContent = itemCount;

        saveCartToStorage();
        renderCartSummary(); // Added refresh for summary
    }

    function renderCart() {
        const cartList = document.getElementById('cartItemsList');
        const emptyMessage = document.getElementById('emptyCartMessage');
        if (!cartList || !emptyMessage) return;

        if (cartItems.length === 0) {
            cartList.innerHTML = '';
            emptyMessage.classList.remove('hidden');
            return;
        }

        emptyMessage.classList.add('hidden');
        
        cartList.innerHTML = cartItems.map(item => `
            <div class="flex items-center bg-secondary-bg p-4 rounded-xl shadow-md border border-border-color">
                <img src="${item.imageUrl || 'https://via.placeholder.com/60?text=No+Image'}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md mr-4">
                <div class="flex-grow">
                    <p class="font-bold text-lg">${item.name}</p>
                    <p class="text-teal-600 font-semibold">${formatPrice(item.price)}</p>
                </div>
                
                <div class="flex items-center space-x-3">
                    <button onclick="changeQuantity(${item.id}, -1)" class="text-gray-500 hover:text-teal-600 text-xl disabled:opacity-50 disabled:cursor-not-allowed" ${item.quantity <= 1 ? 'disabled' : ''}>
                        <i class="fas fa-minus-circle"></i>
                    </button>
                    <span class="font-bold">${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)" class="text-gray-500 hover:text-teal-600 text-xl">
                        <i class="fas fa-plus-circle"></i>
                    </button>
                </div>

                <div class="ml-6 w-24 text-right">
                    <p class="font-bold">${formatPrice(item.price * item.quantity)}</p>
                </div>

                <button onclick="removeItem(${item.id})" class="ml-4 text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    function changeQuantity(productId, delta) {
        const item = cartItems.find(i => i.id === productId);
        if (item) {
            item.quantity += delta;
            if (item.quantity < 1) {
                // If quantity drops below 1, remove the item
                removeItem(productId);
            } else {
                updateCartCount();
                renderCart();
            }
        }
    }

    function removeItem(productId) {
        cartItems = cartItems.filter(item => item.id !== productId);
        updateCartCount();
        renderCart();
        showToast("Item removed from cart.", 'info');
    }

    function renderCartSummary() {
        const { itemCount, total } = calculateCartTotals();
        const itemsContainer = document.getElementById('cartSummaryItems');
        document.getElementById('summaryItemCount').textContent = itemCount;
        document.getElementById('summaryTotal').textContent = formatPrice(total);

        if (cartItems.length === 0) {
            itemsContainer.innerHTML = '<p class="text-gray-500 italic">Your cart is empty.</p>';
            return;
        }

        itemsContainer.innerHTML = cartItems.slice(0, 3).map(item => `
            <div class="flex justify-between items-center">
                <span class="truncate pr-2">${item.quantity}x ${item.name}</span>
                <span class="font-medium">${formatPrice(item.price * item.quantity)}</span>
            </div>
        `).join('');

        if (cartItems.length > 3) {
            itemsContainer.innerHTML += `<p class="text-center text-xs text-teal-600 pt-1">+ ${cartItems.length - 3} more items</p>`;
        }
    }

    function showCartSummary() {
        if (!cartSummaryPopup) return;
        renderCartSummary();
        cartSummaryPopup.classList.remove('opacity-0', 'pointer-events-none');
        cartSummaryPopup.classList.add('opacity-100');
    }

    function hideCartSummary() {
        if (!cartSummaryPopup) return;
        setTimeout(() => {
            cartSummaryPopup.classList.remove('opacity-100');
            cartSummaryPopup.classList.add('opacity-0', 'pointer-events-none');
        }, 100);
    }

    // Checkout Logic
    function processCheckout() {
        if (cartItems.length === 0) {
            showToast("Your cart is empty! Add items before checking out.", 'info');
            return;
        }

        showLoader();

        setTimeout(() => {
            hideLoader();
            const { total } = calculateCartTotals();
            
            const newOrder = {
                id: `ORD-${Date.now().toString().slice(-6)}`,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                total: total,
                status: 'Shipped',
                items: JSON.parse(JSON.stringify(cartItems))
            };
            
            orderHistory.unshift(newOrder);
            
            cartItems = [];
            updateCartCount();
            renderCart();
            showSection('profile'); 
            renderProfile();

            showToast(`Checkout Successful! Your Order ${newOrder.id} has been placed.`, 'success', 5000);
        }, 1000);
    }

    // --- Profile Logic ---
    function saveUserDataToStorage() {
        try {
            localStorage.setItem('movinResellersUserData', JSON.stringify(userData));
        } catch (e) {
            console.error("Error saving user data to local storage:", e);
        }
    }

    function loadUserDataFromStorage() {
        try {
            const savedData = localStorage.getItem('movinResellersUserData');
            if (savedData) {
                const loadedData = JSON.parse(savedData);
                userData.name = loadedData.name;
                userData.email = loadedData.email;
                userData.address = loadedData.address;
            }
        } catch (e) {
             console.error("Error loading user data from local storage:", e);
        }
    }

    function renderProfile() {
        document.getElementById('profileName').textContent = userData.name.split(' ')[0];
        document.getElementById('profileNameDisplay').textContent = userData.name;
        document.getElementById('profileNameReadonly').textContent = userData.name;
        document.getElementById('profileMemberSinceReadonly').textContent = userData.memberSince;

        // Populate edit form
        document.getElementById('editProfileName').value = userData.name;
        document.getElementById('editProfileEmail').value = userData.email;
        document.getElementById('editProfileAddress').value = userData.address;

        renderOrderHistory();
    }

    function renderOrderHistory() {
        const ordersContainer = document.getElementById('orderHistoryList');
        if (!ordersContainer) return;

        if (orderHistory.length === 0) {
            ordersContainer.innerHTML = '<p class="text-gray-500">No past orders found.</p>';
            return;
        }

        let ordersHtml = '';
        orderHistory.forEach(order => {
            let statusClass = 'bg-gray-200 text-gray-700';
            if (order.status === 'Delivered') {
                statusClass = 'bg-green-100 text-green-800';
            } else if (order.status === 'Shipped') {
                statusClass = 'bg-blue-100 text-blue-800';
            } else if (order.status === 'Cancelled') {
                statusClass = 'bg-red-100 text-red-800';
            }

            ordersHtml += `
                <li class="flex justify-between items-center p-3 bg-white rounded-lg border border-border-color">
                    <div>
                        <p class="font-bold">${order.id}</p>
                        <p class="text-sm text-gray-500">${order.date}</p>
                        <p class="text-teal-600 font-semibold">${formatPrice(order.total)}</p>
                    </div>
                    <span class="${statusClass} text-xs font-medium px-3 py-1 rounded-full">${order.status}</span>
                </li>
            `;
        });
        ordersContainer.innerHTML = `<ul class="space-y-3">${ordersHtml}</ul>`;
    }

    function handleProfileSubmit(event) {
        event.preventDefault();
        
        const newName = document.getElementById('editProfileName').value.trim();
        const newEmail = document.getElementById('editProfileEmail').value.trim();
        const newAddress = document.getElementById('editProfileAddress').value.trim();

        userData.name = newName;
        userData.email = newEmail;
        userData.address = newAddress;

        saveUserDataToStorage();
        renderProfile();
        showToast('Profile updated successfully!', 'success');
    }

    // --- Search Logic ---
    function executeSearch() {
        const searchInput = document.getElementById('mainSearchInput');
        const query = searchInput.value.trim().toLowerCase();

        if (!query) {
            showToast("Please enter a search term.", 'info');
            return;
        }

        // 1. Filter Products
        const results = products.filter(product => {
            const name = product.name.toLowerCase();
            const category = product.category.toLowerCase();
            const description = product.description.toLowerCase();
            return name.includes(query) || category.includes(query) || description.includes(query);
        });

        // 2. Update the Results Section
        const gridContainer = document.getElementById('searchResultsGrid');
        document.getElementById('searchQueryDisplay').textContent = query;
        document.getElementById('searchResultCount').textContent = results.length;

        if (results.length > 0) {
            gridContainer.innerHTML = '';
            results.forEach(product => {
                const productCard = createProductCard(product);
                gridContainer.appendChild(productCard);
            });
        } else {
            gridContainer.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">
                Sorry, no products matched your search for "${query}".
            </p>`;
        }

        showSection('searchResults');
        searchInput.value = '';
    }

    // --- Admin Logic ---
    function checkAdminPersistence() {
        if (localStorage.getItem(ADMIN_TOKEN_KEY) === 'true') {
            adminLoginForm.classList.add('hidden');
            adminContent.classList.remove('hidden');
        } else {
            adminLoginForm.classList.remove('hidden');
            adminContent.classList.add('hidden');
        }
    }

    function attemptAdminLogin() {
        showLoader();
        setTimeout(() => {
            hideLoader();
            if (adminPasswordInput.value === ADMIN_PASSWORD) {
                localStorage.setItem(ADMIN_TOKEN_KEY, 'true');
                adminLoginForm.classList.add('hidden');
                adminContent.classList.remove('hidden');
                loginMessage.classList.add('hidden');
                showAdminDashboard();
                showToast('Login Successful! Welcome, Admin.', 'info');
            } else {
                localStorage.removeItem(ADMIN_TOKEN_KEY);
                loginMessage.classList.remove('hidden');
                adminPasswordInput.value = '';
                showToast('Incorrect Password. (Password is \'supersecret\')', 'error', 3000);
            }
        }, 500);
    }

    function adminLogout() {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        adminContent.classList.add('hidden');
        adminLoginForm.classList.remove('hidden');
        showToast('Logged out successfully.', 'info');
        showSection('home');
    }

    function switchAdminTab(tabId) {
        document.querySelectorAll('.admin-tab-content').forEach(el => el.classList.add('hidden'));
        document.getElementById(`admin${tabId.charAt(0).toUpperCase() + tabId.slice(1)}View`).classList.remove('hidden');
        
        document.querySelectorAll('.admin-tab-button').forEach(btn => btn.classList.remove('active', 'bg-teal-600', 'text-white'));
        document.getElementById(`tab-${tabId}`).classList.add('active', 'bg-teal-600', 'text-white');

        if (tabId === 'products') {
            renderAdminProductList();
        } else if (tabId === 'dashboard') {
            renderAdminDashboard();
        }
    }

    function renderAdminDashboard() {
        const metricsGrid = document.getElementById('metricsGrid');

        // Calculate Metrics
        const totalProducts = products.length;
        const outOfStock = products.filter(p => p.stockStatus === 'soldOut').length;
        const totalOrders = orderHistory.length;
        const totalRevenue = orderHistory.reduce((sum, order) => sum + order.total, 0);
        const avgRating = (products.reduce((sum, p) => sum + p.rating, 0) / totalProducts).toFixed(1);
        const totalReviews = products.reduce((sum, p) => sum + (p.reviews ? p.reviews.length : 0), 0);
        const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        const metrics = [
            { title: "Total Products", value: totalProducts, icon: "fas fa-box-open", color: "text-blue-500" },
            { title: "Total Orders", value: totalOrders, icon: "fas fa-clipboard-list", color: "text-purple-500" },
            { title: "Total Revenue", value: formatPrice(totalRevenue), icon: "fas fa-dollar-sign", color: "text-green-500" },
            { title: "Avg Product Rating", value: avgRating, icon: "fas fa-star", color: "text-yellow-500" },
            { title: "Customer Reviews", value: totalReviews, icon: "fas fa-comments", color: "text-teal-500" },
            { title: "Items In Cart", value: totalCartItems, icon: "fas fa-shopping-cart", color: "text-red-500" },
            { title: "Out of Stock", value: outOfStock, icon: "fas fa-times-circle", color: "text-red-500" },
        ];

        metricsGrid.innerHTML = metrics.map(metric => `
            <div class="bg-secondary-bg p-6 rounded-2xl shadow-lg border border-border-color transition-transform hover:shadow-xl">
                <div class="flex items-center justify-between">
                    <p class="text-sm font-semibold text-gray-500">${metric.title}</p>
                    <i class="${metric.icon} ${metric.color} text-2xl"></i>
                </div>
                <p class="text-3xl font-extrabold mt-3 ${metric.color}">${metric.value}</p>
            </div>
        `).join('');
    }

    // Admin Product Management (List, Edit, Delete)
    function renderAdminProductList() {
        const listContainer = document.getElementById('adminProductList');
        const adminSearchInput = document.getElementById('adminSearchInput');
        if (!listContainer) return;

        const searchQuery = adminSearchInput ? adminSearchInput.value.toLowerCase() : '';
        
        const filteredProducts = products.filter(product => {
            const name = product.name.toLowerCase();
            const id = product.id.toString();
            return name.includes(searchQuery) || id.includes(searchQuery);
        });

        listContainer.innerHTML = '';

        if (filteredProducts.length === 0) {
            listContainer.innerHTML = `<p class="text-center text-gray-500 py-6">No products match "${searchQuery}".</p>`;
            return;
        }

        filteredProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.id = `admin-product-${product.id}`;
            productItem.classList.add('flex', 'flex-col', 'sm:flex-row', 'justify-between', 'items-start', 'sm:items-center', 'bg-secondary-bg', 'p-4', 'rounded-xl', 'shadow-md', 'border', 'border-border-color');

            productItem.innerHTML = `
                <div class="flex items-center space-x-4 mb-3 sm:mb-0">
                    <img src="${product.imageUrl || 'https://via.placeholder.com/50?text=No+Image'}" alt="${product.name}" class="w-12 h-12 object-cover rounded-md">
                    <div>
                        <p class="font-bold text-lg">${product.name}</p>
                        <p class="text-sm text-gray-500">ID: ${product.id}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <p class="font-semibold text-teal-600">${formatPrice(product.price)}</p>
                    <button onclick="showEditModal(${product.id})" class="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteProduct(${product.id})" class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            listContainer.appendChild(productItem);
        });
    }

    function deleteProduct(productId) {
        if (confirm(`Are you sure you want to delete Product ID ${productId}? This action cannot be undone.`)) {
            products = products.filter(p => p.id !== productId);
            renderAdminProductList();
            applyFiltersAndSort(); // Refresh home page
            showToast(`Product ID ${productId} deleted successfully.`, 'success');
        }
    }

    function showAddProductModal() {
        const modalTitle = document.getElementById('editProductNameTitle');
        const form = document.getElementById('editProductForm');
        modalTitle.textContent = 'NEW Product';
        form.reset();
        document.getElementById('editProductId').value = 'NEW';
        document.querySelector('#editProductForm button[type="submit"]').innerHTML = '<i class="fas fa-plus-circle mr-2"></i> Create Product';
        document.getElementById('editImageUrl').value = ''; // Ensure image URL field is empty for new product
        editProductModal.style.display = 'flex';
    }

    function hideEditModal() {
        document.getElementById('editProductModal').style.display = 'none';
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        document.querySelectorAll('.error-text').forEach(el => el.remove());
    }

    function showEditModal(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) { showToast("Product not found!", 'error'); return; }

        document.querySelector('#editProductForm button[type="submit"]').innerHTML = '<i class="fas fa-save mr-2"></i> Save Changes';
        document.getElementById('editProductId').value = product.id;
        document.getElementById('editProductNameTitle').textContent = product.name;
        document.getElementById('editName').value = product.name;
        document.getElementById('editPrice').value = product.price; // Keep price as number for input field
        document.getElementById('editCategory').value = product.category;
        document.getElementById('editDescription').value = product.description;
        document.getElementById('editIsNew').checked = product.isNew;
        document.getElementById('editStockStatus').value = product.stockStatus;
        
        // START NEW CODE: Populate Image URL
        const defaultPlaceholder = 'https://via.placeholder.com/400?text=No+Image+Available';
        // Only show the URL if it's not the default placeholder or if it exists.
        document.getElementById('editImageUrl').value = (product.imageUrl && product.imageUrl !== defaultPlaceholder) ? product.imageUrl : ''; 
        // END NEW CODE

        editProductModal.style.display = 'flex';
    }

    function displayValidationError(inputElement, message) {
        inputElement.classList.add('input-error');
        const errorText = document.createElement('p');
        errorText.classList.add('error-text');
        errorText.textContent = message;
        inputElement.parentNode.appendChild(errorText);
    }

    function handleEditFormSubmit(event) {
        event.preventDefault();
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        document.querySelectorAll('.error-text').forEach(el => el.remove());
        let hasError = false;

        // Inputs for validation
        const nameInput = document.getElementById('editName');
        const priceInput = document.getElementById('editPrice');
        const descriptionInput = document.getElementById('editDescription');
        
        if (!nameInput.value.trim()) { displayValidationError(nameInput, 'Product name is required.'); hasError = true; }
        if (isNaN(parseFloat(priceInput.value)) || parseFloat(priceInput.value) <= 0) { displayValidationError(priceInput, 'Price must be a positive number.'); hasError = true; }
        if (descriptionInput.value.trim().length < 10) { displayValidationError(descriptionInput, 'Description must be at least 10 characters.'); hasError = true; }
        
        if (hasError) { showToast("Please fix the errors in the form.", 'error', 3000); return; }
        
        // --- 2. Collect Data ---
        const productId = document.getElementById('editProductId').value === 'NEW' ? generateUniqueId() : parseInt(document.getElementById('editProductId').value);
        const name = nameInput.value.trim();
        const price = parseFloat(priceInput.value);
        const category = document.getElementById('editCategory').value;
        const description = descriptionInput.value.trim();
        const isNew = document.getElementById('editIsNew').checked;
        const stockStatus = document.getElementById('editStockStatus').value;
        
        // START NEW CODE: Get Image URL
        const imageUrlInput = document.getElementById('editImageUrl');
        const imageUrl = imageUrlInput.value.trim() || 'https://via.placeholder.com/400?text=No+Image+Available'; // Placeholder URL
        // END NEW CODE

        const existingProduct = products.find(p => p.id === productId);
        
        const product = {
            id: productId,
            name,
            description,
            price,
            category,
            isNew,
            stockStatus,
            imageUrl: imageUrl, // NEW PROPERTY: Use the new imageUrl
            rating: existingProduct ? existingProduct.rating : 5.0, 
            reviews: existingProduct ? existingProduct.reviews : []
        };
        
        // --- 3. Save Data ---
        if (document.getElementById('editProductId').value === 'NEW') {
            products.push(product);
            showToast(`Product '${product.name}' created successfully.`, 'success');
        } else {
            const index = products.findIndex(p => p.id === productId);
            if (index !== -1) {
                products[index] = product;
                showToast(`Product '${product.name}' updated successfully.`, 'success');
            }
        }
        
        hideEditModal();
        renderAdminProductList();
        applyFiltersAndSort();
    }


    // --- Initialization ---
    document.addEventListener('DOMContentLoaded', () => {
        // Load data from storage
        loadCartFromStorage();
        loadUserDataFromStorage();
        checkAdminPersistence();
        
        // Set initial theme
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun', 'text-yellow-500');
        }

        // Apply initial filters/sort and render products
        applyFiltersAndSort(); 
        
        // Set up ripple effects
        document.querySelectorAll('.ripple-effect').forEach(button => {
            button.addEventListener('click', createRipple);
        });

        // Attach event listeners for forms/buttons
        if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
        if (adminLoginButton) adminLoginButton.addEventListener('click', attemptAdminLogin);
        if (adminPasswordInput) adminPasswordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') attemptAdminLogin();
        });
        if (editProductForm) editProductForm.addEventListener('submit', handleEditFormSubmit);
        const profileEditForm = document.getElementById('profileEditForm');
        if (profileEditForm) profileEditForm.addEventListener('submit', handleProfileSubmit);

        // Update the main filter UI
        // NOTE: The initial call to applyFiltersAndSort above calls updatePriceLabel() internally.

        // Default to home view if no hash is present
        if (!window.location.hash) {
            showSection('home');
        }
    });

    // Ensure cart update also refreshes summary
    const originalUpdateCartCount = updateCartCount;
    updateCartCount = function() {
        originalUpdateCartCount();
        renderCartSummary(); 
    };

    // Ensure showSection updates admin state correctly
    const originalShowSection = showSection;
    showSection = function(sectionId) {
        if (sectionId === 'admin') {
            if (localStorage.getItem(ADMIN_TOKEN_KEY) === 'true') {
                 showAdminDashboard();
            }
        }
        originalShowSection(sectionId);
    };
</script>
</body>
</html>
