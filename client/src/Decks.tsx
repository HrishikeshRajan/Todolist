import React, { useState } from 'react'
import { BaseDecksURI } from './utils/constants';
import { useParams } from 'react-router-dom';

const Decks = () => {
    const id =useParams()
    const [description, setDescription] = useState('');

    const updateDeck = (e: React.FormEvent) => {
        e.preventDefault();
    
        fetch(BaseDecksURI + '/' + id.id, {
          method: 'PUT',
          body: JSON.stringify({ description }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((result) => {
            setDescription('');
            return result.json();
          })
          .then(() => {})
          .catch((e: React.ErrorInfo) => {
            console.log(e);
          });
      };
      return (
        <div className="">
          <form onSubmit={updateDeck}>
            <label htmlFor="title"> Deck Title </label>
            <input
              id="title"
              type="text"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(e.target.value);
              }}
            />
            <button>Update Deck</button>
          </form>

        </div>
      );
}

export default Decks