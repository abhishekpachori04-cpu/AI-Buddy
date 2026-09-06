import React, { useState, useRef } from 'react'

const BACKEND_URL = 'https://ai-buddy-1-hvt6.onrender.com/api/chat'

const ChatManager = ({ children }) => {

  // =========================
  // BASIC STATES
  // =========================

  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const abortControllerRef = useRef(null)

  // =========================
  // THEME
  // =========================

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  // =========================
  // CHAT HISTORY
  // =========================

  const [chatHistory, setChatHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem('chatHistory')
      return savedHistory ? JSON.parse(savedHistory) : []
    } catch (error) {
      console.error('Failed to load chat history:', error)
      return []
    }
  })

  // =========================
  // CURRENT CHAT
  // =========================

  const [currentChatId, setCurrentChatId] = useState(() => {
    const savedChatId = localStorage.getItem('currentChatId')
    return savedChatId ? Number(savedChatId) : null
  })

  // =========================
  // SAVE HISTORY HELPER
  // =========================

  const saveHistory = (history) => {
    setChatHistory(history)
    localStorage.setItem('chatHistory', JSON.stringify(history))
  }

  // =========================
  // STOP STREAMING
  // =========================

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
      setLoading(false)
    }
  }

  // =========================
  // ASK QUESTION (STREAMING)
  // =========================

  const askquestion = async (customPrompt = null) => {
    const promptToSend = (typeof customPrompt === 'string' ? customPrompt : question).trim()
    if (!promptToSend || loading) return

    setQuestion('')
    setLoading(true)

    const chatId = currentChatId || Date.now()
    const isNew = currentChatId === null

    if (isNew) {
      setCurrentChatId(chatId)
      localStorage.setItem('currentChatId', String(chatId))
    }

    const baseMessage = { question: promptToSend, answer: '' }
    setMessages((prev) => [...prev, baseMessage])

    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: promptToSend }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let accumulatedAnswer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const rawChunk = decoder.decode(value, { stream: true })
        const lines = rawChunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim()
            if (dataStr === '[DONE]') break

            try {
              const parsed = JSON.parse(dataStr)
              if (parsed.text) {
                accumulatedAnswer += parsed.text

                setMessages((prev) => {
                  const updated = [...prev]
                  const lastIdx = updated.length - 1
                  if (lastIdx >= 0) {
                    updated[lastIdx] = {
                      ...updated[lastIdx],
                      answer: accumulatedAnswer
                    }
                  }
                  return updated
                })
              }
            } catch (err) {
              // Ignore incomplete chunk splits
            }
          }
        }
      }

      const finalMessage = { question: promptToSend, answer: accumulatedAnswer }

      setChatHistory((prev) => {
        let updated
        if (isNew) {
          const newChat = {
            id: chatId,
            title:
              promptToSend.length > 35
                ? promptToSend.substring(0, 35) + '...'
                : promptToSend,
            messages: [finalMessage],
            pinned: false,
            createdAt: new Date().toISOString()
          }
          updated = [newChat, ...prev]
        } else {
          updated = prev.map((c) => {
            if (c.id === chatId) {
              return { ...c, messages: [...(c.messages || []), finalMessage] }
            }
            return c
          })
        }
        localStorage.setItem('chatHistory', JSON.stringify(updated))
        return updated
      })

    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Generation stopped by user.')
      } else {
        // Sirf browser console me error dikhayega, UI par koi error message nahi aayega
        console.error('Streaming error:', error)
      }
    } finally {
      setLoading(false)
      abortControllerRef.current = null
    }
  }
  // =========================
  // REGENERATE RESPONSE
  // =========================

  const regenerateResponse = async (questionToRegenerate, messageIndex) => {
    if (loading) return
    setLoading(true)

    setMessages((prev) => {
      return prev.map((msg, idx) => {
        if (idx === messageIndex) {
          return { ...msg, answer: '' }
        }
        return msg
      })
    })

    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: questionToRegenerate }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let accumulatedAnswer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const rawChunk = decoder.decode(value, { stream: true })
        const lines = rawChunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim()
            if (dataStr === '[DONE]') break

            try {
              const parsed = JSON.parse(dataStr)
              if (parsed.text) {
                accumulatedAnswer += parsed.text

                setMessages((prev) => {
                  return prev.map((msg, idx) => {
                    if (idx === messageIndex) {
                      return { ...msg, answer: accumulatedAnswer }
                    }
                    return msg
                  })
                })
              }
            } catch (err) {
              // Ignore incomplete chunk splits
            }
          }
        }
      }

      setChatHistory((prev) => {
        const updated = prev.map((chat) => {
          if (chat.id !== currentChatId) return chat

          const updatedMessages = chat.messages.map((msg, idx) => {
            if (idx === messageIndex) {
              return { ...msg, answer: accumulatedAnswer }
            }
            return msg
          })

          return { ...chat, messages: updatedMessages }
        })

        localStorage.setItem('chatHistory', JSON.stringify(updated))
        return updated
      })

    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Regenerate error:', error)
      }
    } finally {
      setLoading(false)
      abortControllerRef.current = null
    }
  }

  // =========================
  // CHAT ACTIONS
  // =========================

  const newChat = () => {
    stopGeneration()
    setMessages([])
    setQuestion('')
    setCurrentChatId(null)
    localStorage.removeItem('currentChatId')
  }

  const openChat = (chat) => {
    stopGeneration()
    setMessages(chat.messages || [])
    setQuestion('')
    setCurrentChatId(chat.id)
    localStorage.setItem('currentChatId', String(chat.id))
  }

  // =========================
  // CONTEXT VALUE
  // =========================

  const value = {
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
    regenerateResponse,
    stopGeneration,
    newChat,
    openChat,
    saveHistory
  }

  return children(value)
}

export default ChatManager