"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts"
import { Heart, Moon, Brain, Activity, Bell, Settings, User, TrendingUp, Clock, Zap, AlertCircle } from "lucide-react"

// Mock data for demonstration
const heartRateData = [
  { time: "6:00", rate: 72, zone: "Resting" },
  { time: "9:00", rate: 78, zone: "Light" },
  { time: "12:00", rate: 85, zone: "Moderate" },
  { time: "15:00", rate: 82, zone: "Moderate" },
  { time: "18:00", rate: 75, zone: "Light" },
  { time: "21:00", rate: 70, zone: "Resting" },
]

const detailedHeartData = [
  { time: "00:00", rate: 65 },
  { time: "02:00", rate: 62 },
  { time: "04:00", rate: 60 },
  { time: "06:00", rate: 68 },
  { time: "08:00", rate: 75 },
  { time: "10:00", rate: 82 },
  { time: "12:00", rate: 88 },
  { time: "14:00", rate: 85 },
  { time: "16:00", rate: 79 },
  { time: "18:00", rate: 76 },
  { time: "20:00", rate: 72 },
  { time: "22:00", rate: 68 },
]

const sleepData = [
  { day: "Mon", hours: 7.5, deep: 2.1, light: 4.2, rem: 1.2 },
  { day: "Tue", hours: 8.2, deep: 2.4, light: 4.5, rem: 1.3 },
  { day: "Wed", hours: 6.8, deep: 1.8, light: 3.8, rem: 1.2 },
  { day: "Thu", hours: 7.9, deep: 2.2, light: 4.3, rem: 1.4 },
  { day: "Fri", hours: 8.1, deep: 2.3, light: 4.4, rem: 1.4 },
  { day: "Sat", hours: 8.5, deep: 2.5, light: 4.6, rem: 1.4 },
  { day: "Sun", hours: 7.8, deep: 2.1, light: 4.2, rem: 1.5 },
]

const sleepStagesData = [
  { time: "22:00", stage: "Awake", value: 1 },
  { time: "22:30", stage: "Light", value: 2 },
  { time: "23:00", stage: "Deep", value: 4 },
  { time: "23:30", stage: "Deep", value: 4 },
  { time: "00:00", stage: "REM", value: 3 },
  { time: "00:30", stage: "Light", value: 2 },
  { time: "01:00", stage: "Deep", value: 4 },
  { time: "01:30", stage: "Deep", value: 4 },
  { time: "02:00", stage: "REM", value: 3 },
  { time: "02:30", stage: "Light", value: 2 },
  { time: "03:00", stage: "Deep", value: 4 },
  { time: "03:30", stage: "REM", value: 3 },
  { time: "04:00", stage: "Light", value: 2 },
  { time: "04:30", stage: "REM", value: 3 },
  { time: "05:00", stage: "Light", value: 2 },
  { time: "05:30", stage: "Awake", value: 1 },
  { time: "06:00", stage: "Awake", value: 1 },
]

const stressLevels = [
  { time: "6:00", level: 2, hrv: 45, activity: "Waking up" },
  { time: "9:00", level: 4, hrv: 38, activity: "Morning routine" },
  { time: "12:00", level: 6, hrv: 32, activity: "Work meeting" },
  { time: "15:00", level: 3, hrv: 42, activity: "Lunch break" },
  { time: "18:00", level: 2, hrv: 46, activity: "Evening walk" },
  { time: "21:00", level: 1, hrv: 48, activity: "Relaxing" },
]

const stressWeeklyData = [
  { day: "Mon", morning: 3, afternoon: 5, evening: 2 },
  { day: "Tue", morning: 2, afternoon: 4, evening: 1 },
  { day: "Wed", morning: 4, afternoon: 6, evening: 3 },
  { day: "Thu", morning: 2, afternoon: 3, evening: 1 },
  { day: "Fri", morning: 3, afternoon: 7, evening: 2 },
  { day: "Sat", morning: 1, afternoon: 2, evening: 1 },
  { day: "Sun", morning: 1, afternoon: 2, evening: 1 },
]

