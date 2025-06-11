"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface UserGrowthChartProps {
  data: { month: string; count: number }[];
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#5A31F4" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
} 