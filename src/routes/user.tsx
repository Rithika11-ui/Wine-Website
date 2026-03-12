import ContactUs from '../User/ContactUs'
import ProductDetail from '../components/products/ProductDetails'
import CheckoutPage from '../components/products/CheckoutProduct'
import CartPage from '../components/products/CartPage'
// import Payment from '../User/Payment/Payment'
import UserAccount from '../User/UserProfile/UserProfile'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import ForgotPassword from '../Auth/ForgotPassword'
import { Navigate, Outlet } from 'react-router-dom'
import AboutUs from '../User/AboutUs'
import Blog from '../User/Blogs/Blogs'
import Education from '../User/Blogs/EducationBlog'
import Lifestyle from '../User/Blogs/LifeStyleBlog'
import Sustainability from '../User/Blogs/SustainabilityBlog'
import Homepage from '../User/Homepage'
import Shop from '../User/Shop'
import PrivateRoute from '../components/PrivateRoutes.tsx/PrivateRoutes'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import Favorites from '../components/products/FavoriteProducts'
import SecurityLogin from '../User/UserProfile/SecurityLogin'
import ManageAddresses from '../User/UserProfile/ManageAddress'
import Notifications from '../User/UserProfile/Notification'
import DeleteAccount from '../User/UserProfile/DeleteAccount'

const UserLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer/>
  </>
)

const appRoutes = [
  { 
  path: '/', 
  element: <Navigate to={
    localStorage.getItem("token") && localStorage.getItem("token") !== "undefined" 
      ? "/home" 
      : "/signin"
  } replace /> 
  },


  { path: '/signin', element: <Login /> },
  { path: '/signup', element: <Register /> },
  { path: '/forgot-pw', element: <ForgotPassword /> },

  {
    path: '/home',
    element: <PrivateRoute requiredRole={1}><UserLayout /></PrivateRoute>,
    children: [
      { index: true, element: <Homepage /> },
    ]
  },

  {
    path: '/shop',
    element: <PrivateRoute requiredRole={1}><UserLayout /></PrivateRoute>,
    children: [
      { index: true, element: <Shop /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
    ]
  },

  {
    path: '/blog',
    element: <PrivateRoute requiredRole={1}><UserLayout /></PrivateRoute>,
    children: [
      { index: true, element: <Blog /> },
      { path: 'education', element: <Education /> },
      { path: 'sustainability', element: <Sustainability /> },
      { path: 'lifestyle', element: <Lifestyle /> },
    ]
  },

  {
    path: '/about-us',
    element: <PrivateRoute requiredRole={1}><UserLayout /></PrivateRoute>,
    children: [
      { index: true, element: <AboutUs /> },
    ]
  },

  {
    path: '/contact-us',
    element: <PrivateRoute requiredRole={1}><UserLayout /></PrivateRoute>,
    children: [
      { index: true, element: <ContactUs /> },
    ]
  },

  {
    path: '/user-profile',
    element: <PrivateRoute requiredRole={1}><UserLayout /></PrivateRoute>,
    children: [
      {index: true, element: <UserAccount/>}
    ]
  },

  {
    path: '/favorite-cart',
    element: <PrivateRoute requiredRole={1}><UserLayout /></PrivateRoute>,
    children: [
      {index: true , element: <Favorites/>}
    ]
  },

  {
    path: '/shopping-cart',
    element: <PrivateRoute requiredRole={1}><UserLayout /></PrivateRoute>,
    children: [
      {index: true, element: <CartPage/>}
    ]
  },

  {
    path: '/user-profile',
    element: <PrivateRoute requiredRole={1}><UserLayout /></PrivateRoute>,
    children: [
      { index: true, element: <UserAccount /> },
      { path: 'security-login', element: <SecurityLogin /> },
      { path: 'address', element: <ManageAddresses /> },
      { path: 'notification', element: <Notifications /> },
      { path: 'delete-account', element: <DeleteAccount /> },
      
    ]
  },


  // Other protected pages
  // { path: '/payment', element: <PrivateRoute requiredRole={1}><UserLayout><Payment /></UserLayout></PrivateRoute> },

  // 404
  // {
  // path: '*',
  // element: <UserLayout />,
  // children: [{ index: true, element: <NotFound /> }]
  // }
]

export default appRoutes