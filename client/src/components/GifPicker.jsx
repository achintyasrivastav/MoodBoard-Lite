import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

// Mock GIF data - in a real app, you'd use Giphy API
const TRENDING_GIFS = [
  {
    id: 1,
    url: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
    preview: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/200w.gif",
    title: "Happy Dance",
    tags: ["happy", "dance", "celebration"],
  },
  {
    id: 2,
    url: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    preview: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/200w.gif",
    title: "Excited",
    tags: ["excited", "happy", "yay"],
  },
  {
    id: 3,
    url: "https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif",
    preview: "https://media.giphy.com/media/26BRuo6sLetdllPAQ/200w.gif",
    title: "Thinking",
    tags: ["thinking", "confused", "hmm"],
  },
  {
    id: 4,
    url: "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif",
    preview: "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/200w.gif",
    title: "Love",
    tags: ["love", "heart", "romantic"],
  },
  {
    id: 5,
    url: "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif",
    preview: "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/200w.gif",
    title: "Sad",
    tags: ["sad", "crying", "upset"],
  },
  {
    id: 6,
    url: "https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif",
    preview: "https://media.giphy.com/media/l0HlvtIPzPdt2usKs/200w.gif",
    title: "Laughing",
    tags: ["laugh", "funny", "lol"],
  },
  {
    id: 7,
    url: "https://media.giphy.com/media/3o7aCRloybJlXpNjSU/giphy.gif",
    preview: "https://media.giphy.com/media/3o7aCRloybJlXpNjSU/200w.gif",
    title: "Sleepy",
    tags: ["tired", "sleepy", "yawn"],
  },
  {
    id: 8,
    url: "https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/giphy.gif",
    preview: "https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/200w.gif",
    title: "Party",
    tags: ["party", "celebration", "fun"],
  },
]

const MOOD_CATEGORIES = [
  { name: "Trending", emoji: "🔥", filter: () => true },
  {
    name: "Happy",
    emoji: "😊",
    filter: (gif) => gif.tags.some((tag) => ["happy", "excited", "celebration", "party"].includes(tag)),
  },
  { name: "Love", emoji: "❤️", filter: (gif) => gif.tags.some((tag) => ["love", "heart", "romantic"].includes(tag)) },
  { name: "Funny", emoji: "😂", filter: (gif) => gif.tags.some((tag) => ["laugh", "funny", "lol"].includes(tag)) },
  { name: "Sad", emoji: "😢", filter: (gif) => gif.tags.some((tag) => ["sad", "crying", "upset"].includes(tag)) },
  {
    name: "Thinking",
    emoji: "🤔",
    filter: (gif) => gif.tags.some((tag) => ["thinking", "confused", "hmm"].includes(tag)),
  },
]

export default function GifPicker({ isOpen, onClose, onSelectGif }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Trending")
  const [filteredGifs, setFilteredGifs] = useState(TRENDING_GIFS)
  const [loading, setLoading] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const category = MOOD_CATEGORIES.find((cat) => cat.name === selectedCategory)
    if (category) {
      setFilteredGifs(TRENDING_GIFS.filter(category.filter))
    }
  }, [selectedCategory])

  useEffect(() => {
    if (searchTerm) {
      setLoading(true)
      const timer = setTimeout(() => {
        const filtered = TRENDING_GIFS.filter(
          (gif) =>
            gif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gif.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
        )
        setFilteredGifs(filtered)
        setLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [searchTerm])

  const handleGifSelect = (gif) => {
    onSelectGif(gif.url)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`w-full max-w-md h-[70vh] ${theme.card} backdrop-blur-xl ${theme.border} border rounded-t-3xl overflow-hidden`}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`p-4 ${theme.border} border-b`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${theme.text}`}>Choose a GIF</h3>
              <motion.button
                onClick={onClose}
                className={`p-2 rounded-full ${theme.card} hover:${theme.button.replace("bg-", "hover:bg-")} transition-colors`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className={theme.text}>✕</span>
              </motion.button>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search GIFs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-full ${theme.input} placeholder:${theme.textSecondary} focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-all duration-200`}
              />
              <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`}>🔍</span>
            </div>
          </div>

          {/* Categories */}
          <div className={`p-2 ${theme.border} border-b`}>
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {MOOD_CATEGORIES.map((category) => (
                <motion.button
                  key={category.name}
                  onClick={() => {
                    setSelectedCategory(category.name)
                    setSearchTerm("")
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category.name
                      ? `${theme.button} ${theme.text}`
                      : `${theme.card} ${theme.textSecondary} hover:${theme.text}`
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{category.emoji}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* GIF Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <motion.div
                  className={`w-8 h-8 border-2 ${theme.text.replace("text-", "border-")} border-t-transparent rounded-full`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </div>
            ) : filteredGifs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32">
                <span className="text-4xl mb-2">🤷‍♀️</span>
                <p className={`${theme.textSecondary} text-center`}>No GIFs found for "{searchTerm}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filteredGifs.map((gif, index) => (
                  <motion.button
                    key={gif.id}
                    onClick={() => handleGifSelect(gif)}
                    className="aspect-square rounded-xl overflow-hidden bg-gray-200 hover:ring-2 hover:ring-opacity-50 transition-all duration-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={gif.preview || gif.url}
                      alt={gif.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className={`p-3 ${theme.border} border-t`}>
            <p className={`text-xs ${theme.textSecondary} text-center`}>Powered by Giphy • Tap any GIF to select</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
