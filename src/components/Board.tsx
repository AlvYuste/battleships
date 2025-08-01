import React, { useMemo } from "react";
import styles from "./Board.module.css";
import { BOARD_WIDTH, HIT, MISS, SHIP, WATER, type CellType, type GamePhase } from "../utils/constants";
import { BoardPosition } from "../models/BoardPosition";
import type { Player } from "../models/Player";

interface BoardProps {
    title: string
    player: Player,
    isCurrentPlayer: boolean,
    phase: GamePhase
    handleCellClick: (position: BoardPosition) => void
}

const Board: React.FC<BoardProps> = ({ title, player, phase, isCurrentPlayer, handleCellClick }) => {
    const baseBoard = useMemo<CellType[][]>(() => Array(BOARD_WIDTH).fill(Array(BOARD_WIDTH).fill("_")), []);

    return (
        <div className={`
            ${styles.board}
            ${isCurrentPlayer ? styles[`board--current`] : ""}
            ${styles[`board--${phase}`]}
        `}>
            <h2 className={styles.title}>{title}{isCurrentPlayer && "*"}</h2>
            {baseBoard.map((row, i) => (
                <div className={styles.row} key={i}>
                    {row.map((_, j) => {
                        const pos = new BoardPosition(i, j)
                        const cellType: CellType = player.hasShot(pos) ?
                            (player.hasShipCell(pos) ? HIT : MISS) :
                            (player.hasShipCell(pos) ? SHIP : WATER);
                        return (
                            <div
                                key={j}
                                className={`${styles.cell} ${styles[`cell--${cellType}`]} `}
                                onClick={() => handleCellClick(pos)}
                            />
                        )
                    }
                    )}
                </div >
            ))}
        </div>);
}

export default Board;