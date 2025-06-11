"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface InteractionsChartProps {
  data: { day: string; count: number }[];
}

export function InteractionsChart({ data }: InteractionsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#FFC145" />
      </BarChart>
    </ResponsiveContainer>
  );
} 