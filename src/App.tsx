import { useRoutes, Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Typography, Space, message } from "antd";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import ProductList from "./pages/product/list";
import ProductAdd from "./pages/product/add";
import ProductEdit from "./pages/product/edit";
import Index from "./pages";
import ListOrder from "./pages/order/list";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import UserList from "./pages/account/list";
import ProductChart from "./pages/statistics";

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const navigate = useNavigate();
  const element = useRoutes([
    { path: "/product/list", element: <ProductList /> },
    { path: "/product/add", element: <ProductAdd /> },
    { path: "/product/:id/edit", element: <ProductEdit /> },
    { path: "/", element: <Index /> },
    { path: "/order/list", element: <ListOrder /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/statistics", element: <ProductChart /> },

  ]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={280}
        breakpoint="lg"
        collapsedWidth="80"
        style={{
          background: "linear-gradient(135deg,rgb(0, 6, 12),rgb(47, 135, 218))", // Áp dụng màu gradient
          minHeight: "100vh",
        }}
      >
        <div
          className="logo"
          style={{
            color: "#fff",
            textAlign: "center",
            padding: "20px",
            fontSize: "20px",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Admin Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            background: "transparent", // Để menu không che mất hiệu ứng gradient
          }}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
            <Link to="/product/list">Products</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<AppstoreOutlined />}>
            <Link to="/categories">Categories</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<FileTextOutlined />}>
            <Link to="/order/list">Orders</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<BarChartOutlined />}>
            <Link to="/statistics">Statistics</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<TeamOutlined />}>
            <Link to="/users">Accounts</Link>
          </Menu.Item>
          <Menu.Item
            key="8"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("token"); // Xóa token đăng nhập
              message.success("Logged out successfully!");
              navigate("/login"); // Chuyển hướng về trang đăng nhập
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
            height: "70px", // Tăng chiều cao Header
            borderBottom: "2px solid #f0f2f5",
          }}
        >
          <Title
            level={3}
            style={{ margin: 0, fontWeight: "bold", color: "#333" }}
          >
            Admin Dashboard
          </Title>

          <Space size="middle">
            <Link to="/register">
              <Button
                type="primary"
                size="large"
                style={{
                  background:
                    "linear-gradient(135deg,rgb(133, 185, 241),rgb(2, 39, 80))",border: "none",
                }}
              >
                Register
              </Button>
            </Link>
            <Link to="/login">
              <Button type="default" size="large">
                Login
              </Button>
            </Link>
          </Space>
        </Header>

        <Content
          style={{
            boxShadow: "0px 4px 24px 2px rgba(10, 10, 12, 0.05)",
            margin: "20px",
            padding: "20px",
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          {element}
        </Content>
        <Footer
          style={{
            background:
              "linear-gradient(135deg,rgb(0, 6, 12),rgb(47, 135, 218))",
            color: "#fff",
            textAlign: "center",
            padding: "15px",
            fontSize: "14px",
            fontWeight: "500",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)", // Đường phân cách tinh tế
            opacity: 0.9, // Làm mờ nhẹ giúp trông mềm mại hơn
          }}
        >
          <div style={{ marginBottom: "5px" }}>
            Admin Panel ©2025 | Developed by{" "}
            <strong>Pham Hung Thinh - PH52516</strong>
          </div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>
            All rights reserved.
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
