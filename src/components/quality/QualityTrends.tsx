"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

const mockData = {
  monthlyTrends: [
    { month: 'Jan', avgScore: 89, issues: 8, improvements: 12 },
    { month: 'Feb', avgScore: 91, issues: 6, improvements: 10 },
    { month: 'Mar', avgScore: 90, issues: 7, improvements: 9 },
    { month: 'Apr', avgScore: 93, issues: 4, improvements: 8 },
    { month: 'May', avgScore: 92, issues: 5, improvements: 11 },
    { month: 'Jun', avgScore: 94, issues: 3, improvements: 7 },
  ],
  criteriaScores: [
    {
      month: 'Jan',
      edges: 88,
      bubbles: 90,
      alignment: 87,
      clarity: 91,
      stretch: 89,
      debris: 90,
    },
    {
      month: 'Feb',
      edges: 90,
      bubbles: 92,
      alignment: 89,
      clarity: 93,
      stretch: 91,
      debris: 91,
    },
    // ... more months
  ],
  improvementRate: [
    { month: 'Jan', rate: 85, volume: 45 },
    { month: 'Feb', rate: 88, volume: 52 },
    { month: 'Mar', rate: 87, volume: 48 },
    { month: 'Apr', rate: 91, volume: 55 },
    { month: 'May', rate: 90, volume: 50 },
    { month: 'Jun', rate: 93, volume: 58 },
  ],
}

const timeRanges = [
  { value: '6m', label: 'Last 6 Months' },
  { value: '1y', label: 'Last Year' },
  { value: '2y', label: 'Last 2 Years' },
]

export function QualityTrends() {
  const [timeRange, setTimeRange] = useState('6m')

  const chartConfig = {
    cartesianGrid: {
      strokeDasharray: '3 3',
      stroke: 'hsl(var(--muted))',
    },
    xAxis: {
      stroke: 'hsl(var(--muted-foreground))',
      fontSize: 12,
    },
    yAxis: {
      stroke: 'hsl(var(--muted-foreground))',
      fontSize: 12,
    },
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name.toLowerCase().includes('rate') || entry.name.toLowerCase().includes('score')
                ? '%'
                : ''}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quality Trends</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overall Quality Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.monthlyTrends}>
                  <CartesianGrid {...chartConfig.cartesianGrid} />
                  <XAxis {...chartConfig.xAxis} dataKey="month" />
                  <YAxis
                    {...chartConfig.yAxis}
                    domain={[80, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="avgScore"
                    name="Average Score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Issues vs Improvements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.monthlyTrends}>
                  <CartesianGrid {...chartConfig.cartesianGrid} />
                  <XAxis {...chartConfig.xAxis} dataKey="month" />
                  <YAxis {...chartConfig.yAxis} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="issues"
                    name="Issues"
                    fill="hsl(var(--destructive))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="improvements"
                    name="Improvements"
                    fill="hsl(var(--success))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Criteria Performance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={mockData.criteriaScores}>
                  <CartesianGrid {...chartConfig.cartesianGrid} />
                  <XAxis {...chartConfig.xAxis} dataKey="month" />
                  <YAxis
                    {...chartConfig.yAxis}
                    domain={[80, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="edges"
                    name="Edge Sealing"
                    fill="hsl(var(--chart-1)/0.2)"
                    stroke="hsl(var(--chart-1))"
                  />
                  <Area
                    type="monotone"
                    dataKey="bubbles"
                    name="Bubble-Free"
                    fill="hsl(var(--chart-2)/0.2)"
                    stroke="hsl(var(--chart-2))"
                  />
                  <Area
                    type="monotone"
                    dataKey="alignment"
                    name="Alignment"
                    fill="hsl(var(--chart-3)/0.2)"
                    stroke="hsl(var(--chart-3))"
                  />
                  <Area
                    type="monotone"
                    dataKey="clarity"
                    name="Clarity"
                    fill="hsl(var(--chart-4)/0.2)"
                    stroke="hsl(var(--chart-4))"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 