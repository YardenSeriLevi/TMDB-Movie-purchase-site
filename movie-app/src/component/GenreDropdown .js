import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const GenreDropdown = ({ genres, handleGenreClick }) => {
    const [selectedGenre, setSelectedGenre] = useState(null);

    const handleGenreItemClick = (event, genre) => {
        setSelectedGenre(genre);
        handleGenreClick(event, genre.id);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary">
                {selectedGenre ? selectedGenre.name : 'Genres'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {genres.map((genre) => (
                    <Dropdown.Item
                        key={genre.id}
                        onClick={(event) => handleGenreItemClick(event, genre)}
                    >
                        {genre.name}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default GenreDropdown;
