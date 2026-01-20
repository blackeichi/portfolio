import { outInteractions, outObstacles } from "./maps/outside/utils";
import { houseInteractions, houseObstacles } from "./maps/house/utils";

export const CHARACTER_ID = "character_ui";

export const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
export const CHARACTER_KEYS: Record<string, string> = {
  character: "character",
  fat: "fat",
  old: "old",
};

export const MAP_LIST = {
  outside: "outside",
  house: "house",
};

export const MAP_LIMIT: Record<
  string,
  { minX: number; maxX: number; minY: number; maxY: number }
> = {
  house: { minX: 27, maxX: 48, minY: -32, maxY: -40 },
  outside: { minX: 0, maxX: 75, minY: 0, maxY: -75 },
};

export const obstacles = {
  [MAP_LIST.outside]: outObstacles,
  [MAP_LIST.house]: houseObstacles,
};
export const interactables = {
  [MAP_LIST.outside]: outInteractions,
  [MAP_LIST.house]: houseInteractions,
};
