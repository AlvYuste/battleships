import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { FINAL_PHASE, INIT_PHASE, SHIPS_PHASE, SHOOT_PHASE } from "../utils/constants";
import type { BoardPosition } from "../models/BoardPosition";
import { type GamePhase } from '../utils/constants';
import { Player } from '../models/Player';

export type GameState = {
    phase: GamePhase;
    players: Player[];
    currentPlayer: number;
};

export const initialGameState: GameState = {
    phase: INIT_PHASE,
    players: [new Player(), new Player()],
    currentPlayer: 0
}


export class GameReducer extends ImmerReducer<GameState> {
    resetGame() {
        this.draftState.players = [new Player(), new Player()];
        this.draftState.phase = INIT_PHASE;
        this.draftState.currentPlayer = 0;
    }
    startGame() {
        if (this.draftState.phase !== INIT_PHASE) return;
        this.draftState.phase = SHIPS_PHASE;
    }
    cellClick(playerBoard: number, position: BoardPosition) {
        const { phase, players, currentPlayer } = this.draftState;

        if (phase === SHIPS_PHASE && playerBoard === currentPlayer && !!position) {
            const playerPlacing = players[currentPlayer];
            playerPlacing.placeShipCell(position);
            this.draftState.players = [...players];
        }
        if (phase === SHOOT_PHASE && playerBoard !== undefined && playerBoard !== currentPlayer && !!position) {
            const playerShot = players[playerBoard];

            if (playerShot.hasShot(position)) { return; }
            const hit = playerShot.receiveShot(position);
            if (!hit) {
                this.nextPlayer();
            }
            if (hit && playerShot.countOfShipCellsAlive === 0) {
                this.draftState.phase = FINAL_PHASE;
            }
            this.draftState.players = [...players];
        }
    }
    confirmPlacement() {
        const { phase, players, currentPlayer } = this.draftState;
        if (phase !== SHIPS_PHASE) { return; }

        if (!players[currentPlayer].validateShips().valid) {
            return;
        }
        const wasLastPlayer = this.nextPlayer();
        if (wasLastPlayer) {
            this.draftState.phase = SHOOT_PHASE;
        }
    }
    private nextPlayer() {
        const { players, currentPlayer } = this.draftState;
        if (currentPlayer < players.length - 1) {
            this.draftState.currentPlayer += 1;
            return false;
        } else {
            this.draftState.currentPlayer = 0;
            return true;
        }
    }
}

export const GameActionCreators = createActionCreators(GameReducer);
export const gameReducerFunction = createReducerFunction(GameReducer);