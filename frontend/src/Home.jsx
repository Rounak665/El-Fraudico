import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPlayer from './AddPlayer.jsx';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Home() {
    const [players, setPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [password, setPassword] = useState('');
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [deletePlayerId, setDeletePlayerId] = useState(null);
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

    const handleDelete = () => {
        const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        if (password === correctPassword) {
            fetch(`${API_BASE_URL}/${deletePlayerId}`, {
                method: 'DELETE',
            })
                .then((res) => res.json())
                .then(() => {
                    setPlayers((prev) => prev.filter((player) => player.id !== deletePlayerId));
                    setIsDeleteMode(false);
                    setDeletePlayerId(null);
                    setPassword('');
                    window.location.reload(); // Reload the page
                })
                .catch((err) => console.error('Error deleting player:', err));
        } else {
            alert("Incorrect password!");
        }
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

            {showForm ? (
                <AddPlayer onPlayerAdded={handlePlayerAdded} />
            ) : (
                <div className="card-container">
                    {filteredPlayers.map((player) => (
                        <div
                            key={player.id}
                            className="card"
                            onClick={() => navigate(`/player/${player.id}`)}
                        >
                            <button
                                className="edit-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/edit/${player.id}`);
                                }}
                            >
                                ✏️
                            </button>

                            <img src={player.imageUrl} alt={player.name} />
                            <h2>{player.name}</h2>
                            <p>{player.shortDesc}</p>

                            <button
                                className="delete-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDeletePlayerId(player.id);
                                    setIsDeleteMode(true);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {isDeleteMode && (
                <>
                    <div className="modal-backdrop" onClick={() => setIsDeleteMode(false)} />
                    <div className="delete-password-prompt">
                        <h3>⚠️ Confirm Deletion</h3>
                        <input
                            type="password"
                            placeholder="Enter password to delete"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={() => setIsDeleteMode(false)}>Cancel</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </>
            )}


            <button className="fab" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'x' : '+'}
            </button>
        </div>
    );
}

export default Home;
