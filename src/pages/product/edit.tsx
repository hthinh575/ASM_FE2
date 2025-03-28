import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Typography,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

type ProductForm = {
  name: string;
  price: number;
  image: string;
  quantity: number;
  desc: string;
};

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const getProductDetail = async (): Promise<ProductForm | undefined> => {
    if (!id) return;
    const { data } = await axios.get(`http://localhost:3000/products/${id}`);
    return data;
  };

  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: getProductDetail,
    enabled: !!id,
  });

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product]);

  const updateProduct = async (data: ProductForm) => {
    if (!id) return;
    await axios.put(`http://localhost:3000/products/${id}`, data);
  };

  const { mutate } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      message.success("Edit product successfully!");
      navigate("/product/list");
    },
    onError: () => {
      message.error("Edit product failed!");
    },
  });

  function onFinish(values: ProductForm) {
    mutate(values);
  }

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
        <Breadcrumb.Item>Edit Product</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        <Typography.Title level={2}>Edit Product</Typography.Title>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Product Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the product name!" },
            ]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Price ($)"
            name="price"
            rules={[{ required: true, message: "Please enter the price!" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Enter product price"
            />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true, message: "Please enter the image URL!" }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please enter the quantity!" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Enter product quantity"
            />
          </Form.Item>

          <Form.Item label="Product Description" name="desc">
            <Input.TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusCircleOutlined />}
            size="large"
            style={{
              background:
                "linear-gradient(135deg,rgb(133, 185, 241),rgb(2, 39, 80))",border: "none",
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ProductEdit;
