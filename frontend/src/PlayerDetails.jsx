import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PlayerDetails.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function PlayerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/players/${id}`)
            .then((res) => res.json())
            .then((data) => setPlayer(data))
            .catch((err) => console.error('Error fetching player:', err));
    }, [id]);

    if (!player) return <p>Loading...</p>;

    return (
        <div className="detail-container">
            <button onClick={() => navigate('/')} className="back-button">
                ⬅️ Back to Fraud List
            </button>
            <h1>{player.name}</h1>
            <img src={player.imageUrl} alt={player.name} />
            <p>{player.description}</p>
        </div>
    );
}

export default PlayerDetail;
