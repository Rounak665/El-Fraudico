import React, { useState } from 'react';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddPlayer = ({ onPlayerAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        shortDesc: '',
        description: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("player", new Blob([JSON.stringify({
            name: formData.name,
            shortDesc: formData.shortDesc,
            description: formData.description
        })], { type: "application/json" }));
        data.append("image", formData.image);

        try {
            const response = await fetch(`${API_BASE_URL}/players`, {
                method: 'POST',
                body: data
            });

            if (response.ok) {
                const newPlayer = await response.json();
                onPlayerAdded(newPlayer);
                setFormData({ name: '', shortDesc: '', description: '', image: null });
            } else {
                alert("Failed to add player.");
            }
        } catch (error) {
            console.error("Error adding player:", error);
        }
    };

    return (
        <form className="add-player-form" onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input name="shortDesc" value={formData.shortDesc} onChange={handleChange} placeholder="Short Description" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
            <input type="file" name="image" accept="image/*" onChange={handleChange} required />
            <button type="submit">Add Player</button>
        </form>
    );
};

export default AddPlayer;
