import React, { useState } from 'react';
import styled from 'styled-components';
import { fetchPokemonById } from '../services/pokemonService';
import { Pokemon } from '../types/pokemon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SearchContainer = styled.div`
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  border: 2px solid #2c532c;
  border-radius: 4px;
  background-color: #c4e4c4;
  color: #2c532c;

  &::placeholder {
    color: #5a775a;
  }

  &:focus {
    outline: none;
    border-color: #2c532c;
  }
`;

const PokemonDisplay = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PokemonImage = styled.img`
  width: 120px;
  height: 120px;
  image-rendering: pixelated;
`;

const PokemonName = styled.h2`
  font-family: 'Press Start 2P', cursive;
  color: #2c532c;
  font-size: 10px;
  text-transform: capitalize;
  margin-top: 10px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: #2c532c;
  font-size: 8px;
  text-align: center;
  padding: 10px;
`;

interface SearchPokemonProps {
  onPokemonSelect: (pokemon: Pokemon | null) => void;
}

export const SearchPokemon: React.FC<SearchPokemonProps> = ({ onPokemonSelect }) => {
  const [searchId, setSearchId] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        setError(null);
        const id = parseInt(searchId);
        if (isNaN(id) || id < 1 || id > 151) {
          setError('Please enter a number between 1 and 151');
          setPokemon(null);
          onPokemonSelect(null);
          return;
        }
        const data = await fetchPokemonById(id);
        setPokemon(data);
        onPokemonSelect(data);
      } catch (err) {
        setError('Pokemon not found');
        setPokemon(null);
        onPokemonSelect(null);
      }
    }
  };

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="number"
          min="1"
          max="151"
          placeholder="Enter Pokémon ID (1-151)"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyDown={handleSearch}
        />
      </SearchContainer>
      <PokemonDisplay>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : pokemon ? (
          <>
            <PokemonImage 
              src={pokemon.sprites.front_default} 
              alt={pokemon.name} 
            />
            <PokemonName>{pokemon.name}</PokemonName>
          </>
        ) : (
          <ErrorMessage>Enter a Pokémon ID to search</ErrorMessage>
        )}
      </PokemonDisplay>
    </Container>
  );
}; 