import React, { useState } from 'react'

const MessageActions = ({ answer, onRegenerate }) => {

  const [copied, setCopied] = useState(false)

  // =========================
  // COPY RESPONSE
  // =========================

  const handleCopy = async () => {

    try {

      await navigator.clipboard.writeText(answer)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)

    } catch (error) {

      console.error(
        'Failed to copy response:',
        error
      )

    }
  }


  // =========================
  // UI
  // =========================

  return (

    <div className="flex items-center gap-1 mt-2">

      {/* Copy */}

      <button
        onClick={handleCopy}
        title="Copy response"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2f2f2f] transition"
      >

        <span>
          {copied ? '✓' : '📋'}
        </span>

        <span>
          {copied ? 'Copied' : 'Copy'}
        </span>

      </button>


      {/* Regenerate */}

      <button
        onClick={onRegenerate}
        title="Regenerate response"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2f2f2f] transition"
      >

        <span>
          ↻
        </span>

        <span>
          Regenerate
        </span>

      </button>

    </div>

  )
}

export default MessageActions