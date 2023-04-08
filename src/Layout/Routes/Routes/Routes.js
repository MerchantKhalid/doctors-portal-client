import { createBrowserRouter } from "react-router-dom";
import Home from "../../../Home/Home/Home";
import Login from "../../../Login/Login";
import Appointment from "../../../Pages/Appointment/Appointment";
import AddDoctors from "../../../Pages/Dashboard/AddDoctors/AddDoctors";
import AllUsers from "../../../Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../../../Pages/Dashboard/Dashboard/Dashboard";
import Payment from "../../../Pages/Dashboard/Dashboard/Payment/Payment";
import DashboardLayout from "../../../Pages/Dashboard/DashboardLayout/DashboardLayout";
import ManageDoctors from "../../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointment from "../../../Pages/Dashboard/MyAppointment/MyAppointment";
import DisplayError from "../../../Shared/DisplayError/DisplayError";
import Signup from "../../../Signup/Signup";
import Main from "../../Main";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router= createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<DisplayError></DisplayError>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<Signup></Signup>
            },
            {
                path:'/appointment',
                element:<Appointment></Appointment>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute> <DashboardLayout></DashboardLayout> </PrivateRoute>,
        errorElement:<DisplayError></DisplayError>,
        children:[
            {
                path:'/dashboard',
                element:<MyAppointment></MyAppointment>
            },
            {
                path:'/dashboard/allusers',
                element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path:'/dashboard/adddoctors',
                element:<AdminRoute><AddDoctors></AddDoctors> </AdminRoute>
            },
            {
                path:'/dashboard/managedoctors',
                element:<AdminRoute> <ManageDoctors></ManageDoctors></AdminRoute>
            },
            {
                path:'/dashboard/payment/:id',
                element:<AdminRoute> <Payment></Payment></AdminRoute>,
                loader:({params})=>fetch(`http://localhost:5000/bookings/${params.id}`)
            },
        ]
    }
])
