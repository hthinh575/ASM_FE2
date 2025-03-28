import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Image,
  message,
  Popconfirm,
  Table,
  Space,
  Typography,
  Breadcrumb,
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {
  const queryClient = useQueryClient();

  // Hàm lấy danh sách sản phẩm
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/products");
      return data || [];
    } catch (error) {
      message.error("Failed to fetch products!");
      return [];
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });

  // Hàm xóa sản phẩm
  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3000/products/${id}`);
  };

  // Sử dụng React Query để xóa sản phẩm
  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      message.success("Deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      message.error("Delete failed!");
    },
  });

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <Typography.Text type="success">${price}</Typography.Text>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (imageSrc) => (
        <Image
          src={imageSrc}
          width={80}
          height={80}
          style={{ objectFit: "cover", borderRadius: 8 }}
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (product) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} ghost>
            <Link to={`/product/${product.id}/edit`}>Edit</Link>
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => mutate(product.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} ghost>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
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
          <Link to="/product/list">Products</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Typography.Title level={2}>Product List</Typography.Title>
        <Link to="/product/add">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            style={{
              background:
                "linear-gradient(135deg,rgb(133, 185, 241),rgb(2, 39, 80))",border: "none",
            }}
          >
            Add Product
          </Button>
        </Link>
      </Space>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        loading={isLoading}
        bordered
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}

export default ProductList;
