import { Link } from "react-router-dom"
import { UserRoundPen, Heart, ShoppingCart } from "lucide-react"

const Header = ({ isDisable=false, isLogin=false, isLogout=false }) => {
  return (
  <header className='top-0 z-50 sticky transition drop-shadow-md shadow backdrop-blur-xl border-b border-slate-200 select-none'>
    <nav className='container mx-auto px-5 py-3 sm:py-4 md:py-5 xl:py-7 flex items-center justify-between'>
    <Link to="/customer/dashboard" className='text-2xl font-semibold text-center tracking-wide hover:text-slate-700' href="">Local Mart</Link>
      <div className='hidden md:flex items-center gap-10'>
        <div className='hidden sm:block lg:w-96 xl:w-4xl mx-auto'>
          <input className={`w-full px-5 py-2 rounded-full text-gray-800 outline-none transition border-t border-b border-slate-100 hover:border-slate-200 focus:shadow-custom-shadow focus:font-semibold  ${isDisable ? "hidden" : ""}`} placeholder='Search Product Here' />
        </div>
        <div className='xl:w-96 flex gap-15 md:gap-7 justify-end items-center'>
          <Link to="/customer/user" className={`text-gray-600 font-bold text-xl pl-5 pr-5 p-1.5 rounded-2xl border-b border-t border-slate-100 hover:text-gray-900 hover:shadow-custom-shadow transition ${isDisable ? "hidden" : ""}`}><UserRoundPen size="26" /></Link>
          <Link to="/customer/wishlist" className={`text-gray-600 font-bold text-xl pl-5 pr-5 p-1.5 rounded-2xl border-b border-t border-slate-100 hover:text-gray-900 hover:shadow-custom-shadow transition ${isDisable ? "hidden" : ""}`}><Heart size="26" /></Link>
          <Link to="/customer/cart" className={`text-gray-600 font-bold text-xl pl-5 pr-5 p-1.5 rounded-2xl border-b border-t border-slate-100 hover:text-gray-900 hover:shadow-custom-shadow transition ${isDisable ? "hidden" : ""}`}><ShoppingCart size="26" /></Link>
          <Link to="/customer/login" className={`text-gray-600 font-bold text-xl pl-5 pr-5 p-1.5 rounded-2xl border-b border-t border-slate-100 hover:text-gray-900 hover:shadow-custom-shadow transition ${isLogin ? "" : "hidden"}`}>Login</Link>
          <Link to="/logout" className={`text-gray-600 font-bold text-xl pl-5 pr-5 p-1.5 rounded-2xl border-b border-t border-slate-100 hover:text-gray-900 hover:shadow-custom-shadow transition ${isLogout ? "" : "hidden"}`}>Logout</Link>
        </div>
    </div>
    </nav>
  </header>
)
}

export default Header