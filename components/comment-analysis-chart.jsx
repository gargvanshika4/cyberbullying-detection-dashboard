"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const COLORS = {
  Normal: "#22c55e", // Green
  Abusive: "#ef4444", // Red
  Bullying: "#f97316", // Orange
  "Hate Speech": "#eab308", // Yellow
}

const CommentAnalysisChart = ({ comments }) => {
  const data = Object.entries(
    comments.reduce((acc, comment) => {
      acc[comment.category] = (acc[comment.category] || 0) + 1
      return acc
    }, {}),
  ).map(([name, value]) => ({ name, value }))

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CommentAnalysisChart
