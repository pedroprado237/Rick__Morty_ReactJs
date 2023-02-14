import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(res => res.json())
      .then(res => {
        setCharacters(res.results);
      });
  }, []);

  const show = (char) => {
    setIsOpen(true);
    setCharacter(char);
  }

  const handleClose = () => setIsOpen(false);

  return (
    <div className="bodyPage">
      <ul className='characters'>
        {characters.map((character, index) => {
          return (
            <li id='cardsPage' key={index} onClick={() => show(character)}>
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </li>
          );
        })}
      </ul>
      <Modal show={isOpen} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          {/* Condição ternário, verificando se character.name existe, caso não, definine o titulo como "Unknown" */}
          <div className="titleModal">
            {character ? character.name : "Unknown"}
          </div>
        </Modal.Header>
        <Modal.Body>
          {character && (
            <div className="bodyModal">
              <div className="imgCharacter">
                <img src={character.image} alt={character.name} />
              </div>
              <div className="infosCharacter">
                <p>Name: {character.name}</p>
                <p>Status: {character.status}</p>
                <p>Origin: {character.origin.name}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
