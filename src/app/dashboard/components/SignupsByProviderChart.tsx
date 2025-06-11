"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface SignupsByProviderChartProps {
  data: { provider: string; count: number }[];
}

export function SignupsByProviderChart({ data }: SignupsByProviderChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="provider" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#4A21E4" />
      </BarChart>
    </ResponsiveContainer>
  );
} 