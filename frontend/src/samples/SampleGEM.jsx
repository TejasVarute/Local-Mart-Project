import React, { useState, useEffect } from 'react';
import { ShoppingBasket, Smartphone, Shirt, Home, Search, Star, Package, ShoppingCart, Plus, Edit2, Trash2, Users, Store } from 'lucide-react';

// Helper data for dynamic rendering (in a real app, this would come from an API)
const categories = [
    { name: 'Groceries', icon: <ShoppingBasket size={32} />, description: 'Fresh produce, dairy, and pantry staples.' },
    { name: 'Electronics', icon: <Smartphone size={32} />, description: 'Gadgets, accessories, and home appliances.' },
    { name: 'Fashion', icon: <Shirt size={32} />, description: 'Latest trends in clothing, shoes, and more.' },
    { name: 'Home Goods', icon: <Home size={32} />, description: 'Decor, furniture, and kitchen essentials.' },
    { name: 'Electronics', icon: <Smartphone size={32} />, description: 'Gadgets, accessories, and home appliances.' },
    { name: 'Fashion', icon: <Shirt size={32} />, description: 'Latest trends in clothing, shoes, and more.' },
    { name: 'Home Goods', icon: <Home size={32} />, description: 'Decor, furniture, and kitchen essentials.' },
    { name: 'Groceries', icon: <ShoppingBasket size={32} />, description: 'Fresh produce, dairy, and pantry staples.' },
];

const products = [
    { name: 'Organic Avocados', store: 'From Local Farm Co.', price: '$5.99', image: 'https://placehold.co/600x400/a7f3d0/134e4a?text=Produce' },
    { name: 'Wireless Headphones', store: 'From Techtronics', price: '$89.99', image: 'https://placehold.co/600x400/bae6fd/0c4a6e?text=Gadget' },
    { name: 'Linen Throw Pillow', store: 'From Home Comforts', price: '$24.50', image: 'https://placehold.co/600x400/fef08a/854d0e?text=Home+Decor' },
    { name: 'Artisan Sourdough', store: 'From The Bake House', price: '$7.00', image: 'https://placehold.co/600x400/fed7aa/9a3412?text=Bakery' },
    { name: 'Summer T-Shirt', store: 'From Urban Threads', price: '$19.99', image: 'https://placehold.co/600x400/fbcfe8/831843?text=Fashion' },
    { name: 'Smart Coffee Maker', store: 'From BrewTech', price: '$120.00', image: 'https://placehold.co/600x400/d1d5db/1f2937?text=Appliance' },
    { name: 'Organic Avocados', store: 'From Local Farm Co.', price: '$5.99', image: 'https://placehold.co/600x400/a7f3d0/134e4a?text=Produce' },
    { name: 'Wireless Headphones', store: 'From Techtronics', price: '$89.99', image: 'https://placehold.co/600x400/bae6fd/0c4a6e?text=Gadget' },
    { name: 'Linen Throw Pillow', store: 'From Home Comforts', price: '$24.50', image: 'https://placehold.co/600x400/fef08a/854d0e?text=Home+Decor' },
    { name: 'Artisan Sourdough', store: 'From The Bake House', price: '$7.00', image: 'https://placehold.co/600x400/fed7aa/9a3412?text=Bakery' },
    { name: 'Summer T-Shirt', store: 'From Urban Threads', price: '$19.99', image: 'https://placehold.co/600x400/fbcfe8/831843?text=Fashion' },
    { name: 'Smart Coffee Maker', store: 'From BrewTech', price: '$120.00', image: 'https://placehold.co/600x400/d1d5db/1f2937?text=Appliance' },
    { name: 'Organic Avocados', store: 'From Local Farm Co.', price: '$5.99', image: 'https://placehold.co/600x400/a7f3d0/134e4a?text=Produce' },
    { name: 'Wireless Headphones', store: 'From Techtronics', price: '$89.99', image: 'https://placehold.co/600x400/bae6fd/0c4a6e?text=Gadget' },
    { name: 'Linen Throw Pillow', store: 'From Home Comforts', price: '$24.50', image: 'https://placehold.co/600x400/fef08a/854d0e?text=Home+Decor' },
    { name: 'Artisan Sourdough', store: 'From The Bake House', price: '$7.00', image: 'https://placehold.co/600x400/fed7aa/9a3412?text=Bakery' },
    { name: 'Summer T-Shirt', store: 'From Urban Threads', price: '$19.99', image: 'https://placehold.co/600x400/fbcfe8/831843?text=Fashion' },
    { name: 'Smart Coffee Maker', store: 'From BrewTech', price: '$120.00', image: 'https://placehold.co/600x400/d1d5db/1f2937?text=Appliance' },
];

