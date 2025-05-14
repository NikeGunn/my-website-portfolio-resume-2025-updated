'use client';

import React, { useState } from 'react';

const CopyButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Get the actual text content to copy
    let content;

    try {
      // Handle different types of content
      if (typeof textToCopy === 'string') {
        // If it's already a string, use it directly
        content = textToCopy;
      } else if (textToCopy && typeof textToCopy === 'object') {
        // If it's a React element with children
        if (textToCopy.props && textToCopy.props.children) {
          // Handle array of children
          if (Array.isArray(textToCopy.props.children)) {
            // Deeply extract text from nested children
            content = extractTextFromReactChildren(textToCopy.props.children);
          } else {
            // Handle single child
            content = String(textToCopy.props.children);
          }
        } else {
          // Fallback to string conversion
          content = String(textToCopy);
        }
      } else {
        // Default fallback
        content = String(textToCopy || '');
      }
    } catch (err) {
      console.error('Error processing content to copy:', err);
      content = String(textToCopy || '');
    }

    // Copy the content to clipboard
    navigator.clipboard.writeText(content).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      },
      (err) => {
        console.error('Failed to copy:', err);
      }
    );
  };

  // Helper function to extract text content from React children (recursive)
  const extractTextFromReactChildren = (children) => {
    if (!children) return '';

    // Handle different types of children
    if (typeof children === 'string' || typeof children === 'number') {
      return String(children);
    }

    if (Array.isArray(children)) {
      return children.map(extractTextFromReactChildren).join('');
    }

    // Handle React elements
    if (children.props && children.props.children) {
      return extractTextFromReactChildren(children.props.children);
    }

    // Fallback
    return String(children);
  };

  return (
    <button
      onClick={handleCopy}
      className="copy-button"
      title={copied ? "Copied!" : "Copy to clipboard"}
      aria-label={copied ? "Copied!" : "Copy to clipboard"}
      type="button"
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      )}
    </button>
  );
};

export default CopyButton;