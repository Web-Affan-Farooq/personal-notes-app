"use client";

// _____ Hooks ...
import { useNotes } from "@/store/notes";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo, useEffect } from "react";

// _____ Libraries ...
import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const DynamicCasePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { notes } = useNotes();

  // ___ Find note from state ...
  const requiredNote = useMemo(
    () => notes.find((note) => note.id === id),
    [notes, id]
  );

  // ___ Redirect user to list if required note not found  ...
  useEffect(() => {
    if (!requiredNote) {
      router.push("/projects");
    }
  }, [requiredNote, router]);

  if (!requiredNote) return null; // render nothing until redirect

  const components: Components = {
    h1: (props) => (
      <h1
        className="text-[30px] max-sm:text-[25px] font-bold mb-6 text-white"
        {...props}
      />
    ),
    h2: (props) => (
      <h2 className="text-xl font-bold mb-6 text-white" {...props} />
    ),
    h3: (props) => (
      <h3 className="text-lg font-bold mb-6 text-white" {...props} />
    ),
    h4: (props) => (
      <h4 className="text-md font-bold mb-6 text-white" {...props} />
    ),
    h5: (props) => (
      <h5 className="text-sm font-bold mb-6 text-white" {...props} />
    ),
    p: (props) => (
      <p
        className="text-gray-400 text-sm font-firacode leading-relaxed mb-4"
        {...props}
      />
    ),
    a: (props) => (
      <a
        className="text-blue-500 font-bold hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    // ✅ Updated code block
    code({
      children,
      inline,
      className,
      ...props
    }: {
      inline?: boolean;
      className?: string;
      children?: React.ReactNode;
    }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          customStyle={{
            borderRadius: "0.75rem",
            padding: "1rem",
            background: "#070516ff",
            backdropFilter: "blur(90px)",
            fontSize: "0.85rem",
          }}
          codeTagProps={{
            style: { background: "transparent" }, // kill background per line
          }}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-black/60 text-indigo-400 px-1 rounded" {...props}>
          {children}
        </code>
      );
    },
    blockquote: (props) => (
      <blockquote className="pl-4 italic text-gray-600 my-4" {...props} />
    ),
    b: (props) => <strong className="pl-4 italic text-white my-4" {...props} />,
    ul: (props) => (
      <ul
        className="list-disc list-inside text-gray-400 text-sm flex flex-col flex-nowrap gap-[10px]"
        {...props}
      />
    ),
    li: (props) => <li className="flex flex-row gap-[20px]" {...props} />,
  };

  return (
    <main className="pt-[70px]">
      <article className="w-full m-auto py-[50px] sm:px-[100px] max-sm:px-[30px]">
        <section className="prose prose-lg prose-slate dark:prose-invert">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
            components={components}
          >
            {`# ${requiredNote.title}\n\n${requiredNote.description}`}
          </Markdown>
        </section>
      </article>
    </main>
  );
};

export default DynamicCasePage;