const vendorProducts = [
    { name: 'Organic Avocados', sku: 'GRO-AVO-01', price: '$5.99', stock: 150, status: 'Active' },
    { name: 'Artisan Sourdough', sku: 'BAK-SD-05', price: '$7.00', stock: 45, status: 'Active' },
    { name: 'Free-Range Eggs', sku: 'DAI-EGG-02', price: '$4.50', stock: 0, status: 'Out of Stock' },
];

// --- Reusable Components ---

const CategoryCard = ({ icon, name, description }) => (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <div className="bg-sky-100 text-sky-600 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-slate-500">{description}</p>
    </div>
);

const ProductCard = ({ name, store, price, image }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden group">
        <div className="relative">
            <img src={image} alt={name} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-opacity">
                <button className="bg-sky-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-sky-600 transition">Add to Cart</button>
            </div>
        </div>
        <div className="p-5">
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-slate-500">{store}</p>
            <p className="text-xl font-bold text-sky-600 mt-2">{price}</p>
        </div>
    </div>
);

const AdminStatCard = ({ icon, title, value, description, buttonText }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
            <div className="bg-sky-100 text-sky-600 rounded-lg p-3">
                {icon}
            </div>
            <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <p className="text-4xl font-bold">{value}</p>
        <p className="text-slate-500">{description}</p>
        <button className="mt-4 w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg transition">{buttonText}</button>
    </div>
);


// --- Page Components ---

const Header = ({setPage}) => {
    const [active, setActive] = useState("landing");

    const activeClassStyle = (now) => 
        `transition ${active === now ? 'text-sky-600' : 'text-slate-600'}`;

    return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-2 py-5 flex justify-evenly items-center">
            <a href="#" onClick={() => setPage('landing')} className="flex items-center space-x-2 text-2xl font-bold text-slate-800">
                <Package className="text-sky-600" />
                <span>Local Mart</span>
            </a>
            <div className="hidden md:flex items-center space-x-6">
                <div className='hidden sm:block md:w-fit xl:w-4xl mx-auto'>
                    <input placeholder="Search products or stores" className="sm:w-full px-3 py-2 border rounded-4xl focus:outline-none border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-sky-500 hover:border-2 outline-none transition shadow-sm" />
                </div>
                <span className='w-20 md:w-0'></span>
                <a href="#" onClick={() => {setPage('landing'); setActive("landing")}} className={activeClassStyle("landing")}>Home</a>
                <a href="#" onClick={() => {setPage('customer-dashboard'); setActive("customer-dashboard")}} className={activeClassStyle("customer-dashboard")}>Cart</a>
                <a href="#" onClick={() => {setPage('vendor-dashboard'); setActive("vendor-dashboard")}} className={activeClassStyle("vendor-dashboard")}>Vendor</a>
                <a href="#" onClick={() => {setPage('admin-dashboard'); setActive("admin-dashboard")}} className={activeClassStyle("admin-dashboard")}>Admin</a>
            </div>
            <div>
                <button onClick={() => {setPage('login'); setActive("login")}} className={`bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-600 transition shadow-sm ${activeClassStyle("login")}`}>
                    Login / Sign Up
                </button>
            </div>
        </nav>
    </header>
)};

