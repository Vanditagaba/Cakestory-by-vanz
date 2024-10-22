import React from "react";
import "./chart.scss";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";

const Chart = ({ data, title }) => {
  return (
    <div className="chartSalesContainer">
      <p className="title">{title}</p>
      <ResponsiveContainer width="100%" height={310}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="0 0" opacity={0.1} vertical={false} />
          <XAxis
            dataKey="name"
            style={{ fontSize: "1.15rem", opacity: 0.8 }}
            tickLine={false}
          />
          <YAxis axisLine={false} tickCount={5} />
          <Tooltip content={<CustomToolTip />} />
          <Line type="monotone" dataKey="uv" stroke="#9474ed" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomToolTip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="tooltipContainer">
        <h4>{label}</h4>
        <p>{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default Chart;
