import './App.css'
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import {Log} from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import {GameOver} from "./components/GameOver.jsx";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
const deriveActivePlayer = (gameTurns) => {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O'
    }
    return currentPlayer;
}
const deriveWinner = (gameBoard, players) => {

    let winner;
    for (const combination of WINNING_COMBINATIONS) {
        const firstSymbol =
            gameBoard[combination[0].row][combination[0].column];
        const secondSymbol =
            gameBoard[combination[1].row][combination[1].column];
        const thirdSymbol =
            gameBoard[combination[2].row][combination[2].column];
        if (firstSymbol &&
            firstSymbol === secondSymbol &&
            secondSymbol === thirdSymbol) {
            winner = players[firstSymbol];
        }

    }
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState({
        'X': 'Player 1',
        'O': 'Player 2'
    });
    // const [hasWinner, setHasWinner] = useState(false);
    // const [activePlayer, setActivePlayer] = useState('X');
    const activePlayer = deriveActivePlayer(gameTurns);

    let gameBoard = [...initialGameBoard.map(array => [...array])];
    // deriving state from props
    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player
    }
    const winner = deriveWinner(gameBoard, players)
    const hasDraw = gameTurns.length === 9 && !winner;
    const handleSelectSquare = (rowIndex, colIndex) => {
        // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
        // immutable
        setGameTurns(prevTurns => {
            let currentPlayer = deriveActivePlayer(prevTurns)
            const updateTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer},
                ...prevTurns]
            return updateTurns
        })
    }
    const handleRestart = () => {
        setGameTurns([])
    }
    const handlerPlayerNameChange = (symbol, newName) => {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            }
        })
    }
    return (
        <div className='app-wrapper'>
            {/*should be logo*/}
            <h1>Tic-Tac-Toe</h1>
            <div className="game-container">
                <div>
                    <ol className="players">
                        <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}
                                onChangeName={handlerPlayerNameChange}/>
                        <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}
                                onChangeName={handlerPlayerNameChange}/>
                    </ol>
                    {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
                    <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
                </div>

            </div>
            {(winner || hasDraw) ? null : <Log turns={gameTurns}/>}
        </div>
    )
}

export default App
