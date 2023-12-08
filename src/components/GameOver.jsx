import "./GameOver.css"

export const GameOver = ({winner, onRestart}) => {

    return (
        <div className="container">
            <h1>Game Over</h1>
            {winner ? <p>The winner is {winner}</p> : <p>It is a draw</p>}
            <button onClick={onRestart}>Restart the game</button>
        </div>
    )
}
