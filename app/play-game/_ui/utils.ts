import { homeInteractions, homeObstacles } from "./maps/home/utils";
import { houseInteractions, houseObstacles } from "./maps/house/utils";

export const CHARACTER_ID = "character_ui";

export const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
export const CHARACTER_KEYS: Record<string, string> = {
  character: "character",
  fat: "fat",
  old: "old",
};

export const MAP_LIST = {
  home: "home",
  house: "house",
};

export const MAP_LIMIT: Record<
  string,
  { minX: number; maxX: number; minY: number; maxY: number }
> = {
  house: { minX: 27, maxX: 48, minY: -33, maxY: -40 },
};

export const obstacles = {
  [MAP_LIST.home]: homeObstacles,
  [MAP_LIST.house]: houseObstacles,
};
export const interactables = {
  [MAP_LIST.home]: homeInteractions,
  [MAP_LIST.house]: houseInteractions,
};
