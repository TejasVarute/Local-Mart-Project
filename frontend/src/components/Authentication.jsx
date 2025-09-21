import { useState, useEffect } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { motion, AnimatePresence } from "framer-motion"
import Header from './Header'

const Authentication = ({ route, role, navRoute="customer/dashboard" }) => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [store_name, setStoreName] = useState("");
    const [store_type, setStoreType] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");

    const [storeTypes, setStoreTypes] = useState([]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isVendor, setVendor] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const [isCustomer, setCustomer] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (role === "vendor") setVendor(true)
        else setVendor(false)

        if (role === "admin") setAdmin(true)
        else setAdmin(false)

        if (role === "customer") setCustomer(true)
        else setCustomer(false)
    }, role)

    useEffect(() => {
        const fetchStoreTypes = async () => {
            try {
                const res2 = await api.get("api/store/choices/");
                setStoreTypes(res2.data.store_type);
            } catch (err) {
                console.log(err)
            }
        };
        fetchStoreTypes();
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("username", res.data.username);
            
            if (res.data.role === role) {
                navigate(`/${role}/dashboard`)
            } else {
                navigate(navRoute)
            }
        } catch (error) {
            alert(`Login Error : ${error}`);
        }
    }

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            if (role === "vendor") {
                const res = await api.post(`/api/auth/${role}/register/`, { first_name, last_name, store_name, store_type, email, phone, address, city, pincode, username, password });
            } else {
                const res = await api.post(`/api/auth/${role}/register/`, { first_name, last_name, email, phone, address, city, pincode, username, password });
            }
            alert("Regisration Done")
            setActiveTab("login")
        } catch (error) {
            alert(`Registration Error : ${error}`);
        }
    }

    const [activeTab, setActiveTab] = useState("login");
    const activeButton = (activated) => `flex-2 p-3 border-b border-t border-slate-200 transition ${activeTab === activated ? "shadow-inner rounded-4xl font-black" : "shadow rounded-4xl"}`

    return (
        <>
            <Header isDisable={true} />
            <section className={`bg-blur select-none ${activeTab === "login" ? `bg-${role}-1` : `bg-${role}-2`}`}>
                <div className='container mx-auto px-4 py-15'>
                    <div className='max-w-5xl mx-auto rounded-4xl shadow-2xl overflow-hidden backdrop-blur-lg border-b border-t border-slate-100'>
                        <div className='p-5'>
                            <div className={`flex rounded-4xl  mb-8 p-1 ${isAdmin ? "hidden" : ""}`}>
                                <button className={activeButton("login")} onClick={() => { setActiveTab("login") }}>Sign In</button>
                                <button className={activeButton("register")} onClick={() => { setActiveTab("register") }}>Sign Up</button>
                            </div>

                            {/* Login Form */}
                        <AnimatePresence mode="wait">
                            {activeTab === "login" && (
                                <motion.div key="login" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.4, ease: "easeInOut" }}  className='tab-content active login-form-h rounded-4xl p-10 shadow-inner border-b border-t border-slate-100 overflow-hidden'>
                                    <h2 className='text-3xl font-semibold text-center'>Welcome Back ! { `${role[0].toUpperCase()}${role.substring(1, )}` }</h2>
                                    <p className='text-xl font-medium m-1 text-center'>Sign in to continue ...</p>
                                    <form className='mt-10 w-65 sm:w-96 md:w-xl justify-self-center space-y-6 p-4' onSubmit={ handleLogin }>
                                        <div className='flex flex-col m-5 '>
                                            <label for="l-username" className='text-sm font-medium'>Username</label>
                                            <input type="text" id="l-username" className='mt-1 px-5 py-2 shadow-custom-shadow rounded-4xl focus:border-t focus:border-b focus:border-slate-50 focus:shadow-inner outline-0' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                                        </div>
                                        <div className='flex flex-col m-5'>
                                            <label for="l-password" className='text-sm font-medium'>Password</label>
                                            <input type="password" id="l-password" className='mt-1 px-5 py-2 shadow-custom-shadow rounded-4xl focus:border-t focus:border-b focus:border-slate-50 focus:shadow-inner outline-0' value={password} onChange={(e)=>setPassword(e.target.value)} />
                                        </div>
                                        <div className="flex m-5 items-center justify-between">
                                            {/* <a href="#" className="text-sm text-sky-600 hover:underline">Forgot your password?</a> */}
                                        </div>
                                        <div className='ml-10 mr-10'>
                                            <button type="submit" className="w-full flex justify-center py-3 border border-transparent rounded-4xl shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 hover:border-t hover:border-b hover:border-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Sign In</button>
                                        </div>
                                        <p className="m-5 text-sm text-center text-slate-500">Don't have an account? <a href='#' onClick={() => setActiveTab("register")} className="font-medium text-sky-600 hover:underline">Sign Up</a></p>
                                    </form>
                                </motion.div>
                            )}

                            {/* Register Tab */}
                            {activeTab === "register" && (
                                <motion.div key='register' initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4, ease: "easeInOut" }} className='tab-content login-form-h rounded-4xl p-10 shadow-inner border-b border-t border-slate-100 overflow-scroll'>
                                    <h2 className='text-3xl font-semibold text-center'>Welcome ! { `${role[0].toUpperCase()}${role.substring(1, )}` } </h2>
                                    <p className='text-xl font-medium m-1 text-center'>Sign Up Now ...</p>
                                    <form className='mt-10 w-75 sm:w-96 md:w-xl justify-self-center space-y-6 p-4' onSubmit={handleRegistration}>
                                        <div className='flex flex-col m-5 '>
                                            <label for="r-first_name" className='text-sm font-medium'>First Name</label>
                                            <input type="text" id="r-first_name" className='mt-1 px-5 py-2 shadow-custom-shadow rounded-4xl focus:border-t focus:border-b focus:border-slate-50 focus:shadow-inner outline-0' 
                                            value={first_name} onChange={(e)=>setFirstName(e.target.value)}/>
                                        </div>
                                        <div className='flex flex-col m-5 '>
                                            <label for="r-last_name" className='text-sm font-medium'>Last Name</label>
                                            <input type="text" id="r-last_name" className='mt-1 px-5 py-2 shadow-custom-shadow rounded-4xl focus:border-t focus:border-b focus:border-slate-50 focus:shadow-inner outline-0' 
                                            value={last_name} onChange={(e)=>setLastName(e.target.value)}/>
                                        </div>
                                        <div className={`flex flex-col m-5 ${isVendor ? "" : "hidden"}`}>
                                            <label for="r-store_name" className='text-sm font-medium'>Store Name</label>
                                            <input type="text" id="r-store_name" className='mt-1 px-5 py-2 shadow-custom-shadow rounded-4xl focus:border-t focus:border-b focus:border-slate-50 focus:shadow-inner outline-0' 
                                            value={store_name} onChange={(e)=>setStoreName(e.target.value)}/>
                                        </div>
                                        <div className={`flex flex-col m-5 ${isVendor ? "" : "hidden"}`}>
                                            <label for="r-store_type" className='text-sm font-medium'>Store Type</label>
                                            <select id="r-store_type" className='mt-1 px-5 py-2 shadow-custom-shadow rounded-4xl focus:border-t focus:border-b focus:border-slate-50 focus:shadow-inner outline-0' value={ store_type } onChange={(e)=>{setStoreType(e.target.value)}}>
                                                <option value=""> Select Store Type </option>
                                                { storeTypes.map(([value, label]) => (
                                                    <option className='' key={ value } value= { value }> { label }</option>
                                                )) }
                                            </select>
                                        </div>
                                        <div className='flex flex-col m-5 '>
                                            <label for="r-email" className='text-sm font-medium'>Email</label>
                                            <input type="text" id="r-email" className='mt-1 px-5 py-2 shadow-custom-shadow rounded-4xl focus:border-t focus:border-b focus:border-slate-50 focus:shadow-inner outline-0' 
                                            value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                        </div>
                                        <div className='flex flex-col m-5'>
                                            <label for="r-phone" className='text-sm font-medium'>Phone</label>
                                            <input type="text" id="r-phone" className='mt-1 px-5 py-2 shadow-custom-shadow rounded-4xl focus:border-t focus:border-b focus:border-slate-50 focus:shadow-inner outline-0' 
                                            value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                                        </div>
                                        <div className='flex flex-col m-5 '>
                                            <label for="r-address" className='text-sm font-medium'>Address</label>
                                            <textarea id="r-address" className='mt-1 px-5 py-2 shadow-custom-shadow rounded-4xl focus:border-t focus:border-b focus:border-slate-50 focus:shadow-inner outline-0' 
                                            value={address} onChange={(e)=>setAddress(e.target.value)}/>
                                        </div>
                                        <div className='flex flex-col m-5'>
                                            <label for="r-city" className='text-sm font-medium'>City</label>
                                            <input type="text" id="r-city" className='mt-1 px-5 py-2 shadow-custom-shadow rounded-4xl focus:border-t focus:border-b focus:border-slate-50 focus:shadow-inner outline-0' 
                                            value={city} onChange={(e)=>setCity(e.target.value)}/>
                                        </div>
                                        <div className='flex flex-col m-5 '>
                                            <label for="r-pincode" className='text-sm font-medium'>Pincode</label>
                                            <input type="text" id="r-pincode" className='mt-1 px-5 py-2 shadow-custom-shadow rounded-4xl focus:border-t focus:border-b focus:border-slate-50 focus:shadow-inner outline-0' 
                                            value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
                                        </div>
                                        <div className='flex flex-col m-5 '>
                                            <label for="r-username" className='text-sm font-medium'>Username</label>
                                            <input type="text" id="r-username" className='mt-1 px-5 py-2 shadow-custom-shadow rounded-4xl focus:border-t focus:border-b focus:border-slate-50 focus:shadow-inner outline-0' 
                                            value={username} onChange={(e)=>setUsername(e.target.value)}/>
                                        </div>
                                        <div className='flex flex-col m-5'>
                                            <label for="r-password" className='text-sm font-medium'>Password</label>
                                            <input type="password" id="r-password" className='mt-1 px-5 py-2 shadow-custom-shadow rounded-4xl focus:border-t focus:border-b focus:border-slate-50 focus:shadow-inner outline-0' 
                                            value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                        </div>
                                        <div className='ml-10 mr-10 mt-12'>
                                            <button type="submit" className="w-full flex justify-center py-3 border border-transparent rounded-4xl shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 hover:border-t hover:border-b hover:border-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                                Sign Up</button>
                                        </div>
                                        <p className="m-5 text-sm text-center text-slate-500">Already, have an account? <a href='#' onClick={() => setActiveTab("login")} className="font-medium text-sky-600 hover:underline">Sign In</a></p>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Authentication