import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditPlayer.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function EditPlayer() {
    const [player, setPlayer] = useState(null);
    const [name, setName] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [newImage, setNewImage] = useState(null);  // For the new image file
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}/players/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPlayer(data);
                setName(data.name);
                setShortDesc(data.shortDesc);
                setImageUrl(data.imageUrl);
            })
            .catch((err) => console.error('Error fetching player details:', err));
    }, [id]);

    // Handle the file input change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('id', id); // optional depending on how backend uses it

        // 👇 Create a player object and stringify it
        const updatedPlayer = {
            name,
            shortDesc,
            imageUrl // keep it in case image isn't being changed
        };
        formData.append('player', new Blob([JSON.stringify(updatedPlayer)], { type: 'application/json' }));

        // 👇 Attach image if provided
        if (newImage) {
            formData.append('image', newImage);
        }

        // 👇 Send PUT request with FormData
        fetch(`${API_BASE_URL}/players/${id}`, {
            method: 'PUT',
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setIsSubmitting(false);
                navigate(`/player/${id}`);
            })
            .catch((err) => {
                setIsSubmitting(false);
                console.error('Error updating player:', err);
            });
    };



    return (
        <div className="edit-container">
            <h1>Edit Player</h1>
            {player ? (
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="shortDesc">Short Description</label>
                        <textarea
                            id="shortDesc"
                            value={shortDesc}
                            onChange={(e) => setShortDesc(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="imageUrl">Current Image</label>
                        {imageUrl && (
                            <div className="current-image-container">
                                <img src={imageUrl} alt="Player" className="current-image" />
                                <p>Current Image</p>
                            </div>
                        )}
                        <label htmlFor="newImage">Select New Image (optional)</label>
                        <input
                            type="file"
                            id="newImage"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            ) : (
                <p>Loading player details...</p>
            )}
        </div>
    );
}

export default EditPlayer;
