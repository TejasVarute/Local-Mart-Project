import Header from "../components/Header"

const CustomerDashboard = () => {
  const username = localStorage.getItem("username");
  
  return (
    <>
      <Header isLogout={username ? true : false} isLogin={username ? false : true} />
      <div className='w-screen text-center text-5xl mt-96'>Customer Dashboard</div>
    </>
  )
}

export default CustomerDashboard