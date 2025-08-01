import { SHIPS_TO_PLACE } from "../utils/constants";
import { BoardPosition, type BoardPositionString } from "./BoardPosition";

export class Player {
    private readonly ships: Set<BoardPositionString> = new Set();
    private readonly shots: Set<BoardPositionString> = new Set();

    hasShot(position: BoardPosition): boolean {
        return this.shots.has(position.toString());
    }
    hasShipCell(position: BoardPosition): boolean {
        return this.ships.has(position.toString());
    }
    /**
     * Place a ship at the specified position.
     * If the position already has a ship, it will be removed.
     * @param position - The position to place the ship at.
     */
    placeShipCell(position: BoardPosition): void {
        const posString = position.toString();
        if (this.hasShipCell(position)) {
            this.ships.delete(posString);
            return;
        }
        this.ships.add(posString);
    }
    /**
     * Shoot at the specified position.
     * @param position - The position to shoot at.
     * @throws {Error} If the position has already been shot at.
     * @returns {boolean} - `true` if the shot hit a ship, `false` otherwise.
     */
    receiveShot(position: BoardPosition): boolean {
        const posString = position.toString();
        if (this.hasShot(position)) {
            throw new Error(`The position ${posString} has already been shot at.`);
        }
        this.shots.add(posString);
        return this.hasShipCell(position);
    }
    get countOfShipCellsAlive(): number {
        return Array.from(this.ships).filter(pos => !this.shots.has(pos)).length;
    }
    /**
     * Check if the positions stored in the Set ships are vertical or horizontal non-adjacent lines that have the lengths described in the SHIPS_TO_PLACE array.
     * @returns `{valid: boolean, error: string}` - `valid` is `true` if the ships are valid, and `false` with `error` containing the reason otherwise.
     */
    validateShips() {
        if (this.ships.size === 0 && SHIPS_TO_PLACE.length !== 0) {
            return { valid: false, error: "Place your ships not touching each other." };
        }
        try {
            const shipsFound = this.getAllShipCellsGroups();
            // Check if we have the right number of ships
            if (shipsFound.length !== SHIPS_TO_PLACE.length) {
                return { valid: false, error: `Expected ${SHIPS_TO_PLACE.length} ships, but found ${shipsFound.length}.` };
            }
            // Check if we have the ships of the right lengths
            const expectedLengths = [...SHIPS_TO_PLACE].sort();
            const actualLengths = shipsFound.map(ship => ship.size).sort();
            if (JSON.stringify(expectedLengths) !== JSON.stringify(actualLengths)) {
                return { valid: false, error: `The length of the ships is not correct.` };
            }
            return { valid: true, error: "" };
        } catch (error) {
            return { valid: false, error: (error as Error).message };
        }
    }
    /**
     * Get all ship cells groups as Sets of BoardPositionString.
     * @returns {Set<BoardPositionString>[]} - Array of Sets, each containing the positions of a ship.
     * @throws {Error} If any ship is not in a valid line.
     */
    private getAllShipCellsGroups() {
        const shipsFound: Set<BoardPositionString>[] = [];
        for (const positionString of this.ships) {
            if (shipsFound.some(ship => ship.has(positionString))) {
                continue;
            }
            const ship = this.getShipCellsGroup(BoardPosition.fromString(positionString));
            shipsFound.push(ship);
        }
        return shipsFound;
    }
    /**
     * Get a group of ship cells starting from a position.
     * @param position - The starting position of the ship.
     * @returns {Set<BoardPositionString>} - A Set containing the positions of the ship.
     * @throws {Error} If the ship is not in a valid line.
     */
    private getShipCellsGroup(position: BoardPosition) {
        const ship = new Set<BoardPositionString>();
        // Use a stack to navigate through the ship cells
        // This allows us to find all connected ship cells in a non-recursive way
        const navigationStack: BoardPosition[] = [position];

        const isNewShipCell = (pos: BoardPosition): boolean =>
            this.hasShipCell(pos) && !ship.has(pos.toString());

        while (navigationStack.length > 0) {
            const current = navigationStack.pop()!;
            if (!isNewShipCell(current)) continue;
            ship.add(current.toString());
            for (const adj of current.adjacentPositions) {
                if (isNewShipCell(adj)) { navigationStack.push(adj); }
            }
        }
        if (!BoardPosition.areInLineStrings([...ship])) {
            throw new Error(`Ship at position ${position.toString()} is not in a valid line.`);
        };
        return ship;
    }

}