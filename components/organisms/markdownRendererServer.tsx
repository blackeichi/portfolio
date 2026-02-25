import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { Text } from "@/components/atoms/text";

interface MarkdownRendererServerProps {
  content: string;
}

export const MarkdownRendererServer = ({ content }: MarkdownRendererServerProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // 제목 스타일
        h1: ({ children }) => (
          <h1 className="text-lg sm:text-xl font-bold mb-6">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-base sm:text-lg font-bold mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-sm sm:text-base font-bold mb-2 mt-3">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xs sm:text-sm font-bold mb-1 mt-3">{children}</h4>
        ),
        // 이미지 스타일
        img: ({ src, alt }) => (
          <Image
            src={typeof src === "string" ? src : ""}
            alt={alt || ""}
            width={24}
            height={24}
            className="inline-block w-5 h-5 sm:w-6 sm:h-6 object-contain mr-1"
          />
        ),
        // 단락 스타일
        p: ({ children }) => <Text className="mb-3">{children}</Text>,
        // 구분선
        hr: () => <hr className="my-6 border-gray-300" />,
        // 리스트 스타일
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-2 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-2 space-y-1">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-xs sm:text-sm text-gray-700">{children}</li>
        ),
        // 강조 스타일
        strong: ({ children }) => (
          <strong className="font-bold text-stone-600 text-xs sm:text-sm">
            {children}
          </strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        // 코드 블록
        code: ({ className, children }) => {
          const isInline = !className;
          return isInline ? (
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[11px] sm:text-xs ">
              {children}
            </code>
          ) : (
            <code className="block bg-gray-100 p-3 rounded text-[11px] sm:text-xs  overflow-x-auto mb-2">
              {children}
            </code>
          );
        },
        // 링크 스타일
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        // 인용구
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2 text-gray-600">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
