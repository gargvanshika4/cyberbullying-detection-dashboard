const MessageCard = ({ message }) => {
  const { username, message: text, category, timestamp } = message

  const categoryColors = {
    Normal: "card-normal",
    Abusive: "card-abusive",
    Bullying: "card-bullying",
    "Hate Speech": "card-hate-speech",
  }

  const categoryTextColors = {
    Normal: "text-green-800 dark:text-green-50",
    Abusive: "text-red-800 dark:text-red-50",
    Bullying: "text-orange-800 dark:text-orange-50",
    "Hate Speech": "text-yellow-800 dark:text-yellow-50",
  }

  return (
    <div className={`p-4 rounded-lg shadow-md border-l-4 ${categoryColors[category]} transition-colors duration-200`}>
      <div className="flex justify-between items-start mb-2">
        <span className="font-semibold text-gray-800 dark:text-gray-100">{username}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(timestamp).toLocaleString()}</span>
      </div>
      <p className="text-gray-700 dark:text-gray-200 mb-3">{text}</p>
      <div className="flex justify-end">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryTextColors[category]}`}
        >
          {category}
        </span>
      </div>
    </div>
  )
}

export default MessageCard
