"use client";
import { useState } from "react";

interface CopyLinkButtonProps {
  className?: string;
  title?: string;
}

export function CopyLinkButton({ className = '', title = 'Copy link' }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <button
      onClick={handleCopy}
      className={`ml-2 px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 border border-gray-200 flex items-center gap-1 ${className}`}
      title={title}
      type="button"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17v1a3 3 0 003 3h6a3 3 0 003-3v-6a3 3 0 00-3-3h-1" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 7V6a3 3 0 00-3-3H6a3 3 0 00-3 3v6a3 3 0 003 3h1" /></svg>
      {copied ? 'Link copied!' : 'Copy Link'}
    </button>
  );
} 