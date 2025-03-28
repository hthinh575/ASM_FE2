import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, Table, InputNumber, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Index() {

  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const queryClient = useQueryClient();


  const token = localStorage.getItem('token');
  if(!token){ // kiểm tra nếu chưa đăng nhập thì điều hướng về trang login
    navigate('/login');
  }

  
  // Lấy danh sách sản phẩm
  const getAllProduct = async () => {
    const { data } = await axios.get("http://localhost:3000/products");
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });
  const addOrder = async (order: { productId: number; quantity: number }) => {
    return await axios.post("http://localhost:3000/order", order);
  };

  // Mutation để gọi API khi mua hàng
  const { mutate } = useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      message.success("Mua hàng thành công!");
      queryClient.invalidateQueries({ queryKey: ["order"] }); // Cập nhật lại danh sách đơn hàng
      navigate('/order/user/list')
    },
    onError: () => {
      message.error("Lỗi khi mua hàng!");
    },
  });

  // Cập nhật số lượng mua
  const handleQuantityChange = (id: number, value: number | null) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value || 1, // Nếu không nhập, mặc định là 1
    }));
  };

  // Xử lý mua hàng và lưu vào DB
  const handleBuy = (productId: number) => {
    const quantity = quantities[productId] || 1;
    
    mutate({ productId, quantity }); // Gọi API lưu vào bảng `orders`
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageSrc: string) => <Image src={imageSrc} width={100} />,
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_: any, product: any) => (
        <InputNumber
          min={1}
          defaultValue={1}
          onChange={(value) => handleQuantityChange(product.id, value)}
        />
      ),
    },
    {
      title: "Actions",
      render: (product: any) => (
        <Button type="primary" onClick={() => handleBuy(product.id)}>
          Buy
        </Button>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} loading={isLoading} />;
}

export default Index;
