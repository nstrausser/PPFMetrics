"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
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
  summary: {
    averageScore: 92,
    totalChecks: 156,
    passRate: 94,
    issuesFound: 12,
    improvementRate: 85,
  },
  trendsData: [
    { month: 'Jan', score: 89, issues: 5 },
    { month: 'Feb', score: 91, issues: 4 },
    { month: 'Mar', score: 90, issues: 6 },
    { month: 'Apr', score: 93, issues: 3 },
    { month: 'May', score: 92, issues: 4 },
    { month: 'Jun', score: 94, issues: 2 },
  ],
  issueTypes: [
    { name: 'Bubbles', value: 35 },
    { name: 'Edge Lifting', value: 25 },
    { name: 'Debris', value: 20 },
    { name: 'Alignment', value: 15 },
    { name: 'Scratches', value: 5 },
  ],
  installerPerformance: [
    { name: 'John S.', score: 95, checks: 45 },
    { name: 'Sarah J.', score: 92, checks: 38 },
    { name: 'Mike W.', score: 88, checks: 42 },
    { name: 'Alice B.', score: 91, checks: 31 },
  ],
}

const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#ca8a04', '#6366f1']

const timeRanges = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: '1y', label: 'Last Year' },
]

export function QualityMetricsView() {
  const [timeRange, setTimeRange] = useState('30d')

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
              {entry.name === 'Score' ? '%' : ''}
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
        <h2 className="text-3xl font-bold">Quality Metrics</h2>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.summary.averageScore}%</div>
            <Progress value={mockData.summary.averageScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.summary.passRate}%</div>
            <Progress value={mockData.summary.passRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.summary.totalChecks}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Issues Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.summary.issuesFound}</div>
            <Progress 
              value={100 - (mockData.summary.issuesFound / mockData.summary.totalChecks * 100)} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quality Score Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.trendsData}>
                  <CartesianGrid {...chartConfig.cartesianGrid} />
                  <XAxis {...chartConfig.xAxis} dataKey="month" />
                  <YAxis {...chartConfig.yAxis} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    name="Score"
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
            <CardTitle>Issue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.issueTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockData.issueTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {mockData.issueTypes.map((type, index) => (
                  <div key={type.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{type.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 