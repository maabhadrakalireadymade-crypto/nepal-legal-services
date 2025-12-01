'use client'

import { useState, useEffect } from 'react'
import { Building2, FileText, DollarSign, Users, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    completedApplications: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    activeUsers: 0
  })

  const [recentApplications, setRecentApplications] = useState([])

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    // TODO: Implement API call
    setStats({
      totalApplications: 156,
      pendingApplications: 23,
      completedApplications: 98,
      totalRevenue: 2340000,
      pendingPayments: 345000,
      activeUsers: 89
    })
  }

  const statCards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Pending',
      value: stats.pendingApplications,
      icon: Clock,
      color: 'bg-yellow-500',
      change: '+5%'
    },
    {
      title: 'Completed',
      value: stats.completedApplications,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+18%'
    },
    {
      title: 'Total Revenue',
      value: `NPR ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      change: '+25%'
    },
    {
      title: 'Pending Payments',
      value: `NPR ${stats.pendingPayments.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '-8%'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: Users,
      color: 'bg-indigo-500',
      change: '+15%'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-nepal-blue" />
            <span className="text-2xl font-bold text-nepal-blue">Admin Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <button className="bg-nepal-red text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Applications</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Application ID</th>
                  <th className="text-left py-3 px-4">Company Name</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">NLS-{Date.now() - item * 1000}</td>
                    <td className="py-3 px-4">Sample Company {item}</td>
                    <td className="py-3 px-4">Private Ltd</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                    <td className="py-3 px-4">NPR 15,000</td>
                    <td className="py-3 px-4">{new Date().toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <button className="text-nepal-blue hover:underline text-sm">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
