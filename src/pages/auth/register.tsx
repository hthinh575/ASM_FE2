import { useMutation } from "@tanstack/react-query";
import { Breadcrumb, Button, Form, Input, Select, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
};

const Register = () => {
  const nav = useNavigate();

  // Registration API
  const registerUser = async (data: RegisterForm) => {
    await axios.post("http://localhost:3000/users", data);
  };

  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      message.success("Registration successful!");
      nav("/login");
    },
    onError: () => {
      message.error("Registration failed!");
    },
  });

  const onFinish = (values: RegisterForm) => {
    mutate(values);
  };

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/register">Sign Up</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Registration Form Container */}
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
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            background: "white",
            border: "1px solid #e0e0e0",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: 20 }}>Sign Up</h1>
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input placeholder="Enter your username..." />
            </Form.Item>
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
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select placeholder="Select your role">
                <Select.Option value="user">User</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
              </Select>
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
              Register
            </Button>
          </Form>
          <Link
            to="/login"
            style={{
              textAlign: "center",
              display: "block",
              margin: "20px",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#002766",
            }}
          >
            Login
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

export default Register;
