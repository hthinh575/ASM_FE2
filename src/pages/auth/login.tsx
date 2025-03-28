import { Breadcrumb, Button, Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const nav = useNavigate();

  // Xử lý đăng nhập
  const onFinish = async (values: LoginForm) => {
    try {
      // Gửi yêu cầu đăng nhập
      const response = await axios.post("http://localhost:3000/login", values);

      if (response.status === 200) {
        const { user, accessToken } = response.data;

        // Kiểm tra role trước khi cho phép đăng nhập
        if (user.role !== "admin") {
          message.error("Only admins can log in!");
          return;
        }

        // Lưu token nếu là admin
        localStorage.setItem("token", accessToken);

        message.success("Login successful!");
        nav("/product/list"); // Chuyển hướng admin
      }
    } catch (error: any) {
      message.error("Incorrect email or password!");
    }
  };

  return (
    <>
      {/* Điều hướng bằng Breadcrumb */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/login">Login</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Form Login */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        <div
          style={{
            width: 420,
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            background: "white",
            border: "1px solid #e0e0e0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: 20 }}>Sign In</h1>
          <Form onFinish={onFinish} layout="vertical" style={{ width: "100%" }}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Invalid email format",
                },
              ]}
            >
              <Input placeholder="Enter your email..." />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="Enter your password..." />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                background:
                  "linear-gradient(135deg,rgb(133, 185, 241),rgb(2, 39, 80))",
                border: "none",
                padding: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
                transition: "0.3s",
              }}
            >
              Login
            </Button>
          </Form>
          <Link
            to="/register"
            style={{
              margin: "20px",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#002766",
            }}
          >
            Create a New Account
          </Link>
          <p style={{ textAlign: "center" }}>
            By continuing, you are agreeing to our Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
