"use client";

import WindowTemplateFooter from "../organisms/windowTemplateFooter";

export const WindowTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex h-full w-full flex-col justify-center overflow-hidden">
      <div className="relative h-full w-full overflow-hidden">{children}</div>
      {/* 윈도우즈 바닥 메뉴바 */}
      <WindowTemplateFooter />
    </main>
  );
};
