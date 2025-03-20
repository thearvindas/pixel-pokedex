import React from 'react';
import styled from 'styled-components';
import { Pokemon } from '../types/pokemon';

const StatsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
`;

const StatRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StatLabel = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: #2c532c;
  font-size: 8px;
  text-transform: uppercase;
`;

const StatBar = styled.div<{ value: number }>`
  height: 6px;
  background-color: #2c532c;
  width: ${props => (props.value / 255) * 100}%;
  border-radius: 2px;
  position: relative;
  
  &::after {
    content: '${props => props.value}';
    position: absolute;
    right: -24px;
    top: -4px;
    font-family: 'Press Start 2P', cursive;
    font-size: 6px;
    color: #2c532c;
  }
`;

interface PokemonStatsProps {
  pokemon: Pokemon | null;
}

export const PokemonStats: React.FC<PokemonStatsProps> = ({ pokemon }) => {
  if (!pokemon) {
    return (
      <StatsContainer>
        <StatLabel>No Pokémon selected</StatLabel>
      </StatsContainer>
    );
  }

  return (
    <StatsContainer>
      {pokemon.stats.map(stat => (
        <StatRow key={stat.stat.name}>
          <StatLabel>{stat.stat.name}</StatLabel>
          <StatBar value={stat.base_stat} />
        </StatRow>
      ))}
    </StatsContainer>
  );
}; 