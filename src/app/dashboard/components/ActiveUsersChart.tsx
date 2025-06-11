"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface ActiveUsersChartProps {
  data: { day: string; count: number }[];
}

export function ActiveUsersChart({ data }: ActiveUsersChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#FF8661" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
} 