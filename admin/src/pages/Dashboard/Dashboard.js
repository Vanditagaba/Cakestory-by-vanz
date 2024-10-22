import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import AnimatedPage from "./../../components/AnimatedPage/AnimatedPage";
import Sidebar from "../../components/Sidebar/Sidebar";
import Widgets from "../../components/Widgets/Widgets";
import Chart from "./../../components/Chart/Chart";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import SimpleTable from "../../components/SimpleTable/SimpleTable";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../app/slice/productsApiSlice";

const Dashboard = () => {
  const [activePie, setActivePie] = useState(null);
  //temp data for dashboard

  const data = [
    {
      name: "A",
      uv: 4000,
      amt: 2400,
    },
    {
      name: "B",
      uv: 100,
      amt: 2210,
    },
    {
      name: "C",
      uv: 2000,
      amt: 2290,
    },
    {
      name: "D",
      uv: 2780,
      amt: 2000,
    },
    {
      name: "E",
      uv: 1890,
      amt: 2181,
    },
    {
      name: "F",
      uv: 2390,
      amt: 2500,
    },
  ];

  const products = useSelector(selectAllProducts);
  const inStock = products.filter((product) => product.BIqty >= 100);
  const outOfStock = products.filter((product) => product.BIqty < 50);
  const lowOnStock = products.filter(
    (product) => product.BIqty < 100 && product.BIqty > 50
  );

  const data02 = [
    { title: "In Stock", amount: inStock.length, color: "#62e9b8" },
    { title: "Out of Stock", amount: outOfStock.length, color: "#da3d47" },
    { title: "Low on Stock", amount: lowOnStock.length, color: "#ec8e77" },
  ];

  const [size, setSize] = useState(280);
  let innerSize = size / 2;
  const [width, setWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    if (width < 400) {
      setSize(240);
    }

    if (width > 400) {
      setSize(280);
    }
    return () => window.removeEventListener("resize", updateDimensions);
  }, [width]);

  return (
    <>
      <div className="dashboardContainer">
        <Sidebar />

        <AnimatedPage className="dashboardPage">
          <div className="dashboard">
            <div className="topWidgetBar">
              <div className="outerWidgetContainer">
                <Widgets type="user" />
              </div>
              <div className="outerWidgetContainer">
                <Widgets type="order" />
              </div>
              <div className="outerWidgetContainer">
                <Widgets type="sales" />
              </div>
              <div className="outerWidgetContainer">
                <Widgets type="products" />
              </div>
            </div>

            <div className="chartBar">
              <div className="componentContainer">
                <Chart data={data} title="Total Revenue (Last 6 Months)" />
              </div>
              <div className="productDetailsChartContainer">
                <div className="pieChartContainer">
                  <p className="title">
                    Product Details (Hover over Arc to see Details)
                  </p>
                  <div className="pieChart">
                    <svg width={size} height={size}>
                      <Group top={innerSize} left={innerSize}>
                        <Pie
                          data={data02}
                          pieValue={(data) => data.amount}
                          outerRadius={innerSize}
                          innerRadius={({ data }) => {
                            const size =
                              activePie && activePie.title === data.title
                                ? 12
                                : 8;
                            return innerSize - size;
                          }}
                          padAngle={"0.02"}
                        >
                          {(pie) => {
                            return pie.arcs.map((arc) => {
                              return (
                                <g
                                  key={arc.data.title}
                                  onMouseEnter={() => setActivePie(arc.data)}
                                  onMouseLeave={() => setActivePie(null)}
                                >
                                  <path
                                    d={pie.path(arc)}
                                    fill={arc.data.color}
                                    style={{ transition: "500ms ease" }}
                                  ></path>
                                </g>
                              );
                            });
                          }}
                        </Pie>
                        {activePie ? (
                          <>
                            <Text
                              textAnchor="middle"
                              fill="#a8a8a8"
                              fontSize={30}
                              dy={-20}
                            >
                              {activePie.title}
                            </Text>
                            <Text
                              textAnchor="middle"
                              fill={activePie.color}
                              fontSize={25}
                              dy={30}
                            >
                              {activePie.amount}
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text
                              textAnchor="middle"
                              fill="#a8a8a8"
                              fontSize={30}
                              dy={-20}
                            >
                              Total Products
                            </Text>
                            <Text
                              textAnchor="middle"
                              fill="#e8e8e8"
                              fontSize={25}
                              dy={30}
                            >
                              {products.length}
                            </Text>
                          </>
                        )}
                      </Group>
                    </svg>
                  </div>
                  <div className="legendContainer">
                    <ul className="legend">
                      <li className="legendItem">
                        <div
                          className="legendColor me-2"
                          style={{ backgroundColor: "#62e9b8" }}
                        ></div>
                        <span className="legendTitle">In Stock</span>
                      </li>
                      <li className="legendItem">
                        <div
                          className="legendColor me-2"
                          style={{ backgroundColor: "#ec8e77" }}
                        ></div>
                        <span className="legendTitle">Low on Stock</span>
                      </li>
                      <li className="legendItem">
                        <div
                          className="legendColor me-2"
                          style={{ backgroundColor: "#da3d47" }}
                        ></div>
                        <span className="legendTitle">Out of Stock</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="tableBar">
              <SimpleTable />
            </div>
          </div>
        </AnimatedPage>
      </div>
    </>
  );
};

export default Dashboard;
