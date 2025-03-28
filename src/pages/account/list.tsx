import { useQuery } from "@tanstack/react-query";
import {
  message,
  Table,
  Space,
  Typography,
  Breadcrumb,
} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

function UserList() {
  // Hàm lấy danh sách người dùng
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users");
      return data || [];
    } catch (error) {
      message.error("Failed to fetch users!");
      return [];
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      ellipsis: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => <Typography.Text type="success">{role}</Typography.Text>,
    },
    {
      title: "Order History",
      dataIndex: "orderHistory",
      key: "orderHistory",
      ellipsis: true,
      render: (history) => history?.length ? history.join(", ") : "No orders",
    },
  ];

  return (
    <>
      {/* Breadcrumb - Thanh điều hướng */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/user/list">Users</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Typography.Title level={2}>User List</Typography.Title>
      </Space>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        loading={isLoading}
        bordered
        pagination={{ pageSize: 11 }}
      />
    </>
  );
}

export default UserList;
