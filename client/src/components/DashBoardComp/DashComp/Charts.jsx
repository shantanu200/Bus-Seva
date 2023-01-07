import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Label,
} from "recharts";
// const data = [
//   {
//     bus_id: "1",
//     booked:10,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     bus_id: "2",
//     booked:12,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     bus_id: "3",
//     booked:14,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     bus_id: "4",
//     booked:10,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     bus_id: "5",
//     booked:11,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     bus_id: "6",
//     booked:15,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     bus_id: "7",
//     booked:16,
//     pv: 4300,
//     amt: 2100,
//   },
// ];
const Charts = (data) => {

  const cData = [];
  
  
  for(var i=0;i<data?.data?.length;i++){
     const temp = {
      bus_id : i+1,
      booked: data?.data[i].seatsArr.length
     }
     cData.push(temp);
  }

  return (
    <div className="mt-8 mx-2 md:flex hidden border rounded-lg p-8">
    <AreaChart className="w-full"
      width={800}
      height={250}
      data={cData}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#1c1c1c" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#1c1c1c" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="bus_id">
      <Label value="Bus ID" offset={0} position="insideBottom" />
      </XAxis>
      <YAxis>
        <Label value="Count" position="insideLeft" angle={-90} />
      </YAxis>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="booked"
        stroke="#1C1C1C"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
      {/* <Area
        type="monotone"
        dataKey="pv"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#colorPv)"
      /> */}
    </AreaChart>
    </div>
  );
};

export default Charts;
