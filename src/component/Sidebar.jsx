import React, { useState } from 'react'
import ChatList from './Chatlist.jsx'

const Sidebar = ({
  setMessages,
  setQuestion,
  chatHistory,
  setChatHistory,
  currentChatId,
  setCurrentChatId,
  theme,
  setTheme,
  sidebarOpen,
  setSidebarOpen
}) => {

  const [menuId, setMenuId] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')


  // =========================
  // NEW CHAT
  // =========================

  const newChat = () => {

    setMessages([])
    setQuestion('')
    setCurrentChatId(null)

    localStorage.removeItem('currentChatId')

    setMenuId(null)
    setEditingId(null)

    // Close mobile sidebar
    if (setSidebarOpen) {
      setSidebarOpen(false)
    }
  }


  // =========================
  // OPEN CHAT
  // =========================

  const openChat = (chat) => {

    setMessages(chat.messages || [])
    setQuestion('')
    setCurrentChatId(chat.id)

    localStorage.setItem(
      'currentChatId',
      String(chat.id)
    )

    setMenuId(null)

    // Close mobile sidebar
    if (setSidebarOpen) {
      setSidebarOpen(false)
    }
  }


  // =========================
  // THEME
  // =========================

  const toggleTheme = () => {

    const newTheme =
      theme === 'dark'
        ? 'light'
        : 'dark'

    setTheme(newTheme)

    localStorage.setItem(
      'theme',
      newTheme
    )
  }


  // =========================
  // PIN / UNPIN
  // =========================

  const togglePin = (e, chatId) => {

    e.stopPropagation()

    const updatedHistory = chatHistory.map(
      (chat) => {

        if (chat.id === chatId) {

          return {
            ...chat,
            pinned: !chat.pinned
          }

        }

        return chat
      }
    )

    setChatHistory(updatedHistory)

    localStorage.setItem(
      'chatHistory',
      JSON.stringify(updatedHistory)
    )

    setMenuId(null)
  }


  // =========================
  // RENAME
  // =========================

  const startRename = (e, chat) => {

    e.stopPropagation()

    setEditingId(chat.id)
    setEditTitle(chat.title)
    setMenuId(null)
  }


  const saveRename = (e, chatId) => {

    e.stopPropagation()

    const newTitle = editTitle.trim()

    if (!newTitle) {

      setEditingId(null)
      setEditTitle('')

      return
    }

    const updatedHistory = chatHistory.map(
      (chat) => {

        if (chat.id === chatId) {

          return {
            ...chat,
            title: newTitle
          }

        }

        return chat
      }
    )

    setChatHistory(updatedHistory)

    localStorage.setItem(
      'chatHistory',
      JSON.stringify(updatedHistory)
    )

    setEditingId(null)
    setEditTitle('')
  }


  // =========================
  // DELETE
  // =========================

  const deleteChat = (e, chatId) => {

    e.stopPropagation()

    const updatedHistory =
      chatHistory.filter(
        (chat) => chat.id !== chatId
      )

    setChatHistory(updatedHistory)

    localStorage.setItem(
      'chatHistory',
      JSON.stringify(updatedHistory)
    )


    if (currentChatId === chatId) {

      setMessages([])
      setQuestion('')
      setCurrentChatId(null)

      localStorage.removeItem(
        'currentChatId'
      )
    }

    setMenuId(null)
  }


  return (
    <aside
      className={`
        fixed md:relative
        left-0 top-0
        z-50
        w-70 md:w-64
        h-screen
        flex flex-col
        border-r
        transition-transform duration-300 ease-in-out

        ${
          sidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
        }

        ${
          theme === 'dark'
            ? 'bg-[#171717] border-[#2a2a2a] text-gray-100'
            : 'bg-[#f7f7f8] border-gray-200 text-gray-900'
        }
      `}
    >

      {/* Header */}

      <div className="p-3 shrink-0">

        <div className="flex items-center justify-between px-2 py-2 mb-3">

          <div className="flex items-center gap-2">

            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-white text-black'
                  : 'bg-black text-white'
              }`}
            >
              <span className="font-bold text-sm">
                AI
              </span>
            </div>

            <h1 className="font-semibold">
              AI Buddy
            </h1>

          </div>


          {/* Mobile close */}

          <button
            onClick={() => setSidebarOpen(false)}
            className={`md:hidden w-8 h-8 rounded-lg flex items-center justify-center ${
              theme === 'dark'
                ? 'hover:bg-[#2a2a2a]'
                : 'hover:bg-gray-200'
            }`}
          >
            ✕
          </button>

        </div>


        {/* New Chat */}

        <button
          onClick={newChat}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
            theme === 'dark'
              ? 'hover:bg-[#2a2a2a]'
              : 'hover:bg-gray-200'
          }`}
        >

          <span className="text-xl">
            +
          </span>

          <span className="text-sm">
            New chat
          </span>

        </button>

      </div>


      {/* Chat History */}

      <div className="flex-1 min-h-0 overflow-hidden px-3">

        <ChatList
          chatHistory={chatHistory}
          currentChatId={currentChatId}

          openChat={openChat}

          menuId={menuId}
          setMenuId={setMenuId}

          togglePin={togglePin}
          startRename={startRename}
          deleteChat={deleteChat}

          editingId={editingId}
          editTitle={editTitle}
          setEditTitle={setEditTitle}

          saveRename={saveRename}
          setEditingId={setEditingId}
        />

      </div>


      {/* Bottom */}

      <div
        className={`p-3 shrink-0 border-t ${
          theme === 'dark'
            ? 'border-[#2a2a2a]'
            : 'border-gray-200'
        }`}
      >

        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
            theme === 'dark'
              ? 'hover:bg-[#2a2a2a]'
              : 'hover:bg-gray-200'
          }`}
        >

          <span>
            {theme === 'dark'
              ? '☀️'
              : '🌙'}
          </span>

          <span>
            {theme === 'dark'
              ? 'Light mode'
              : 'Dark mode'}
          </span>

        </button>

      </div>

    </aside>
  )
}

export default Sidebar