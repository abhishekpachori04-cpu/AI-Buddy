import React, { useState } from 'react'

import ChatManager from './component/ChatManager.jsx'
import Sidebar from './component/Sidebar.jsx'
import Chat from './component/Chat.jsx'
import PromptBox from './component/PromptBox.jsx'

const App = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ChatManager>

      {({
        question,
        setQuestion,

        messages,
        setMessages,

        loading,

        theme,
        setTheme,

        chatHistory,
        setChatHistory,

        currentChatId,
        setCurrentChatId,

        askquestion,
        regenerateResponse
      }) => (

        <div
          className={`flex h-screen overflow-hidden ${
            theme === 'dark'
              ? 'bg-[#212121] text-white'
              : 'bg-white text-gray-900'
          }`}
        >

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}


          {/* Sidebar */}

          <Sidebar
            setMessages={setMessages}
            setQuestion={setQuestion}

            chatHistory={chatHistory}
            setChatHistory={setChatHistory}

            currentChatId={currentChatId}
            setCurrentChatId={setCurrentChatId}

            theme={theme}
            setTheme={setTheme}

            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />


          {/* Main */}

          <main
            className={`h-screen min-w-0 flex-1 relative ${
              theme === 'dark'
                ? 'bg-[#212121]'
                : 'bg-white'
            }`}
          >

            {/* Mobile menu button */}

            <button
              onClick={() => setSidebarOpen(true)}
              className={`md:hidden absolute top-3 left-3 z-30 w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                theme === 'dark'
                  ? 'hover:bg-[#2f2f2f]'
                  : 'hover:bg-gray-100'
              }`}
            >
              ☰
            </button>


            {/* Chat */}

            <Chat
              messages={messages}
              loading={loading}
              theme={theme}
              onRegenerate={regenerateResponse}
            />


            {/* Prompt */}

            <PromptBox
              question={question}
              setQuestion={setQuestion}
              askquestion={askquestion}
              theme={theme}
            />

          </main>

        </div>

      )}

    </ChatManager>
  )
}

export default App