export function HealthDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const getHeartRateZoneColor = (rate: number) => {
    if (rate < 70) return "text-blue-600"
    if (rate < 85) return "text-green-600"
    if (rate < 100) return "text-yellow-600"
    return "text-red-600"
  }

  const getStressInfo = (level: number) => {
    if (level <= 2) return { color: "text-green-600", desc: "Very Low", bgColor: "bg-green-50" }
    if (level <= 4) return { color: "text-yellow-600", desc: "Moderate", bgColor: "bg-yellow-50" }
    if (level <= 6) return { color: "text-orange-600", desc: "Elevated", bgColor: "bg-orange-50" }
    return { color: "text-red-600", desc: "High", bgColor: "bg-red-50" }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">HealthCare Monitor</h1>
                <p className="text-muted-foreground">Your personal health companion</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="lg">
                <Bell className="mr-2 h-5 w-5" />
                Alerts
              </Button>
              <Button variant="outline" size="lg">
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
              <Button variant="outline" size="lg">
                <User className="mr-2 h-5 w-5" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 h-14 text-lg">
            <TabsTrigger value="overview" className="py-3 font-mono font-extrabold text-base text-black border-lime-900 rounded-4xl shadow-xl bg-lime-500">
              <Activity className="mr-2 h-5 w-5" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="heart" className="py-3 font-mono font-extrabold text-base tracking-wide text-black border-red-950 rounded-4xl bg-red-700">
              <Heart className="mr-2 h-5 w-5" />
              Heart Rate
            </TabsTrigger>
            <TabsTrigger value="sleep" className="py-3 font-mono font-extrabold text-base tracking-normal text-black bg-zinc-500 border-black rounded-4xl">
              <Moon className="mr-2 h-5 w-5" />
              Sleep
            </TabsTrigger>
            <TabsTrigger value="stress" className="py-3 font-mono font-extrabold text-base tracking-normal text-black bg-purple-400 border-violet-900 rounded-4xl">
              <Brain className="mr-2 h-5 w-5" />
              Stress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Welcome Section */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">Good Morning, John!</CardTitle>
                <CardDescription className="text-lg text-gray-700 dark:text-gray-300">
                  Here's your health summary for today,{" "}
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Quick Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">Current Heart Rate</CardTitle>
                  <Heart className="h-6 w-6 text-chart-1" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chart-1">72 BPM</div>
                  <Badge variant="secondary" className="mt-2">
                    Normal
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">Last Night's Sleep</CardTitle>
                  <Moon className="h-6 w-6 text-chart-2" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chart-2">7h 45m</div>
                  <Badge variant="secondary" className="mt-2">
                    Good Quality
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">Stress Level</CardTitle>
                  <Brain className="h-6 w-6 text-chart-3" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chart-3">Low</div>
                  <Progress value={25} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">Daily Activity</CardTitle>
                  <Activity className="h-6 w-6 text-chart-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-chart-4">4,250</div>
                  <p className="text-sm text-muted-foreground mt-1">steps today</p>
                </CardContent>
              </Card>
            </div>

            {/* Today's Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Today's Health Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Heart Health</h4>
                    <p className="text-muted-foreground">
                      Your heart rate is stable. Consider a 15-minute walk after lunch.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Moon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Sleep Quality</h4>
                    <p className="text-muted-foreground">
                      Great sleep last night! Try to maintain your bedtime routine.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Stress Management</h4>
                    <p className="text-muted-foreground">
                      Low stress levels detected. Keep up the relaxation techniques.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="heart" className="space-y-6">
            {/* Real-time Heart Rate Card */}
            <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-red-700">Live Heart Rate</CardTitle>
                    <CardDescription className="text-lg text-red-600">Real-time monitoring</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-red-600 font-medium">LIVE</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-5xl font-bold text-red-700 mb-2">72</div>
                    <div className="text-xl text-red-600">BPM</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-2 text-lg px-3 py-1">
                      Resting Zone
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      <div>Target: 60-100 BPM</div>
                      <div>Last updated: Just now</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 24-Hour Heart Rate Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  24-Hour Heart Rate Trend
                </CardTitle>
                <CardDescription className="text-lg">Detailed heart rate patterns throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={detailedHeartData}>
                      <defs>
                        <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[50, 100]} />
                      <Tooltip
                        formatter={(value) => [`${value} BPM`, "Heart Rate"]}
                        labelFormatter={(label) => `Time: ${label}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="rate"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={3}
                        fill="url(#heartGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Heart Rate Zones and Statistics */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-700">Resting Zone</CardTitle>
                  <CardDescription className="text-blue-600">50-70 BPM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700 mb-1">6h 45m</div>
                  <div className="text-sm text-blue-600">Time in zone today</div>
                  <Progress value={75} className="mt-2 bg-blue-100" />
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-700">Fat Burn Zone</CardTitle>
                  <CardDescription className="text-green-600">70-85 BPM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700 mb-1">2h 15m</div>
                  <div className="text-sm text-green-600">Time in zone today</div>
                  <Progress value={45} className="mt-2 bg-green-100" />
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-yellow-700">Cardio Zone</CardTitle>
                  <CardDescription className="text-yellow-600">85-100 BPM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-700 mb-1">45m</div>
                  <div className="text-sm text-yellow-600">Time in zone today</div>
                  <Progress value={25} className="mt-2 bg-yellow-100" />
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-red-700">Peak Zone</CardTitle>
                  <CardDescription className="text-red-600">100+ BPM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-700 mb-1">12m</div>
                  <div className="text-sm text-red-600">Time in zone today</div>
                  <Progress value={10} className="mt-2 bg-red-100" />
                </CardContent>
              </Card>
            </div>

            {/* Heart Rate Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Heart Rate Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium text-green-700">Excellent Recovery</h4>
                    </div>
                    <p className="text-green-600 text-sm">
                      Your heart rate returned to resting levels quickly after activity, indicating good cardiovascular
                      fitness.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <h4 className="font-medium text-blue-700">Consistent Pattern</h4>
                    </div>
                    <p className="text-blue-600 text-sm">
                      Your resting heart rate has been stable at 68-72 BPM over the past week.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sleep" className="space-y-6">
            {/* Sleep Summary Card */}
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="text-2xl text-indigo-700">Last Night's Sleep</CardTitle>
                <CardDescription className="text-lg text-indigo-600">
                  {new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-700 mb-1">7h 45m</div>
                    <div className="text-indigo-600">Total Sleep</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-700 mb-1">85%</div>
                    <div className="text-purple-600">Sleep Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-pink-700 mb-1">2</div>
                    <div className="text-pink-600">Times Awake</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sleep Stages Visualization */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Moon className="h-5 w-5" />
                  Sleep Stages Timeline
                </CardTitle>
                <CardDescription className="text-lg">Your sleep cycle breakdown from last night</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sleepStagesData}>
                      <defs>
                        <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis
                        domain={[0, 5]}
                        tickFormatter={(value) => {
                          const stages = ["", "Awake", "Light", "REM", "Deep"]
                          return stages[value] || ""
                        }}
                      />
                      <Tooltip
                        formatter={(value) => {
                          const stages = ["", "Awake", "Light Sleep", "REM Sleep", "Deep Sleep"]
                          return [stages[value as number], "Sleep Stage"]
                        }}
                        labelFormatter={(label) => `Time: ${label}`}
                      />
                      <Area
                        type="stepAfter"
                        dataKey="value"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        fill="url(#sleepGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Sleep Stage Legend */}
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded"></div>
                    <span className="text-sm">Awake</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded"></div>
                    <span className="text-sm">Light Sleep</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded"></div>
                    <span className="text-sm">REM Sleep</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-600 rounded"></div>
                    <span className="text-sm">Deep Sleep</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Sleep Pattern */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Weekly Sleep Pattern</CardTitle>
                <CardDescription className="text-lg">Sleep duration and quality over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sleepData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip
                        formatter={(value, name) => {
                          const labels = {
                            hours: "Total Sleep",
                            deep: "Deep Sleep",
                            light: "Light Sleep",
                            rem: "REM Sleep",
                          }
                          return [`${value}h`, labels[name as keyof typeof labels]]
                        }}
                      />
                      <Bar dataKey="deep" stackId="sleep" fill="hsl(var(--chart-1))" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="rem" stackId="sleep" fill="hsl(var(--chart-2))" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="light" stackId="sleep" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Sleep Statistics */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="bg-indigo-50 border-indigo-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-indigo-700">Deep Sleep</CardTitle>
                  <CardDescription className="text-indigo-600">Restorative phase</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-700 mb-1">2h 15m</div>
                  <div className="text-sm text-indigo-600">29% of total sleep</div>
                  <Badge variant="secondary" className="mt-2 bg-indigo-100 text-indigo-700">
                    Excellent
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-purple-700">REM Sleep</CardTitle>
                  <CardDescription className="text-purple-600">Dream phase</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-700 mb-1">1h 30m</div>
                  <div className="text-sm text-purple-600">19% of total sleep</div>
                  <Badge variant="secondary" className="mt-2 bg-purple-100 text-purple-700">
                    Good
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-700">Sleep Debt</CardTitle>
                  <CardDescription className="text-blue-600">Weekly balance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700 mb-1">+45m</div>
                  <div className="text-sm text-green-600">Surplus this week</div>
                  <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700">
                    Healthy
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-teal-50 border-teal-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-teal-700">Sleep Score</CardTitle>
                  <CardDescription className="text-teal-600">Overall quality</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-teal-700 mb-1">87</div>
                  <div className="text-sm text-teal-600">Out of 100</div>
                  <Progress value={87} className="mt-2 bg-teal-100" />
                </CardContent>
              </Card>
            </div>

            {/* Sleep Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Sleep Optimization Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Moon className="h-5 w-5 text-indigo-600" />
                      <h4 className="font-medium text-indigo-700">Maintain Consistency</h4>
                    </div>
                    <p className="text-indigo-600 text-sm">
                      Your bedtime varies by 45 minutes. Try going to bed at the same time each night.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-purple-600" />
                      <h4 className="font-medium text-purple-700">Optimize Environment</h4>
                    </div>
                    <p className="text-purple-600 text-sm">
                      Keep your bedroom cool (65-68°F) and dark for better deep sleep quality.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stress" className="space-y-6">
            {/* Current Stress Level */}
            <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-700">Current Stress Level</CardTitle>
                <CardDescription className="text-lg text-emerald-600">
                  Based on heart rate variability and activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-5xl font-bold text-emerald-700 mb-2">Low</div>
                    <div className="text-xl text-emerald-600">Stress Score: 2/10</div>
                  </div>
                  <div className="text-right">
                    <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                      <Brain className="h-12 w-12 text-emerald-600" />
                    </div>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                      Relaxed State
                    </Badge>
                  </div>
                </div>
                <Progress value={20} className="mt-4 bg-emerald-100" />
              </CardContent>
            </Card>

            {/* Stress Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Daily Stress Pattern
                </CardTitle>
                <CardDescription className="text-lg">
                  Stress levels and heart rate variability throughout today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stressLevels}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip
                        formatter={(value, name) => {
                          if (name === "level") {
                            const stressInfo = getStressInfo(value as number)
                            return [`${value}/10 (${stressInfo.desc})`, "Stress Level"]
                          }
                          return [`${value}ms`, "Heart Rate Variability"]
                        }}
                        labelFormatter={(label) => `Time: ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="level"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="hrv"
                        stroke="hsl(var(--chart-4))"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 mt-4 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-chart-3 rounded"></div>
                    <span className="text-sm">Stress Level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-chart-4 rounded" style={{ borderStyle: "dashed" }}></div>
                    <span className="text-sm">Heart Rate Variability</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Stress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Weekly Stress Overview</CardTitle>
                <CardDescription className="text-lg">Stress patterns by time of day over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stressWeeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 8]} />
                      <Tooltip
                        formatter={(value, name) => {
                          const labels = {
                            morning: "Morning Stress",
                            afternoon: "Afternoon Stress",
                            evening: "Evening Stress",
                          }
                          return [`${value}/10`, labels[name as keyof typeof labels]]
                        }}
                      />
                      <Bar dataKey="morning" fill="hsl(var(--chart-1))" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="afternoon" fill="hsl(var(--chart-2))" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="evening" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Stress Factors and Triggers */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Stress Triggers Identified
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-orange-700">Work Meetings</span>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        High Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-orange-600">Peak stress at 12:00 PM during meetings</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-yellow-700">Morning Rush</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                        Medium Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-yellow-600">Elevated stress during morning routine</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-blue-700">Evening Activities</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        Low Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-600">Consistently low stress in evenings</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Stress Relief Activities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">1</span>
                      </div>
                      <h4 className="font-medium text-green-700">Deep Breathing Exercise</h4>
                    </div>
                    <p className="text-green-600 text-sm mb-2">
                      Practice 4-7-8 breathing: Inhale for 4, hold for 7, exhale for 8
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent"
                    >
                      Start 5-min session
                    </Button>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">2</span>
                      </div>
                      <h4 className="font-medium text-blue-700">Mindful Walking</h4>
                    </div>
                    <p className="text-blue-600 text-sm mb-2">Take a 10-minute walk focusing on your surroundings</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
                    >
                      Set walking reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stress Management Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Personalized Stress Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                      <h4 className="font-medium text-emerald-700">Improving Trend</h4>
                    </div>
                    <p className="text-emerald-600 text-sm">
                      Your average stress level has decreased by 15% this week compared to last week.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <h4 className="font-medium text-blue-700">Best Recovery Time</h4>
                    </div>
                    <p className="text-blue-600 text-sm">
                      You recover from stress fastest during evening hours (6-8 PM).
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-5 w-5 text-purple-600" />
                      <h4 className="font-medium text-purple-700">HRV Improvement</h4>
                    </div>
                    <p className="text-purple-600 text-sm">
                      Your heart rate variability has improved, indicating better stress resilience.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
