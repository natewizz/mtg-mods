"use client";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = [
  '#5A31F4', '#3DA1C4', '#FFC145', '#FF8661', '#2C2E3A', '#4A21E4', '#4921D8', '#FFB145', '#3DC4A1', '#FF6161'
];

interface TagPieChartProps {
  data: { name: string; value: number }[];
}

export function TagPieChart({ data }: TagPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
} 