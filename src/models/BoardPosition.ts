import { BOARD_WIDTH } from "../utils/constants";

export type BoardPositionString = `${number},${number}`;

export class BoardPosition {
    constructor(public readonly x: number, public readonly y: number) {
        if (x < 0 || y < 0 || x >= BOARD_WIDTH || y >= BOARD_WIDTH) {
            throw new Error(`Position coordinates must be between 0 and ${BOARD_WIDTH}. Provided: (${x},${y})`)
        }
    }

    toString(): BoardPositionString {
        return `${this.x},${this.y}`;
    }

    get adjacentPositions(): BoardPosition[] {
        return [
            { x: this.x - 1, y: this.y },
            { x: this.x + 1, y: this.y },
            { x: this.x, y: this.y - 1 },
            { x: this.x, y: this.y + 1 },
            { x: this.x - 1, y: this.y - 1 },
            { x: this.x + 1, y: this.y - 1 },
            { x: this.x - 1, y: this.y + 1 },
            { x: this.x + 1, y: this.y + 1 }
        ].reduce<BoardPosition[]>(
            (memo, pos) => {
                try {
                    return [...memo, new BoardPosition(pos.x, pos.y)];
                } catch {
                    return memo;
                }
            }, []
        );

    }

    static fromString(str: BoardPositionString): BoardPosition {
        const [x, y] = str.split(',');
        const p = new BoardPosition(parseInt(x), parseInt(y))
        if (p.toString() !== str) {
            throw new Error(`PositionString provided is not correct: ${str}`)
        }
        return p;
    }

    static areInLine(positions: BoardPosition[]): boolean {
        const sorted = positions.slice().sort((a, b) => a.x - b.x || a.y - b.y);
        const uniquePositions = new Set(positions.map(pos => pos.toString()));
        if (uniquePositions.size !== positions.length) {
            return false;
        }
        const rows = sorted.map(pos => pos.y);
        const cols = sorted.map(pos => pos.x);
        return (
            (rows.every(val => val === rows[0]) && cols.every((val, i) => val === cols[0] + i)) ||
            (cols.every(val => val === cols[0]) && rows.every((val, i) => val === rows[0] + i))
        );
    }
    static areInLineStrings(positions: BoardPositionString[]): boolean {
        return this.areInLine(positions.map(pos => BoardPosition.fromString(pos)));
    }
}
