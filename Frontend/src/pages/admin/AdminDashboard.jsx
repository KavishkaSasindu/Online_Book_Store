import React, { useState } from "react";
import {
  BarChart3,
  BookOpen,
  Users,
  BookMarked,
  Activity,
  TrendingUp,
  Clock,
  ShoppingCart,
  User,
  Library,
  Info,
  ChevronRight,
  Gift,
} from "lucide-react";

const AdminDashboard = () => {
  const [period, setPeriod] = useState("weekly");

  // Sample data - in a real app, this would come from your API
  const stats = {
    totalUsers: 2456,
    activeUsers: 1889,
    totalBooks: 4532,
    availableBooks: 3812,
    totalAuthors: 876,
    totalBorrows: 12453,
    recentReviews: [
      {
        id: 1,
        user: "Emily Chen",
        book: "The Silent Patient",
        rating: 4.5,
        comment: "Absolutely thrilling! I couldn't put it down.",
        date: "2 hours ago",
      },
      {
        id: 2,
        user: "Michael Johnson",
        book: "Atomic Habits",
        rating: 5,
        comment:
          "Life-changing concepts presented in an easy to understand way.",
        date: "5 hours ago",
      },
      {
        id: 3,
        user: "Sarah Miller",
        book: "Project Hail Mary",
        rating: 4,
        comment: "Great sci-fi with interesting scientific concepts.",
        date: "1 day ago",
      },
      {
        id: 4,
        user: "David Thompson",
        book: "The Midnight Library",
        rating: 4.5,
        comment: "Beautiful story about life choices.",
        date: "1 day ago",
      },
    ],
    popularBooks: [
      {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        borrows: 452,
        wishlist: 328,
      },
      {
        id: 2,
        title: "Project Hail Mary",
        author: "Andy Weir",
        borrows: 385,
        wishlist: 276,
      },
      {
        id: 3,
        title: "The Midnight Library",
        author: "Matt Haig",
        borrows: 332,
        wishlist: 289,
      },
      {
        id: 4,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        borrows: 312,
        wishlist: 245,
      },
    ],
    recentActions: [
      {
        id: 1,
        action: "New user registered",
        user: "Alex Johnson",
        time: "10 minutes ago",
      },
      {
        id: 2,
        action: "Book borrowed",
        user: "Karen Smith",
        book: "The Alchemist",
        time: "25 minutes ago",
      },
      {
        id: 3,
        action: "New book added",
        book: "The Last Thing He Told Me",
        admin: "Admin",
        time: "1 hour ago",
      },
      {
        id: 4,
        action: "Book returned",
        user: "Jason Miller",
        book: "Educated",
        time: "2 hours ago",
      },
      {
        id: 5,
        action: "Review submitted",
        user: "Michelle Wang",
        book: "Where the Crawdads Sing",
        time: "3 hours ago",
      },
    ],
  };

  return (
    <div className="bg-[#F9F7EC] min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#3A3728] mb-6">
          Admin Dashboard
        </h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-[#504B38]">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-[#504B38]">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-[#3A3728]">
                  {stats.totalUsers}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  +12% from last month
                </p>
              </div>
              <div className="bg-[#EBE5C2] p-3 rounded-full">
                <Users className="h-6 w-6 text-[#504B38]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-[#504B38]">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-[#504B38]">
                  Total Books
                </p>
                <p className="text-2xl font-bold text-[#3A3728]">
                  {stats.totalBooks}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  +8% from last month
                </p>
              </div>
              <div className="bg-[#EBE5C2] p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-[#504B38]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-[#504B38]">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-[#504B38]">
                  Active Authors
                </p>
                <p className="text-2xl font-bold text-[#3A3728]">
                  {stats.totalAuthors}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  +5% from last month
                </p>
              </div>
              <div className="bg-[#EBE5C2] p-3 rounded-full">
                <User className="h-6 w-6 text-[#504B38]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-[#504B38]">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-[#504B38]">
                  Total Borrows
                </p>
                <p className="text-2xl font-bold text-[#3A3728]">
                  {stats.totalBorrows}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  +15% from last month
                </p>
              </div>
              <div className="bg-[#EBE5C2] p-3 rounded-full">
                <BookMarked className="h-6 w-6 text-[#504B38]" />
              </div>
            </div>
          </div>
        </div>

        {/* Activity Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#3A3728]">
                User Activity
              </h2>
              <div className="bg-[#EBE5C2] rounded-md overflow-hidden">
                <select
                  className="bg-transparent border-0 text-[#504B38] p-2 text-sm font-medium focus:outline-none"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center p-6 bg-[#F9F7EC] rounded-lg">
                <Activity className="h-10 w-10 text-[#504B38] mx-auto mb-2" />
                <p className="text-[#3A3728]">
                  Activity chart would render here
                </p>
                <p className="text-sm text-[#504B38]">
                  Displaying {period} user activity data
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#3A3728]">Book Borrows</h2>
              <div className="bg-[#EBE5C2] rounded-md overflow-hidden">
                <select
                  className="bg-transparent border-0 text-[#504B38] p-2 text-sm font-medium focus:outline-none"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center p-6 bg-[#F9F7EC] rounded-lg">
                <BarChart3 className="h-10 w-10 text-[#504B38] mx-auto mb-2" />
                <p className="text-[#3A3728]">
                  Borrow statistics chart would render here
                </p>
                <p className="text-sm text-[#504B38]">
                  Displaying {period} borrow trends
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Books & Recent Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-[#EBE5C2]">
              <h2 className="text-lg font-bold text-[#3A3728] flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-[#504B38]" />
                Popular Books
              </h2>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-[#F9F7EC]">
                      <th className="px-4 py-2 text-left text-xs font-medium text-[#504B38] uppercase tracking-wider">
                        Book
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[#504B38] uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[#504B38] uppercase tracking-wider">
                        Borrows
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[#504B38] uppercase tracking-wider">
                        Wishlist
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EBE5C2]">
                    {stats.popularBooks.map((book) => (
                      <tr key={book.id} className="hover:bg-[#F9F7EC]">
                        <td className="px-4 py-3 text-sm text-[#3A3728] font-medium">
                          {book.title}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#504B38]">
                          {book.author}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#504B38]">
                          {book.borrows}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#504B38]">
                          {book.wishlist}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pt-4 pb-2 border-t border-[#EBE5C2] mt-4">
                <a
                  href="/admin/books"
                  className="text-[#504B38] hover:text-[#3A3728] text-sm font-medium flex items-center"
                >
                  View all books
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-[#EBE5C2]">
              <h2 className="text-lg font-bold text-[#3A3728] flex items-center">
                <Info className="h-5 w-5 mr-2 text-[#504B38]" />
                Recent Reviews
              </h2>
            </div>
            <div className="divide-y divide-[#EBE5C2]">
              {stats.recentReviews.map((review) => (
                <div key={review.id} className="p-4 hover:bg-[#F9F7EC]">
                  <div className="flex justify-between mb-1">
                    <p className="font-medium text-[#3A3728]">{review.book}</p>
                    <div className="flex items-center">
                      {[...Array(Math.floor(review.rating))].map((_, i) => (
                        <span key={i} className="text-yellow-500">
                          ★
                        </span>
                      ))}
                      {review.rating % 1 !== 0 && (
                        <span className="text-yellow-500">½</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#504B38] mb-2">
                    "{review.comment}"
                  </p>
                  <div className="flex justify-between items-center text-xs">
                    <p className="text-[#504B38]">by {review.user}</p>
                    <p className="text-[#504B38]">{review.date}</p>
                  </div>
                </div>
              ))}
              <div className="p-4">
                <a
                  href="/admin/reviews"
                  className="text-[#504B38] hover:text-[#3A3728] text-sm font-medium flex items-center"
                >
                  View all reviews
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-[#EBE5C2]">
            <h2 className="text-lg font-bold text-[#3A3728] flex items-center">
              <Clock className="h-5 w-5 mr-2 text-[#504B38]" />
              Recent Activity
            </h2>
          </div>
          <div className="p-4">
            <div className="flow-root">
              <ul className="divide-y divide-[#EBE5C2]">
                {stats.recentActions.map((action) => (
                  <li
                    key={action.id}
                    className="py-3 flex hover:bg-[#F9F7EC] px-2 rounded"
                  >
                    <div className="flex-shrink-0 mr-3">
                      {action.action.includes("borrowed") ? (
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <BookMarked className="h-4 w-4 text-blue-600" />
                        </div>
                      ) : action.action.includes("registered") ? (
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-green-600" />
                        </div>
                      ) : action.action.includes("added") ? (
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <Library className="h-4 w-4 text-purple-600" />
                        </div>
                      ) : action.action.includes("returned") ? (
                        <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-yellow-600" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-[#EBE5C2] flex items-center justify-center">
                          <Gift className="h-4 w-4 text-[#504B38]" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#3A3728]">
                        {action.action}
                        {action.user && (
                          <span>
                            {" "}
                            by{" "}
                            <span className="font-semibold">{action.user}</span>
                          </span>
                        )}
                        {action.book && (
                          <span>
                            {" "}
                            - <span className="italic">{action.book}</span>
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-[#504B38]">{action.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 pb-2 border-t border-[#EBE5C2] mt-4">
              <a
                href="/admin/activity"
                className="text-[#504B38] hover:text-[#3A3728] text-sm font-medium flex items-center"
              >
                View all activity
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-[#EBE5C2]">
            <h2 className="text-lg font-bold text-[#3A3728]">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/admin/books/add"
              className="flex flex-col items-center justify-center p-4 bg-[#F9F7EC] rounded-lg hover:bg-[#EBE5C2] transition-colors"
            >
              <BookOpen className="h-8 w-8 text-[#504B38] mb-2" />
              <span className="text-sm font-medium text-[#3A3728]">
                Add New Book
              </span>
            </a>
            <a
              href="/admin/users/add"
              className="flex flex-col items-center justify-center p-4 bg-[#F9F7EC] rounded-lg hover:bg-[#EBE5C2] transition-colors"
            >
              <User className="h-8 w-8 text-[#504B38] mb-2" />
              <span className="text-sm font-medium text-[#3A3728]">
                Add New User
              </span>
            </a>
            <a
              href="/admin/reports/generate"
              className="flex flex-col items-center justify-center p-4 bg-[#F9F7EC] rounded-lg hover:bg-[#EBE5C2] transition-colors"
            >
              <BarChart3 className="h-8 w-8 text-[#504B38] mb-2" />
              <span className="text-sm font-medium text-[#3A3728]">
                Generate Report
              </span>
            </a>
            <a
              href="/admin/settings"
              className="flex flex-col items-center justify-center p-4 bg-[#F9F7EC] rounded-lg hover:bg-[#EBE5C2] transition-colors"
            >
              <ShoppingCart className="h-8 w-8 text-[#504B38] mb-2" />
              <span className="text-sm font-medium text-[#3A3728]">
                Process Orders
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
