import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MessageActions from './MessageAction.jsx'
const Chat = ({
  messages,
  loading,
  theme,
  onRegenerate
}) => {

  const isDark = theme === 'dark'

  return (
    <div
      className={`h-full overflow-y-auto scroll-smooth ${
        isDark
          ? 'bg-[#212121] text-gray-100'
          : 'bg-white text-gray-900'
      }`}
    >

      {/* =========================
          EMPTY STATE
      ========================= */}

      {messages.length === 0 && !loading && (

        <div className="min-h-full flex items-center justify-center px-5 pb-28">

          <div className="text-center">

            <div
              className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold shadow-sm ${
                isDark
                  ? 'bg-white text-black'
                  : 'bg-gray-900 text-white'
              }`}
            >
              AI
            </div>

            <h1
              className={`text-2xl sm:text-3xl font-semibold tracking-tight ${
                isDark
                  ? 'text-gray-100'
                  : 'text-gray-900'
              }`}
            >
              How can I help you?
            </h1>

            <p
              className={`mt-2 text-sm ${
                isDark
                  ? 'text-gray-500'
                  : 'text-gray-500'
              }`}
            >
              Ask anything and let's get started.
            </p>

          </div>

        </div>

      )}


      {/* =========================
          CHAT CONTENT
      ========================= */}

      {(messages.length > 0 || loading) && (

        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-32">

          <div className="space-y-8 sm:space-y-10">

            {messages.map((message, index) => (

              <div
                key={index}
                className="group space-y-4 sm:space-y-5"
              >

                {/* =========================
                    USER QUESTION
                ========================= */}

                <div className="flex justify-end">

                  <div
                    className={`max-w-[85%] sm:max-w-xl px-4 sm:px-5 py-3 rounded-2xl rounded-br-md text-sm sm:text-[15px] leading-6 shadow-sm wrap-break-word ${
                      isDark
                        ? 'bg-[#2f2f2f] text-gray-100'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.question}
                  </div>

                </div>


                {/* =========================
                    AI RESPONSE
                ========================= */}

                <div className="flex gap-3 sm:gap-4">

                  {/* AI Avatar */}

                  <div
                    className={`shrink-0 mt-1 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[11px] sm:text-xs font-bold ${
                      isDark
                        ? 'bg-white text-black'
                        : 'bg-gray-900 text-white'
                    }`}
                  >
                    AI
                  </div>


                  {/* Response */}

                  <div
                    className={`min-w-0 flex-1 text-sm sm:text-[15px] leading-7 ${
                      isDark
                        ? 'text-gray-200'
                        : 'text-gray-800'
                    }`}
                  >

                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{

                        /* Headings */

                        h1: ({ children }) => (
                          <h1 className="text-2xl sm:text-3xl font-bold mt-6 mb-3">
                            {children}
                          </h1>
                        ),

                        h2: ({ children }) => (
                          <h2 className="text-xl sm:text-2xl font-bold mt-5 mb-3">
                            {children}
                          </h2>
                        ),

                        h3: ({ children }) => (
                          <h3 className="text-lg sm:text-xl font-semibold mt-5 mb-2">
                            {children}
                          </h3>
                        ),


                        /* Paragraph */

                        p: ({ children }) => (
                          <p className="mb-4 last:mb-0">
                            {children}
                          </p>
                        ),


                        /* Lists */

                        ul: ({ children }) => (
                          <ul className="list-disc pl-5 mb-4 space-y-1">
                            {children}
                          </ul>
                        ),

                        ol: ({ children }) => (
                          <ol className="list-decimal pl-5 mb-4 space-y-1">
                            {children}
                          </ol>
                        ),

                        li: ({ children }) => (
                          <li className="pl-1">
                            {children}
                          </li>
                        ),


                        /* Bold */

                        strong: ({ children }) => (
                          <strong className="font-semibold">
                            {children}
                          </strong>
                        ),


                        /* Links */

                        a: ({ children, href }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`underline underline-offset-2 ${
                              isDark
                                ? 'text-blue-400 hover:text-blue-300'
                                : 'text-blue-600 hover:text-blue-700'
                            }`}
                          >
                            {children}
                          </a>
                        ),


                        /* Horizontal line */

                        hr: () => (
                          <hr
                            className={`my-5 ${
                              isDark
                                ? 'border-gray-700'
                                : 'border-gray-200'
                            }`}
                          />
                        ),


                        /* Inline / Block Code */

                        code: ({
                          inline,
                          className,
                          children,
                          ...props
                        }) => {

                          if (inline) {

                            return (
                              <code
                                className={`px-1.5 py-0.5 rounded-md text-[13px] font-mono ${
                                  isDark
                                    ? 'bg-[#303030] text-pink-300'
                                    : 'bg-gray-100 text-pink-600'
                                }`}
                                {...props}
                              >
                                {children}
                              </code>
                            )

                          }

                          return (
                            <code
                              className={`block overflow-x-auto p-4 rounded-xl text-[13px] sm:text-sm leading-6 font-mono ${
                                isDark
                                  ? 'bg-[#181818] text-gray-200'
                                  : 'bg-gray-50 text-gray-800 border border-gray-200'
                              }`}
                              {...props}
                            >
                              {children}
                            </code>
                          )
                        },


                        /* Code Block */

                        pre: ({ children }) => (
                          <pre className="my-4 overflow-x-auto rounded-xl">
                            {children}
                          </pre>
                        ),


                        /* Blockquote */

                        blockquote: ({ children }) => (
                          <blockquote
                            className={`my-4 border-l-4 pl-4 italic ${
                              isDark
                                ? 'border-gray-600 text-gray-400'
                                : 'border-gray-300 text-gray-600'
                            }`}
                          >
                            {children}
                          </blockquote>
                        ),


                        /* Table */

                        table: ({ children }) => (
                          <div className="my-4 overflow-x-auto">
                            <table
                              className={`min-w-full border-collapse text-sm ${
                                isDark
                                  ? 'border-gray-700'
                                  : 'border-gray-200'
                              }`}
                            >
                              {children}
                            </table>
                          </div>
                        ),

                        th: ({ children }) => (
                          <th
                            className={`border px-3 py-2 text-left font-semibold ${
                              isDark
                                ? 'border-gray-700 bg-[#2a2a2a]'
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          >
                            {children}
                          </th>
                        ),

                        td: ({ children }) => (
                          <td
                            className={`border px-3 py-2 ${
                              isDark
                                ? 'border-gray-700'
                                : 'border-gray-200'
                            }`}
                          >
                            {children}
                          </td>
                        )

                      }}
                    >
                      {message.answer}
                    </ReactMarkdown>


                    {/* =========================
                        MESSAGE ACTIONS
                    ========================= */}

                    {!loading && onRegenerate && (

                      <div className="mt-3">

                        <MessageActions
                          answer={message.answer}
                          onRegenerate={() =>
                            onRegenerate(
                              message.question,
                              index
                            )
                          }
                        />

                      </div>

                    )}

                  </div>

                </div>

              </div>

            ))}


            {/* =========================
                THINKING INDICATOR
            ========================= */}

            {loading && (

              <div className="flex gap-3 sm:gap-4 items-start">

                {/* AI Avatar */}

                <div
                  className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[11px] sm:text-xs font-bold ${
                    isDark
                      ? 'bg-white text-black'
                      : 'bg-gray-900 text-white'
                  }`}
                >
                  AI
                </div>


                {/* Dots */}

                <div className="flex items-center gap-1.5 pt-2">

                  <span
                    className={`w-2 h-2 rounded-full animate-bounce ${
                      isDark
                        ? 'bg-gray-500'
                        : 'bg-gray-400'
                    }`}
                  />

                  <span
                    className={`w-2 h-2 rounded-full animate-bounce [animation-delay:150ms] ${
                      isDark
                        ? 'bg-gray-500'
                        : 'bg-gray-400'
                    }`}
                  />

                  <span
                    className={`w-2 h-2 rounded-full animate-bounce [animation-delay:300ms] ${
                      isDark
                        ? 'bg-gray-500'
                        : 'bg-gray-400'
                    }`}
                  />

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  )
}

export default Chat