const LandingPage = () => (
    <section>
        {/* Hero Section */}
        <div className="bg-white">
            <div className="container mx-auto px-6 py-24 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">Your Local Market, Online.</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">Find everything you need from local stores, delivered right to your doorstep.</p>
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <input type="search" placeholder="Search for products, stores, or categories..." className="w-full py-4 pl-12 pr-4 text-lg border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition shadow-sm" />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                    </div>
                </div>
            </div>
        </div>
        {/* Categories Section */}
        <div className="container mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">Browse by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map(category => <CategoryCard key={category.name} {...category} />)}
            </div>
        </div>
    </section>
);

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState('customer');

    const getTabClassName = (tabName) =>
        // `flex-1 py-3 text-lg font-semibold text-slate-500 border-b-2 border-transparent transition-all duration-300 ${activeTab === tabName ? 'text-sky-600 border-sky-600' : 'text-gray-600'}`;
    `flex-1 py-2 rounded-lg ${activeTab === tabName ? 'bg-white shadow' : 'text-gray-600'}`;

    return (
        <section className="py-20 h-max">
            <div className="container mx-auto px-6">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-8">
                        {/* Tabs */}
                        <div className="flex border-b border-slate-200 mb-8 bg-gray-50 p-1">
                            <button className={getTabClassName('customer')} onClick={() => setActiveTab('customer')}>Customer</button>
                            <button className={getTabClassName('vendor')} onClick={() => setActiveTab('vendor')}>Vendor</button>
                            <button className={getTabClassName('admin')} onClick={() => setActiveTab('admin')}>Admin</button>
                        </div>

                        {/* Customer Tab Content */}
                        {activeTab === 'customer' && (
                            <div id="customer" className="tab-content active">
                                <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Welcome Back!</h2>
                                <p className="text-slate-500 mb-6 text-center">Sign in to continue to Local Mart.</p>
                                <form className="space-y-6">
                                    <div>
                                        <label for="c-email" className="block text-sm font-medium text-slate-700">Email Address</label>
                                        <input type="email" id="c-email" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
                                    </div>
                                    <div>
                                        <label for="c-password" className="block text-sm font-medium text-slate-700">Password</label>
                                        <input type="password" id="c-password" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <a href="#" className="text-sm text-sky-600 hover:underline">Forgot your password?</a>
                                    </div>
                                    <div>
                                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Sign In</button>
                                    </div>
                                    <p className="text-sm text-center text-slate-500">Don't have an account? <a href="#" className="font-medium text-sky-600 hover:underline">Sign Up</a></p>
                                </form>
                            </div>
                        )}

                        {/* Vendor Tab Content */}
                        {activeTab === 'vendor' && (
                            <div id="vendor" className="tab-content">
                                <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Vendor Portal</h2>
                                <p className="text-slate-500 mb-6 text-center">Access your store dashboard.</p>
                                <form className="space-y-6">
                                    <div>
                                        <label for="v-email" className="block text-sm font-medium text-slate-700">Vendor Email</label>
                                        <input type="email" id="v-email" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
                                    </div>
                                    <div>
                                        <label for="v-password" className="block text-sm font-medium text-slate-700">Password</label>
                                        <input type="password" id="v-password" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
                                    </div>
                                    <div>
                                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Sign In</button>
                                    </div>
                                    <p className="text-sm text-center text-slate-500">Want to sell on Local Mart? <a href="#" className="font-medium text-sky-600 hover:underline">Register Here</a></p>
                                </form>
                            </div>
                        )}

                        {/* Admin Tab Content */}
                        {activeTab === 'admin' && (
                            <div id="admin" className="tab-content">
                                <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Admin Access</h2>
                                <p className="text-slate-500 mb-6 text-center">Please enter your credentials.</p>
                                <form className="space-y-6">
                                    <div>
                                        <label for="a-email" className="block text-sm font-medium text-slate-700">Admin Username</label>
                                        <input type="text" id="a-username" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
                                    </div>
                                    <div>
                                        <label for="a-password" className="block text-sm font-medium text-slate-700">Password</label>
                                        <input type="password" id="a-password" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
                                    </div>
                                    <div>
                                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Login</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};


const CustomerDashboard = () => (
    <section className="py-12">
        <div className="container mx-auto px-6">
            <div className="lg:flex lg:space-x-8">
                {/* Main Content - Products Grid */}
                <div className="lg:w-3/4">
                    <h1 className="text-3xl font-bold text-slate-800 mb-6">Products For You</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {products.map(product => <ProductCard key={product.name} {...product} />)}
                    </div>
                </div>

                {/* Cart Sidebar */}
                <aside className="lg:w-1/4 mt-12 lg:mt-0">
                    <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                        <h2 className="text-xl font-bold border-b pb-4 mb-4">Your Cart</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div><p className="font-semibold">Organic Avocados</p><p className="text-sm text-slate-500">Qty: 1</p></div>
                                <p className="font-semibold">$5.99</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div><p className="font-semibold">Wireless Headphones</p><p className="text-sm text-slate-500">Qty: 1</p></div>
                                <p className="font-semibold">$89.99</p>
                            </div>
                        </div>
                        <div className="border-t mt-6 pt-4">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Subtotal</span><span>$95.98</span>
                            </div>
                            <button className="w-full bg-sky-600 text-white py-3 rounded-lg mt-4 font-semibold hover:bg-sky-700 transition">Checkout</button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </section>
);

const VendorDashboard = () => (
    <section className="py-12">
        <div className="container mx-auto px-6">
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Vendor Dashboard</h1>

            {/* Store Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 flex items-center space-x-8">
                <img src="https://placehold.co/128x128/0ea5e9/ffffff?text=Logo" alt="Store Logo" className="w-32 h-32 rounded-full border-4 border-slate-100" />
                <div>
                    <h2 className="text-3xl font-bold">Local Farm Co.</h2>
                    <p className="text-slate-500 mt-1">Your trusted source for fresh, organic produce.</p>
                    <div className="flex space-x-6 mt-4 text-slate-600">
                        <div className="flex items-center space-x-2"><Star className="text-amber-400" /> <span>4.8 Rating</span></div>
                        <div className="flex items-center space-x-2"><Package className="text-sky-500" /> <span>124 Active Products</span></div>
                        <div className="flex items-center space-x-2"><ShoppingCart className="text-green-500" /> <span>582 Orders this month</span></div>
                    </div>
                </div>
            </div>

            {/* Product Management Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 flex justify-between items-center border-b">
                    <h3 className="text-xl font-bold">Manage Products</h3>
                    <button className="bg-sky-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-sky-600 transition shadow-sm flex items-center space-x-2">
                        <Plus size={20} /><span>Add New Product</span>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 font-semibold text-sm text-slate-600">Product Name</th>
                                <th className="p-4 font-semibold text-sm text-slate-600">SKU</th>
                                <th className="p-4 font-semibold text-sm text-slate-600">Price</th>
                                <th className="p-4 font-semibold text-sm text-slate-600">Stock</th>
                                <th className="p-4 font-semibold text-sm text-slate-600">Status</th>
                                <th className="p-4 font-semibold text-sm text-slate-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {vendorProducts.map(p => (
                                <tr key={p.sku} className="hover:bg-slate-50">
                                    <td className="p-4">{p.name}</td>
                                    <td className="p-4 text-slate-500">{p.sku}</td>
                                    <td className="p-4 font-medium">{p.price}</td>
                                    <td className="p-4">{p.stock}</td>
                                    <td className="p-4">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{p.status}</span>
                                    </td>
                                    <td className="p-4 flex space-x-2">
                                        <button className="text-slate-500 hover:text-sky-600"><Edit2 size={20} /></button>
                                        <button className="text-slate-500 hover:text-red-600"><Trash2 size={20} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
);


const AdminDashboard = () => (
    <section className="py-12">
        <div className="container mx-auto px-6">
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AdminStatCard icon={<Users size={24} />} title="Manage Users" value="1,254" description="Total Active Customers" buttonText="View All Users" />
                <AdminStatCard icon={<Store size={24} />} title="Manage Vendors" value="87" description="Total Active Vendors" buttonText="View All Vendors" />
                <AdminStatCard icon={<ShoppingCart size={24} />} title="Manage Orders" value="3,490" description="Total Orders This Month" buttonText="View All Orders" />
            </div>
        </div>
    </section>
);

// --- Main App Component ---
export default function App() {
    const [page, setPage] = useState('landing');

    const renderPage = () => {
        switch (page) {
            case 'login':
                return <LoginPage />;
            case 'customer-dashboard':
                return <CustomerDashboard />;
            case 'vendor-dashboard':
                return <VendorDashboard />;
            case 'admin-dashboard':
                return <AdminDashboard />;
            case 'landing':
            default:
                return <LandingPage />;
        }
    };

    return (
        <div className="text-slate-800" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8fafc' }}>
            <Header setPage={ setPage } />
            <main>
                {renderPage()}
            </main>
        </div>
    );
}
