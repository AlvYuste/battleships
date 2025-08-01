import { useReducer } from 'react'

import { FINAL_PHASE, INIT_PHASE, SHIPS_PHASE, SHOOT_PHASE } from '../utils/constants';
import { GameActionCreators, gameReducerFunction, initialGameState } from '../store/store';
import Board from '../components/Board';

import styles from './Game.module.css';

const Game: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducerFunction, initialGameState);
  return (
    <div>
      <h1 className={styles.title}>Battleship</h1>
      {state.phase === INIT_PHASE && (
        <div>
          <ol>
            <li>Place your ships on the board.</li>
            <li>Shoot your opponent's map to hit their ships.</li>
          </ol>
          <button onClick={() => dispatch(GameActionCreators.startGame())}>Start Game</button>
        </div>
      )}
      {[SHIPS_PHASE, SHOOT_PHASE].includes(state.phase) && (<>
        <div className={styles.boardsContainer}>
          {state.players.map((player, index) => {
            const phase = state.phase;
            const isCurrentPlayer = state.currentPlayer === index;
            const { valid: areShipsValid, error: shipsError } = player.validateShips();
            return (
              <div key={index} className={styles.boardContainer}>
                <Board
                  key={index}
                  title={`Player ${index + 1}`}
                  phase={phase}
                  player={player}
                  isCurrentPlayer={isCurrentPlayer}
                  handleCellClick={position => dispatch(GameActionCreators.cellClick(index, position))} />

                {isCurrentPlayer && (
                  <div className={styles.status}>
                    {phase === SHOOT_PHASE
                      ? <p>Shoot your opponent's ships!</p>
                      : (<>
                        <p>{areShipsValid ? "✔️ Your ships are placed correctly!" : `✖️ ${shipsError}`}</p>
                        <p><button disabled={!areShipsValid} onClick={() => dispatch(GameActionCreators.confirmPlacement())}>Confirm</button></p>
                        <div>
                          <div>1x 🟥🟥🟥🟥🟥</div>
                          <div>1x 🟥🟥🟥🟥</div>
                          <div>2x 🟥🟥🟥</div>
                          <div>1x 🟥🟥</div>
                        </div>
                      </>)}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <button onClick={() => dispatch(GameActionCreators.resetGame())}>Exit game</button>
      </>
      )}
      {state.phase === FINAL_PHASE && (
        <div className={styles.finalMessage}>
          <h2>🎉 Player {state.currentPlayer + 1} wins! 🎉</h2>
          <h3>{state.players.map(p => p.countOfShipCellsAlive).join(' - ')}</h3>
          <button onClick={() => dispatch(GameActionCreators.resetGame())}>Restart Game</button>
        </div>
      )}
    </div >
  )
}

export default Game
