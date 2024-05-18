import {
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dashboard from "./components/Dashboard";
import CreateProductForm from "./components/CreateProductForm";
import CustomerTable from "./components/CustomerTable";
import OrderTable from "./components/OrderTable";
import ProductsTable from "./components/ProductsTable";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";

const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <DashboardIcon /> },
  { name: "Customers", path: "/admin/customers", icon: <DashboardIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <DashboardIcon /> },
  {
    name: "AddProducts",
    path: "/admin/create",
    icon: <DashboardIcon />,
  },
];

function Admin() {
  const navigate = useNavigate();
  const theme = useTheme();
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    try {
      console.log("Email:", email);
      console.log("Password:", password);
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      setToastMessage("Login Successful");
      handleOpen();
      localStorage.setItem("token", response.data.token);
      window.location.reload();
    } catch (error) {
      handleOpen();
      setToastMessage(error.response.data.message);
      console.error(error.response);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
            style={{ cursor: "pointer" }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.name}</ListItemText>
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText className="cursor-pointer" onClick={logout}>
            Logout
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {token === null ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex h-[100vh]">
          <CssBaseline />

          <div className="w-[15%]">{drawer}</div>

          <div className="w-[85%]">
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/create" element={<CreateProductForm />}></Route>
              <Route path="/products" element={<ProductsTable />}></Route>
              <Route path="/orders" element={<OrderTable />}></Route>
              <Route path="/customers" element={<CustomerTable />}></Route>
            </Routes>
          </div>
        </div>
      )}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={toastMessage}
      />
    </div>
  );
}

export default Admin;
