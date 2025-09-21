import { useState, useEffect } from 'react'
import Header from '../components/Header'
import api from '../api'
import { ACCESS_TOKEN } from '../constants'
import { Star, Package, ShoppingCart, Plus, Edit, Trash2 } from 'lucide-react'

const Dashboard = ({ products }) => {
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const store_name = localStorage.getItem("store_name");
  const store_type = localStorage.getItem("store_type");

  return (
  <>
    <section className='w-full'>
      <div className='container mx-auto p-6 backdrop-blur-md shadow border-t border-b border-slate-100 mt-5 rounded-2xl'>
        <h1 className='text-5xl p-10 text-center backdrop-blur-2xl rounded-2xl shadow-md border-t border-b border-slate-100'>Welcome ! {first_name} {last_name}</h1>

        <div className='lg:flex gap-4 mt-5 '>
          <div className='backdrop-blur-2xl rounded-2xl shadow-md mt-5 p-5 border-t border-b border-slate-100'>
            <div className='p-5 space-y-5'>
              <div className='p-2 space-y-1'>
                <h2 className='text-4xl font-bold tracking-wide'>{store_name}</h2>
                <p className='text-xl mt-2 tracking-wider'>{store_type} </p>
              </div>
              <div className='gap-5 space-y-3'>
                <div className="flex items-center space-x-3 p-2"><Star className="text-amber-400" /> <span>4.8 Rating</span></div>
                <div className="flex items-center space-x-3 p-2"><Package className="text-sky-500" /> <span>124 Active Products</span></div>
                <div className="flex items-center space-x-3 p-2"><ShoppingCart className="text-green-500" /> <span>582 Orders this month</span></div>
              </div>
            </div>
          </div>

          <div className='rounded-2xl shadow-md mt-5 w-full table-h border-t border-b border-slate-100 backdrop-blur-2xl'>
            <div className='p-6 flex justify-between items-center border-b'>
              <h3 className='text-xl font-semibold'>Manage Products</h3>
              <button className=' text-white px-5 py-2 outline-0 rounded-xl font-extrabold flex space-x-2 border-t border-b border-slate-100 hover:shadow-custom-shadow'>
                <Plus size={22} /><span>Add New Product</span>
              </button>
            </div>

            <div className="overflow-x-scroll">
              <table className="w-full text-left text-lg">
                <thead className='border-b-2'>
                  <tr>
                    <th className='p-4 font-semibold'>Product Name</th>
                    <th className='p-4 font-semibold'>Discription</th>
                    <th className='p-4 font-semibold'>Stock</th>
                    <th className='p-4 font-semibold'>Price</th>
                    <th className='p-4 font-semibold'>Status</th>
                    <th className='p-4 font-semibold'>Edit</th>
                  </tr>
                </thead>
                <tbody className='divide-y'>
                  {products.map(prod => (
                    <tr key={prod.product_name} className='hover:bg-slate-100'>
                      <td className='p-4'>{prod.product_name}</td>
                      <td className='p-4'>{prod.discription}</td>
                      <td className='p-4'>{prod.stock}</td>
                      <td className='p-4'>{prod.price}</td>
                      <td className='p-4'>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${prod.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} `}>{prod.status}</span>
                      </td>
                      <td className="p-4 flex space-x-2">
                        <button className="text-slate-500 hover:text-sky-600 shadow"><Edit size={20} /></button>
                        <button className="text-slate-500 hover:text-red-600"><Trash2 size={20} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)}

const VendorDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchVendorProducts = async () => {
      try {
        const product_res = await api.get("/api/store/products/");
        setProducts(product_res.data);
      } catch (err) {
        alert("Having Error", err);
      }
    }
    fetchVendorProducts();
  }, [])
  useEffect(() => {
    const fetchVendorProducts = async () => {
      try {
        const details_res = await api.get("api/vendor/details/", {ACCESS_TOKEN});

        localStorage.setItem("first_name", details_res.data.first_name);
        localStorage.setItem("last_name", details_res.data.last_name);
        localStorage.setItem("store_name", details_res.data.store_name);
        localStorage.setItem("store_type", details_res.data.store_type);
      } catch (err) {
        alert("Having Error: " + err);
      }
    };

    fetchVendorProducts();
  }, []);

  return (
    <>
      <Header isDisable={ true } isLogout = { true } />
      <Dashboard products={ products } />
    </>
  )
}

export default VendorDashboard