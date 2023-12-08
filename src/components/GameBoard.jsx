import "./GameBoard.css"


const GameBoard = ({onSelectSquare, board}) => {

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);
    //
    // const handleSelectSquare = (rowIndex, colIndex) => {
    //     setGameBoard((prevGameBoard) => {
    //         // update Object-state immutably
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol
    //         return updatedBoard
    //     });
    //     onSelectSquare();
    // }
    return (
        <div className="game-board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((playerSymbol, colIndex) => (
                        <button key={colIndex} className="cell" onClick={() => onSelectSquare(rowIndex, colIndex)}
                                disabled={playerSymbol !== null}>
                            {playerSymbol}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GameBoard;
