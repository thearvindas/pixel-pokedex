import React from 'react';
import styled from 'styled-components';
import { Pokemon } from '../services/pokeApi';
import { LoadingSpinner } from '../components/LoadingSpinner';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #2c532c;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #0f380f;
    border-radius: 4px;
  }
`;

const PokemonSprite = styled.img`
  width: 96px;
  height: 96px;
  image-rendering: pixelated;
  margin: 0 auto;
`;

const StatsContainer = styled.div`
  background-color: #7bac7b;
  border: 2px solid #0f380f;
  border-radius: 4px;
  padding: 8px;
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StatLabel = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: #0f380f;
  flex: 1;
  text-transform: capitalize;
`;

const StatBarContainer = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #2c532c;
  border-radius: 4px;
  overflow: hidden;
`;

const StatValue = styled.div<{ value: number }>`
  height: 100%;
  width: ${props => (props.value / 255) * 100}%;
  background-color: #0f380f;
`;

const StatNumber = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: #0f380f;
  width: 24px;
  text-align: right;
`;

const TypesContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 10px 0;
`;

const TypeBadge = styled.div`
  background-color: #0f380f;
  color: #98cb98;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  text-transform: capitalize;
`;

const PokemonName = styled.h1`
  color: #0f380f;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  text-transform: capitalize;
  margin: 0 0 10px;
  text-align: center;
`;

const PokemonNumber = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: #0f380f;
  opacity: 0.7;
  text-align: center;
  margin-bottom: 10px;
`;

interface PokemonDetailProps {
  pokemon: Pokemon;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
  if (!pokemon) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <MainContent>
        <PokemonName>{pokemon.name}</PokemonName>
        <PokemonNumber>#{String(pokemon.id).padStart(3, '0')}</PokemonNumber>
        <PokemonSprite
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <TypesContainer>
          {pokemon.types.map((type) => (
            <TypeBadge key={type.type.name}>
              {type.type.name}
            </TypeBadge>
          ))}
        </TypesContainer>
        <StatsContainer>
          {pokemon.stats.map((stat) => (
            <StatRow key={stat.stat.name}>
              <StatLabel>{stat.stat.name}</StatLabel>
              <StatBarContainer>
                <StatBar>
                  <StatValue value={stat.base_stat} />
                </StatBar>
                <StatNumber>{stat.base_stat}</StatNumber>
              </StatBarContainer>
            </StatRow>
          ))}
        </StatsContainer>
      </MainContent>
    </Container>
  );
};

export default PokemonDetail; 