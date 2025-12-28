export type Position = { x: number; y: number; width: number; height: number };
export type Dir =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";
export type RefType = Position & { mouseX: number; mouseY: number };

export type IconMenu = {
  name: string;
  icon: string;
  href: string;
  function?: () => void;
  confirmMsg?: string;
};
