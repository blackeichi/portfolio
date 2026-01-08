"use client";

import { SemiTitle } from "@/components/atoms/semi-title";
import WindowsBox from "@/components/molecules/windowsBox";
import Image from "next/image";

const techStacks = {
  frontend: {
    title: "프론트엔드",
    items: [
      { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs" },
      { name: "React", icon: "https://cdn.simpleicons.org/react" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
      { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
      { name: "Framer Motion", icon: "https://cdn.simpleicons.org/framer" },
    ],
  },
  backend: {
    title: "백엔드",
    items: [
      { name: "NestJS", icon: "https://cdn.simpleicons.org/nestjs/E0234E" },
      { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma" },
      { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql" },
      { name: "JWT", icon: "https://cdn.simpleicons.org/jsonwebtokens" },
    ],
  },
  tools: {
    title: "개발 도구",
    items: [
      { name: "Git", icon: "https://cdn.simpleicons.org/git" },
      { name: "pnpm", icon: "https://cdn.simpleicons.org/pnpm" },
      { name: "ESLint", icon: "https://cdn.simpleicons.org/eslint" },
      { name: "Prettier", icon: "https://cdn.simpleicons.org/prettier" },
    ],
  },
  deploy: {
    title: "Deploy",
    items: [
      { name: "Vercel(FE)", icon: "https://cdn.simpleicons.org/vercel" },
      { name: "Render(BE)", icon: "https://cdn.simpleicons.org/render" },
      { name: "Neon(DB)", icon: "/images/icons/neon.png" },
    ],
  },
};

export const StackComponent = () => {
  return (
    <WindowsBox
      title={`🛠️ 사용된 기술 스택`}
      style={{ width: "100%", maxWidth: "700px", height: "fit-content" }}
    >
      <div className="flex flex-col gap-4 w-full px-4 pb-4">
        {Object.entries(techStacks).map(([key, category]) => (
          <div key={key} className="p-4 flex flex-col gap-4">
            <SemiTitle>{category.title}</SemiTitle>
            <div className="flex items-center gap-10 flex-wrap">
              {category.items.map((stack) => (
                <div
                  key={stack.name}
                  className="flex flex-col items-center justify-center gap-2 hover:scale-110 transition-transform w-16"
                  title={stack.name}
                >
                  <Image
                    src={stack.icon}
                    alt={stack.name}
                    width={35}
                    height={35}
                    className="object-contain"
                  />
                  <span className="text-xs text-center font-medium">
                    {stack.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </WindowsBox>
  );
};
