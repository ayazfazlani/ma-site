"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useEffect, useState } from "react";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    return RQ;
  },
  { 
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-gray-50 dark:bg-dark-900 rounded-3xl animate-pulse border border-gray-100 dark:border-white/[0.05]" />
  }
);

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["table"],
    [{ script: "sub" }, { script: "super" }],
    ["clean"],
  ],
  table: true,
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "align",
  "blockquote",
  "code-block",
  "link",
  "image",
  "video",
  "table",
  "script",
];

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[400px] w-full bg-gray-50 dark:bg-dark-900 rounded-3xl border border-gray-100 dark:border-white/[0.05]" />;
  }

  return (
    <div className="quill-premium-container">
      <style jsx global>{`
        .quill-premium-container .ql-container {
          border-bottom-left-radius: 1.5rem;
          border-bottom-right-radius: 1.5rem;
          border: 1px solid rgba(0, 0, 0, 0.05) !important;
          background: rgba(255, 255, 255, 0.02);
          font-family: inherit;
          min-height: 400px;
          font-size: 1.125rem;
        }
        
        .dark .quill-premium-container .ql-container {
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          color: #e5e5e5;
        }

        .quill-premium-container .ql-toolbar {
          border-top-left-radius: 1.5rem;
          border-top-right-radius: 1.5rem;
          border: 1px solid rgba(0, 0, 0, 0.05) !important;
          background: #f9fafb;
          padding: 12px 20px;
        }

        .dark .quill-premium-container .ql-toolbar {
          background: #0a0a0a;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
        }

        .quill-premium-container .ql-video {
            width: 100%;
            aspect-ratio: 16/9;
            border-radius: 1rem;
        }

        .dark .ql-snow .ql-stroke {
          stroke: #a3a3a3;
        }
        .dark .ql-snow .ql-fill {
          fill: #a3a3a3;
        }
        .dark .ql-snow .ql-picker {
          color: #a3a3a3;
        }
        
        .ql-editor.ql-blank::before {
          color: #94a3b8 !important;
          font-style: normal;
          opacity: 0.5;
        }

        .ql-editor {
          padding: 2rem !important;
          line-height: 1.8;
        }

        .ql-editor table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .dark .ql-editor table {
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ql-editor table td, .ql-editor table th {
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding: 0.75rem 1rem;
        }

        .dark .ql-editor table td, .dark .ql-editor table th {
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ql-editor table th {
          background: rgba(0, 0, 0, 0.02);
          font-weight: 700;
        }

        .dark .ql-editor table th {
          background: rgba(255, 255, 255, 0.02);
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || "Tell your story here..."}
      />
    </div>
  );
}
