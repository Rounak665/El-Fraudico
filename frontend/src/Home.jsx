import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPlayer from './AddPlayer.jsx';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Home() {
    const [players, setPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}/players`)
            .then((res) => res.json())
            .then((data) => setPlayers(data))
            .catch((err) => console.error('Error fetching players:', err));
    }, []);

    const handlePlayerAdded = (newPlayer) => {
        setPlayers((prev) => [...prev, newPlayer]);
        setShowForm(false);
    };

    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (

        <div className="home-container">

            <input
                type="text"
                className="search-bar"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="marquee-container">
                <div className="marquee-track">
    <span className="marquee-text">
      Cristiano ain't allowed here. This turf is Pessi-certified 🥷 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
                    <span className="marquee-text">
      Whoever adds Cristiano Ronaldo 🐐 is gay
    </span>
                </div>
            </div>


            <div className="card-container">
                {filteredPlayers.map((player) => (
                    <div key={player.id} className="card" onClick={() => navigate(`/player/${player.id}`)}>
                        <img src={player.imageUrl} alt={player.name} />
                        <h2>{player.name}</h2>
                        <p>{player.shortDesc}</p>
                    </div>
                ))}
            </div>

            {showForm && <AddPlayer onPlayerAdded={handlePlayerAdded} />}
            <button className="fab" onClick={() => setShowForm(!showForm)}>+</button>
        </div>
    );
}

export default Home;
