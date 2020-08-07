import React from 'react';
import {
  BarChart,
  Bar,
  Text,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


export default function DashboardBarChart({ data, labelTxt, type }) {
  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis label="" dataKey="xAxis" />
        <YAxis label={<CustomizedLabelB labelTxt={labelTxt} />} />
        <Tooltip content={<CustomTooltip gType={type} />} />
        <Legend />
        <Bar dataKey="yAxis" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = (props) => {
  const { active, payload, gType } = props;
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-sm border-gray-600">
        <p className="font-medium">{`${payload[0].payload.date}`}</p>
        <p className="mt-1 text-base">{`${payload[0].payload.yAxis} ${
          gType == 'c' ? 'customers registered' : 'Consultations'
        }`}</p>
      </div>
    );
  }

  return null;
};

const CustomizedLabelB = ({ labelTxt }) => {
  return (
    <Text
      x={0}
      y={0}
      dx={-300}
      dy={30}
      textAnchor="start"
      width={200}
      transform="rotate(-90)"
      //scaleToFit={true}
    >
      {labelTxt}
    </Text>
  );
};
