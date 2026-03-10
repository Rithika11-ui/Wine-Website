import { Outlet } from 'react-router-dom'
import Dashboard from '../components/pages/Admin/DashBoard/Dashbord'
import ManageCustomers from '../components/pages/Admin/Customer/ManageCustomer'
import ProductManagement from '../components/pages/Admin/Product/ManageProduct'
import ManageOrders from '../components/pages/Admin/Order/ManageOrder'
import ManageReward from '../components/pages/Admin/Reward/ManageReward'
import AdminHeader from '../components/pages/Admin/Layout/Header'
import { Sidebar } from '../components/pages/Admin/Layout/LeftSide'
import ManageCategory from '../components/pages/Admin/Category/ManageCategory'
import ManageAdvertisements from '../components/pages/Admin/Advertisment/Advertisment'
import PrivateRoute from '../components/PrivateRoutes.tsx/PrivateRoutes'

const AdminLayout = () => (
  <div className="min-h-screen bg-[#F4F7FE]">
    <AdminHeader />

    <div className="flex">
      <Sidebar />

      <main className="flex-1 ml-64 pt-4 min-w-0">
        <Outlet />
      </main>
    </div>
  </div>
)

const adminRoutes = [
  {
    path: '/admin',
    element: <PrivateRoute requiredRole={0}><AdminLayout /></PrivateRoute>,
    children: [
        { index: true, element: <Dashboard /> },
        { path: 'customers', element: <ManageCustomers /> },
        { path: 'inventories', element: <ProductManagement /> },
        { path: 'orders', element: <ManageOrders /> },
        { path: 'rewards', element: <ManageReward /> },
        { path: 'categories', element: <ManageCategory /> },
        { path: 'advertisement', element: <ManageAdvertisements /> },
          

        
    ],
  },
]

export default adminRoutes