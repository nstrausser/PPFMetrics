"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const mockData = {
  averageScore: 92,
  totalChecks: 156,
  passRate: 94,
  issuesFound: 12,
  weeklyScores: [
    { day: 'Mon', score: 94 },
    { day: 'Tue', score: 91 },
    { day: 'Wed', score: 93 },
    { day: 'Thu', score: 89 },
    { day: 'Fri', score: 95 },
  ],
}

export function QualityMetrics() {
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
      tickFormatter: (value: number) => `${value}%`,
    },
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.averageScore}%</div>
          <Progress
            value={mockData.averageScore}
            className="mt-2 bg-green-100 dark:bg-green-900"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total Checks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.totalChecks}</div>
          <p className="text-xs text-muted-foreground">
            Last 30 days
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.passRate}%</div>
          <Progress
            value={mockData.passRate}
            className="mt-2 bg-blue-100 dark:bg-blue-900"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Issues Found</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.issuesFound}</div>
          <p className="text-xs text-muted-foreground">
            Requiring attention
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Weekly Quality Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.weeklyScores}>
                <CartesianGrid {...chartConfig.cartesianGrid} />
                <XAxis {...chartConfig.xAxis} dataKey="day" />
                <YAxis {...chartConfig.yAxis} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Bar
                  dataKey="score"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}