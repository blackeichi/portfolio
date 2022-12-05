import { bgColor } from "../../styles/color";

export const Intro = () => {
  return (
    <div className="min-h-screen bg-slate-600">
      <div
        className="h-96 w-1/5 lg:h-screen"
        style={{ backgroundColor: bgColor }}
      >
        안녕
      </div>
    </div>
  );
};
