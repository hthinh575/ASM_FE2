import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Table, Select, Button, message, Breadcrumb } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const ListOrder = () => {
  const queryClient = useQueryClient();
  const [statuses, setStatuses] = useState<{ [key: number]: string }>({});

  // Fetch danh sách đơn hàng
  const getOrders = async () => {
    const { data } = await axios.get("http://localhost:3000/order");
    return data;
  };

  const { data: orders, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: getOrders,
  });

  // Mutation cập nhật trạng thái đơn hàng
  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await axios.patch(`http://localhost:3000/order/${id}`, { status });
    },
    onSuccess: () => {
      message.success("Cập nhật trạng thái thành công!");
      queryClient.invalidateQueries({ queryKey: ["order"] }); // Cập nhật lại danh sách đơn hàng
    },
    onError: () => {
      message.error("Lỗi khi cập nhật trạng thái!");
    },
  });

  // Xử lý khi chọn trạng thái
  const handleStatusChange = (id: number, value: string) => {
    setStatuses((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Xử lý khi nhấn "Xác nhận"
  const handleConfirm = (id: number) => {
    const status = statuses[id] || "pending"; // Nếu chưa chọn, giữ nguyên trạng thái
    updateOrderStatus.mutate({ id, status });
  };

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "ID Đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <Select
          defaultValue={status || "pending"}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 120 }}
          disabled={status === "canceled"} // Không thể thay đổi nếu trạng thái là "canceled"
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="success">Success</Select.Option>
          <Select.Option value="canceled">Canceled</Select.Option>
        </Select>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Button 
          type="primary" 
          onClick={() => handleConfirm(record.id)}
          disabled={record.status === "canceled"} // Không thể nhấn nếu đã "canceled"
        >
          Xác nhận
        </Button>
      ),
    },
  ];

  return (
    <>
     {/* Breadcrumb Navigation */}
     <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/order/list">Order</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    <div style={{ padding: 20 }}>
      <h2>Danh sách đơn hàng</h2>
      <Table dataSource={orders} columns={columns} loading={isLoading} rowKey="id" />
    </div>
    </>
  );
};

export default ListOrder;
