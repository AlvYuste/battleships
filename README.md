# 🛥️ Battleship Game

A classic battleship game built with React, TypeScript, and Vite to explore state/reducer management and 2D map navigation algorithms. Players take turns placing their ships and then trying to sink each other's fleet in this turn-based strategy game.

<img width="1308" height="937" alt="image" src="https://github.com/user-attachments/assets/29332038-cf90-4c8d-bdaf-b5f4909c9f44" />

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd battleship
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`


## 🎮 Game Features

- **Ship Placement Phase**: Players place their fleet on a 10x10 grid
- **Battle Phase**: Take turns shooting at opponent's grid to find and sink their ships
- **Ship Fleet**: Standard battleship fleet with ships of different sizes:
  - 1x Carrier (5 cells)
  - 1x Battleship (4 cells)
  - 2x Destroyer (3 cells each)
  - 1x Submarine (2 cells)
- **Visual Feedback**: Different cell states (water, ship, hit, miss) with clear visual indicators
- **Game Validation**: Ensures ships are placed correctly (not touching, proper alignment)
- **Winner Detection**: Game ends when all ships of a player are sunk

## 🎯 How to Play

1. **Start Game**: Click "Start Game" to begin
2. **Place Ships**: 
   - Click on cells to place your ships
   - Ships must be placed horizontally or vertically
   - Ships cannot touch each other
   - All ships must be placed before confirming
3. **Battle Phase**:
   - Take turns to click on opponent's board to shoot
   - If the shoot hits a ship, the player keeps the turn
   - Hit ships are marked in red, misses in blue
4. **Win Condition**: First player to sink all opponent ships wins!

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Board.tsx        # Game board component
│   └── Board.module.css
├── models/              # Game logic and data models
│   ├── BoardPosition.ts # Position handling on the board
│   └── Player.ts        # Player state and ship management
├── pages/               # Main game pages
│   ├── Game.tsx         # Main game component
│   └── Game.module.css
├── store/              
│   └── store.ts         # Game store and actions
├── utils/               # Utility functions and constants
│   └── constants.ts     # Game constants and types
└── main.tsx             # Application entry point
```

## 🧪 Technology Stack

- **React 19** - UI library with modern hooks
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **CSS Modules** - Scoped styling
- **immer-reducer** - Immutable state management
- **ESLint** - Code linting and formatting

## 🏗️ Architecture

The game uses a clean architecture with:

- **Component-based UI**: Modular React components with CSS modules
- **Immutable State**: Uses immer-reducer for predictable state updates
- **Type Safety**: Full TypeScript coverage for runtime safety
- **Separation of Concerns**: Clear separation between UI, game logic, and state management

## 🤝 Contributing

Feel free to submit issues and pull requests to help improve the game!

## 📄 License

This project is open source and available under the MIT License.
