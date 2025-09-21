import Header from "../components/Header"

const AdminDashboard = () => {
  return (
    <>
      <Header isDisable={true} isLogout={true} />
      <div  className='w-screen text-center text-5xl mt-96'>Admin Dashboard</div>
    </>
  )
}

export default AdminDashboard