"use client"

import { useState, useMemo } from "react"
import MessageCard from "../../components/message-card"
import CommentAnalysisChart from "../../components/comment-analysis-chart" // Import the new chart component

export default function DashboardPage() {
  const [userComments, setUserComments] = useState([])
  const [filterCategory, setFilterCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [newComment, setNewComment] = useState("")

  const analyzeComment = (commentText) => {
    const categories = ["Normal", "Abusive", "Bullying", "Hate Speech"]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    return {
      id: Date.now().toString(),
      username: "You", // Assuming the user is "You" for submitted comments
      message: commentText,
      category: randomCategory,
      timestamp: new Date().toISOString(),
    }
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      const analyzed = analyzeComment(newComment)
      setUserComments((prevComments) => [analyzed, ...prevComments])
      setNewComment("")
    }
  }

  const filteredMessages = useMemo(() => {
    let filtered = userComments

    if (filterCategory !== "All") {
      filtered = filtered.filter((message) => message.category === filterCategory)
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (message) =>
          message.username.toLowerCase().includes(lowerCaseSearchTerm) ||
          message.message.toLowerCase().includes(lowerCaseSearchTerm),
      )
    }

    return filtered
  }, [filterCategory, searchTerm, userComments]) // Added userComments to dependency array

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard</h2>

      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Analyze Your Comment</h3>
        <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
          <textarea
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-50"
            rows="4"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Analyze Comment
          </button>
        </form>
        {userComments.length > 0 && (
          <div className="mt-6">
            <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Your Comments Analysis</h4>
            <CommentAnalysisChart comments={userComments} />
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search by username or message..."
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="w-full md:w-auto p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-50"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Normal">Normal</option>
            <option value="Abusive">Abusive</option>
            <option value="Bullying">Bullying</option>
            <option value="Hate Speech">Hate Speech</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => <MessageCard key={message.id} message={message} />)
        ) : (
          <p className="text-gray-600 dark:text-gray-300 col-span-full text-center">
            No messages found matching your criteria.
          </p>
        )}
      </div>
    </div>
  )
}
