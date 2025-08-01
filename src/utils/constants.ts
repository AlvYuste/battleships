export const BOARD_WIDTH = 10;

export const INIT_PHASE = "initPhase";
export const SHIPS_PHASE = "shipPhase";
export const SHOOT_PHASE = "shootPhase";
export const FINAL_PHASE = "finalPhase";
export const GAME_PHASES = [
    INIT_PHASE,
    SHIPS_PHASE,
    SHOOT_PHASE,
    FINAL_PHASE
] as const;
export type GamePhase = typeof GAME_PHASES[number];

export const WATER = "water";
export const SHIP = "ship";
export const HIT = "hit";
export const MISS = "miss";

export const CELL_TYPES = [
    WATER,
    SHIP,
    HIT,
    MISS,
] as const;

export type CellType = typeof CELL_TYPES[number];

export const SHIPS_TO_PLACE: number[] = [5, 4, 3, 3, 2];
