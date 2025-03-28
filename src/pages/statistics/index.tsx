import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const ProductChart = () => {

    const getAllOrder = async () => {
        try {
          const { data } = await axios.get("http://localhost:3000/order");
          return data || [];
        } catch (error) {
          message.error("Failed to fetch products!");
          return [];
        }
      };

      const { data, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrder,
      });

    
 
      


  const [state, setState] = React.useState<any>({
    series: [
      {
        name: "Inflation",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          },
        },
      },
      title: {
        text: "Top 10 Best-Selling Products",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  });


  


  return (
    <div>
        <div>
            <h3 
            style={
                {
                    paddingBottom: 10,
                    fontSize: 30,
                    fontWeight: 800
                }
            }>
            Total Orders : {data?.length}
            </h3>
        </div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ProductChart;
