import React, {useState} from 'react';
import './Player.css'

function Player({initialName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);
    const toggle = () => {
        // setIsEditing(!isEditing);
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangeName(symbol, playerName)
        }

    }
    const handleChange = (event) => {
        setPlayerName(event.target.value)
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {isEditing ?
                    <input type="text" required value={playerName} onChange={handleChange}/>
                    : <span className="player-name">{playerName}</span>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={toggle} className="edit-btn">{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}

export default Player;
