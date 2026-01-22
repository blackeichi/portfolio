import {
  companyInteractions,
  companyObstacles,
} from "./inGame/maps/company/constants";
import {
  houseInteractions,
  houseObstacles,
} from "./inGame/maps/house/constants";
import { outInteractions, outObstacles } from "./inGame/maps/outside/constants";

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
  company: "company",
};

export const MAP_LIMIT: Record<
  string,
  { minX: number; maxX: number; minY: number; maxY: number }
> = {
  house: { minX: 27, maxX: 48, minY: -32, maxY: -40 },
  outside: { minX: 0, maxX: 75, minY: 0, maxY: -75 },
  company: { minX: 20, maxX: 53, minY: -28, maxY: -43.5 },
};

export const obstacles = {
  [MAP_LIST.outside]: outObstacles,
  [MAP_LIST.house]: houseObstacles,
  [MAP_LIST.company]: companyObstacles,
};
export const interactables = {
  [MAP_LIST.outside]: outInteractions,
  [MAP_LIST.house]: houseInteractions,
  [MAP_LIST.company]: companyInteractions,
};
