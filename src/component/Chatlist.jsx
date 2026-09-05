import React, { useEffect } from 'react'

const ChatList = ({
  chatHistory,
  currentChatId,
  openChat,
  menuId,
  setMenuId,
  togglePin,
  startRename,
  deleteChat,
  editingId,
  editTitle,
  setEditTitle,
  saveRename,
  setEditingId,
  theme
}) => {

  const isDark = theme === 'dark'


  // =========================
  // CLOSE MENU ON OUTSIDE CLICK
  // =========================

  useEffect(() => {

    const handleOutsideClick = () => {

      if (menuId !== null) {
        setMenuId(null)
      }

    }

    document.addEventListener(
      'click',
      handleOutsideClick
    )

    return () => {
      document.removeEventListener(
        'click',
        handleOutsideClick
      )
    }

  }, [menuId, setMenuId])


  // =========================
  // PINNED / RECENT
  // =========================

  const pinnedChats = chatHistory.filter(
    (chat) => chat.pinned
  )

  const recentChats = chatHistory.filter(
    (chat) => !chat.pinned
  )


  // =========================
  // RENDER CHAT
  // =========================

  const renderChat = (chat) => {

    const isEditing =
      editingId === chat.id

    const isActive =
      currentChatId === chat.id


    return (

      <div
        key={chat.id}

        onClick={(e) => {

          if (isEditing) return

          if (
            e.target.closest('button') ||
            e.target.closest('input')
          ) {
            return
          }

          openChat(chat)

        }}

        className={`
          group
          relative
          flex
          items-center
          gap-2
          px-3
          py-2.5
          rounded-lg
          cursor-pointer
          transition-all
          duration-150

          ${
            isActive
              ? isDark
                ? 'bg-[#2f2f2f] text-white'
                : 'bg-gray-200 text-gray-900'
              : isDark
                ? 'text-gray-300 hover:bg-[#242424] hover:text-white'
                : 'text-gray-700 hover:bg-gray-200'
          }
        `}
      >

        {/* =========================
            PIN
        ========================= */}

        {chat.pinned && (

          <span className="text-xs shrink-0">
            📌
          </span>

        )}


        {/* =========================
            TITLE / RENAME
        ========================= */}

        {isEditing ? (

          <input
            autoFocus
            value={editTitle}

            onChange={(e) =>
              setEditTitle(e.target.value)
            }

            onClick={(e) =>
              e.stopPropagation()
            }

            onKeyDown={(e) => {

              if (e.key === 'Enter') {
                saveRename(e, chat.id)
              }

              if (e.key === 'Escape') {
                setEditingId(null)
                setEditTitle('')
              }

            }}

            onBlur={(e) =>
              saveRename(e, chat.id)
            }

            className={`
              flex-1
              min-w-0
              px-2
              py-1.5
              rounded-md
              border
              outline-none
              text-sm

              ${
                isDark
                  ? 'bg-[#424242] border-[#555] text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }
            `}
          />

        ) : (

          <span className="flex-1 min-w-0 text-sm truncate">
            {chat.title}
          </span>

        )}


        {/* =========================
            THREE DOT MENU
        ========================= */}

        {!isEditing && (

          <button

            onClick={(e) => {

              e.stopPropagation()

              setMenuId(
                menuId === chat.id
                  ? null
                  : chat.id
              )

            }}

            className={`
              shrink-0
              w-7
              h-7
              flex
              items-center
              justify-center
              rounded-md
              text-lg
              leading-none
              transition-all

              ${
                menuId === chat.id
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100'
              }

              ${
                isDark
                  ? 'text-gray-400 hover:bg-[#3a3a3a] hover:text-white'
                  : 'text-gray-500 hover:bg-gray-300 hover:text-gray-900'
              }
            `}
            aria-label="Chat options"
          >
            ⋯
          </button>

        )}


        {/* =========================
            MENU
        ========================= */}

        {menuId === chat.id && (

          <div

            onClick={(e) =>
              e.stopPropagation()
            }

            className={`
              absolute
              right-1
              top-11
              z-50
              w-40
              p-1.5
              rounded-xl
              border
              shadow-2xl

              ${
                isDark
                  ? 'bg-[#2f2f2f] border-[#454545]'
                  : 'bg-white border-gray-200'
              }
            `}
          >

            {/* Pin */}

            <button
              onClick={(e) =>
                togglePin(e, chat.id)
              }

              className={`
                w-full
                flex
                items-center
                gap-2
                text-left
                px-3
                py-2
                rounded-lg
                text-sm
                transition

                ${
                  isDark
                    ? 'hover:bg-[#424242]'
                    : 'hover:bg-gray-100'
                }
              `}
            >

              <span>
                📌
              </span>

              <span>
                {chat.pinned
                  ? 'Unpin'
                  : 'Pin'}
              </span>

            </button>


            {/* Rename */}

            <button
              onClick={(e) =>
                startRename(e, chat)
              }

              className={`
                w-full
                flex
                items-center
                gap-2
                text-left
                px-3
                py-2
                rounded-lg
                text-sm
                transition

                ${
                  isDark
                    ? 'hover:bg-[#424242]'
                    : 'hover:bg-gray-100'
                }
              `}
            >

              <span>
                ✏️
              </span>

              <span>
                Rename
              </span>

            </button>


            {/* Delete */}

            <button
              onClick={(e) =>
                deleteChat(e, chat.id)
              }

              className="
                w-full
                flex
                items-center
                gap-2
                text-left
                px-3
                py-2
                rounded-lg
                text-sm
                text-red-500
                hover:bg-red-500/10
                transition
              "
            >

              <span>
                🗑️
              </span>

              <span>
                Delete
              </span>

            </button>

          </div>

        )}

      </div>
    )
  }


  return (

    <div className="h-full overflow-y-auto overflow-x-hidden pr-1 pb-3">

      {/* =========================
          PINNED
      ========================= */}

      {pinnedChats.length > 0 && (

        <div className="mb-6">

          <p
            className={`
              px-2
              mb-2
              text-[11px]
              font-semibold
              uppercase
              tracking-wider
              ${
                isDark
                  ? 'text-gray-500'
                  : 'text-gray-400'
              }
            `}
          >
            Pinned
          </p>

          <div className="space-y-1">

            {pinnedChats.map(renderChat)}

          </div>

        </div>

      )}


      {/* =========================
          RECENT
      ========================= */}

      <div>

        <p
          className={`
            px-2
            mb-2
            text-[11px]
            font-semibold
            uppercase
            tracking-wider
            ${
              isDark
                ? 'text-gray-500'
                : 'text-gray-400'
            }
          `}
        >
          Recent
        </p>


        {recentChats.length === 0 ? (

          <div className="px-3 py-4">

            <p
              className={`
                text-sm
                ${
                  isDark
                    ? 'text-gray-500'
                    : 'text-gray-400'
                }
              `}
            >
              No chats yet
            </p>

          </div>

        ) : (

          <div className="space-y-1">

            {recentChats.map(renderChat)}

          </div>

        )}

      </div>

    </div>

  )
}

export default ChatList