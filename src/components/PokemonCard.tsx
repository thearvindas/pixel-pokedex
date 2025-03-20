import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Pokemon } from '../types/pokemon';

const Card = styled.div`
  background-color: #9bbc0f;
  border: 2px solid #0f380f;
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.1s;
  box-shadow: 2px 2px 0 #0f380f;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 #0f380f;
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: 2px 2px 0 #0f380f;
  }
`;

const PokemonImage = styled.img`
  width: 96px;
  height: 96px;
  image-rendering: pixelated;
  margin: 8px 0;
`;

const PokemonName = styled.h3`
  font-family: 'Press Start 2P', cursive;
  color: #0f380f;
  font-size: 8px;
  margin: 8px 0;
  text-transform: capitalize;
  text-shadow: 1px 1px 0 #9bbc0f;
`;

const PokemonNumber = styled.span`
  font-family: 'Press Start 2P', cursive;
  color: #0f380f;
  font-size: 8px;
  text-shadow: 1px 1px 0 #9bbc0f;
`;

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
      <PokemonNumber>#{String(pokemon.id).padStart(3, '0')}</PokemonNumber>
      <PokemonImage src={pokemon.sprites.front_default} alt={pokemon.name} />
      <PokemonName>{pokemon.name}</PokemonName>
    </Card>
  );
}; 