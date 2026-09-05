import React from 'react'

const PromptBox = ({
  question,
  setQuestion,
  askquestion,
  theme
}) => {

  const isDark = theme === 'dark'
  const hasText = question.trim().length > 0

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      if (hasText) {
        askquestion()
      }
    }
  }

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 z-20 px-3 pb-3 pt-6 sm:px-5 sm:pb-5 sm:pt-8 ${
        isDark
          ? 'bg-linear-to-t from-[#212121] via-[#212121]/95 to-transparent'
          : 'bg-linear-to-t from-white via-white/95 to-transparent'
      }`}
    >

      <div className="w-full max-w-3xl mx-auto">

        {/* Input Box */}

        <div
          className={`flex items-end gap-2 sm:gap-3 rounded-2xl border p-2 sm:p-2.5 shadow-lg transition-all duration-200 ${
            isDark
              ? 'bg-[#2f2f2f] border-[#424242] shadow-black/20 focus-within:border-[#555]'
              : 'bg-white border-gray-200 shadow-gray-200/60 focus-within:border-gray-300'
          }`}
        >

          {/* Text Input */}

          <textarea
            rows="1"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className={`flex-1 min-w-0 max-h-32 resize-none bg-transparent outline-none px-2 sm:px-3 py-2 text-sm sm:text-[15px] leading-6 ${
              isDark
                ? 'text-gray-100 placeholder-gray-500'
                : 'text-gray-900 placeholder-gray-400'
            }`}
          />


          {/* Send Button */}

          <button
            onClick={askquestion}
            disabled={!hasText}
            aria-label="Send message"
            className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
              hasText
                ? isDark
                  ? 'bg-white text-black hover:bg-gray-200 active:scale-95'
                  : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95'
                : isDark
                  ? 'bg-[#424242] text-gray-600 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >

            {/* Arrow Icon */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 sm:w-5 sm:h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>

          </button>

        </div>


        {/* Small Hint */}

        <p
          className={`hidden sm:block text-center text-[11px] mt-2 ${
            isDark
              ? 'text-gray-600'
              : 'text-gray-400'
          }`}
        >
          Press Enter to send • Shift + Enter for new line
        </p>

      </div>

    </div>
  )
}

export default PromptBox