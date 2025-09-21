import React, { useState } from 'react';

const sampleCategories = [
  { id: 1, name: 'Groceries', emoji: '🛒' },
  { id: 2, name: 'Electronics', emoji: '🔌' },
  { id: 3, name: 'Fashion', emoji: '👟' },
  { id: 4, name: 'Home', emoji: '🏠' },
];

const sampleProducts = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  price: (Math.random() * 500).toFixed(2),
  desc: 'Short product description that fits two lines.',
}));

function Nav({ onNav }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-teal-600">LocalMart</div>
            <nav className="hidden md:flex gap-3 text-sm text-gray-600">
              <button onClick={() => onNav('home')} className="px-3 py-2 rounded-md hover:bg-gray-100">Home</button>
              <button onClick={() => onNav('customer')} className="px-3 py-2 rounded-md hover:bg-gray-100">Customer</button>
              <button onClick={() => onNav('vendor')} className="px-3 py-2 rounded-md hover:bg-gray-100">Vendor</button>
              <button onClick={() => onNav('admin')} className="px-3 py-2 rounded-md hover:bg-gray-100">Admin</button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <input placeholder="Search products or stores" className="w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200" />
            </div>
            <button onClick={() => onNav('auth')} className="px-4 py-2 bg-teal-600 text-white rounded-md shadow-sm hover:opacity-95">Sign in</button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-to-r from-white via-white to-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Shop local, save time — LocalMart</h1>
            <p className="mt-4 text-gray-600 max-w-md">Discover products from nearby vendors. Fast delivery, great prices, and local support.</p>
            <div className="mt-6">
              <div className="flex gap-3">
                <input className="px-4 py-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-teal-200" placeholder="Search for products, stores..." />
                <button className="px-6 py-3 bg-teal-600 text-white rounded-lg">Search</button>
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              {sampleCategories.map((c) => (
                <div key={c.id} className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="text-3xl">{c.emoji}</div>
                  <div className="mt-3 font-semibold">{c.name}</div>
                  <div className="mt-2 text-xs text-gray-500">Explore fresh picks</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AuthTabs() {
  const [tab, setTab] = useState('customer');
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 mt-8">
      <div className="flex gap-2 rounded-lg bg-gray-50 p-1">
        <button onClick={() => setTab('customer')} className={`flex-1 py-2 rounded-lg ${tab === 'customer' ? 'bg-white shadow' : 'text-gray-600'}`}>Customer</button>
        <button onClick={() => setTab('vendor')} className={`flex-1 py-2 rounded-lg ${tab === 'vendor' ? 'bg-white shadow' : 'text-gray-600'}`}>Vendor</button>
        <button onClick={() => setTab('admin')} className={`flex-1 py-2 rounded-lg ${tab === 'admin' ? 'bg-white shadow' : 'text-gray-600'}`}>Admin</button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <h3 className="text-lg font-medium">{tab === 'customer' ? 'Customer Login' : tab === 'vendor' ? 'Vendor Login' : 'Admin Login'}</h3>
          <p className="mt-2 text-sm text-gray-500">Use your credentials to sign in.</p>

          <form className="mt-4 space-y-3">
            <input className="w-full px-3 py-2 border rounded-md" placeholder="Email" />
            <input className="w-full px-3 py-2 border rounded-md" placeholder="Password" type="password" />
            <button className="w-full py-2 bg-teal-600 text-white rounded-md">Sign In</button>
          </form>
        </div>

        <div className="col-span-1 bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold">New here?</h4>
          <p className="text-sm text-gray-600 mt-2">Create an account tailored to your role.</p>
          <div className="mt-4">
            <button className="px-4 py-2 rounded-md border">Create {tab === 'customer' ? 'Customer' : tab === 'vendor' ? 'Vendor' : 'Admin'} account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition-shadow">
      <div className="h-36 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">📦</div>
      <div className="mt-3">
        <h4 className="font-semibold">{product.title}</h4>
        <p className="mt-1 text-sm text-gray-500">{product.desc}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="font-bold">₹ {product.price}</div>
          <button onClick={() => onAdd(product)} className="px-3 py-1 bg-teal-600 text-white rounded-md">Add</button>
        </div>
      </div>
    </div>
  );
}

function CustomerDashboard({ onAddToCart }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Products</h2>
          <div className="text-sm text-gray-500">Showing popular picks</div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProducts.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
          ))}
        </div>
      </div>

      <aside className="bg-white rounded-2xl shadow p-4">
        <h3 className="font-semibold">Cart</h3>
        <p className="text-sm text-gray-500 mt-2">Items you added will appear here.</p>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-700">
            <div>Subtotal</div>
            <div>₹ 0.00</div>
          </div>
          <button className="w-full py-2 bg-teal-600 text-white rounded-md">Checkout</button>
        </div>
      </aside>
    </div>
  );
}

function VendorDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-white rounded-2xl shadow p-6">
        <h3 className="font-semibold">Store Profile</h3>
        <div className="mt-4">
          <div className="h-28 w-full bg-gray-100 rounded-lg flex items-center justify-center">Store Image</div>
          <div className="mt-3">
            <div className="font-semibold">My Local Store</div>
            <div className="text-sm text-gray-500">Charming store description here</div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Products (Manage)</h3>
          <button className="px-3 py-2 border rounded-md">Add Product</button>
        </div>

        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Product</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Stock</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {sampleProducts.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-3 text-sm">{p.title}</td>
                    <td className="px-4 py-3 text-sm">₹ {p.price}</td>
                    <td className="px-4 py-3 text-sm">{Math.floor(Math.random() * 20)}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button className="px-2 py-1 border rounded-md text-sm">Edit</button>
                        <button className="px-2 py-1 border rounded-md text-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h4 className="font-semibold">Users</h4>
        <p className="mt-2 text-sm text-gray-500">Manage registered customers</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h4 className="font-semibold">Vendors</h4>
        <p className="mt-2 text-sm text-gray-500">Manage store owners</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h4 className="font-semibold">Orders</h4>
        <p className="mt-2 text-sm text-gray-500">Monitor and update order statuses</p>
      </div>

      <div className="md:col-span-3 mt-6 bg-white rounded-2xl shadow p-6">
        <h4 className="font-semibold">Activity Feed</h4>
        <div className="mt-3 text-sm text-gray-600">Recent actions, logs and important notifications appear here.</div>
      </div>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState('home');
  const [cart, setCart] = useState([]);

  function handleAddToCart(product) {
    setCart((c) => [...c, product]);
    // lightweight toast
    console.log('added', product);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Nav onNav={setRoute} />

      <main>
        {route === 'home' && (
          <>
            <Hero />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h3 className="text-lg font-semibold">Trending Categories</h3>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {sampleCategories.map((c) => (
                  <div key={c.id} className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition-shadow text-center">
                    <div className="text-3xl">{c.emoji}</div>
                    <div className="mt-2 font-semibold">{c.name}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h3 className="text-lg font-semibold">Popular Products</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleProducts.slice(0, 6).map((p) => (
                  <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
                ))}
              </div>
            </section>
          </>
        )}

        {route === 'auth' && (
          <div className="py-12">
            <AuthTabs />
          </div>
        )}

        {route === 'customer' && (
          <CustomerDashboard onAddToCart={handleAddToCart} />
        )}

        {route === 'vendor' && <VendorDashboard />}

        {route === 'admin' && <AdminDashboard />}
      </main>

      <footer className="mt-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-500">© {new Date().getFullYear()} LocalMart — Prototype UI</div>
      </footer>
    </div>
  );
}
