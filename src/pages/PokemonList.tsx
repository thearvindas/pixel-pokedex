import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchBar } from '../components/SearchBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import pokeApi, { Pokemon, PokemonListResponse } from '../services/pokeApi';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 10px;
  overflow-y: auto;
  max-height: calc(100% - 60px);
  
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

const PokemonCard = styled.div`
  background-color: #7bac7b;
  border: 2px solid #0f380f;
  border-radius: 4px;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PokemonSprite = styled.img`
  width: 48px;
  height: 48px;
  image-rendering: pixelated;
`;

const PokemonName = styled.h3`
  margin: 4px 0;
  color: #0f380f;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  text-transform: capitalize;
`;

const PokemonNumber = styled.span`
  font-size: 8px;
  color: #0f380f;
  opacity: 0.7;
  font-family: 'Press Start 2P', cursive;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  gap: 10px;
`;

const NavButton = styled.button<{ disabled?: boolean }>`
  background-color: #0f380f;
  color: #98cb98;
  border: none;
  padding: 5px 10px;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover:not(:disabled) {
    background-color: #2c532c;
  }
`;

const ErrorMessage = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: #e4000f;
  text-align: center;
  padding: 20px;
  line-height: 1.5;
`;

const RetryButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #0f380f;
  color: #98cb98;
  border: none;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  cursor: pointer;

  &:hover {
    background-color: #2c532c;
  }
`;

interface PokemonListProps {
  onSelectPokemon: (pokemon: Pokemon) => void;
}

const ITEMS_PER_PAGE = 6;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const PokemonList: React.FC<PokemonListProps> = ({ onSelectPokemon }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchWithRetry = async <T,>(operation: () => Promise<T>, retries = MAX_RETRIES): Promise<T> => {
    try {
      return await operation();
    } catch (error) {
      if (retries > 0) {
        await sleep(RETRY_DELAY);
        return fetchWithRetry(operation, retries - 1);
      }
      throw error;
    }
  };

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch initial Pokemon list
      const listData = await fetchWithRetry<PokemonListResponse>(() => pokeApi.getPokemonList(151));
      
      // Fetch individual Pokemon details with retry logic
      const pokemonDetails = await Promise.allSettled(
        listData.results.map(async (pokemon: { url: string }) => {
          const id = pokemon.url.split('/').slice(-2, -1)[0];
          try {
            return await fetchWithRetry<Pokemon>(() => pokeApi.getPokemonById(parseInt(id)));
          } catch (error) {
            throw new Error(`Failed to fetch Pokemon #${id}`);
          }
        })
      );

      // Filter out failed requests and handle successful ones
      const successfulPokemon = pokemonDetails
        .filter((result): result is PromiseFulfilledResult<Pokemon> => 
          result.status === 'fulfilled'
        )
        .map(result => result.value);

      if (successfulPokemon.length === 0) {
        throw new Error('Failed to load any Pokemon data');
      }

      setPokemonList(successfulPokemon);
      setFilteredPokemon(successfulPokemon);
      
      if (successfulPokemon.length > 0) {
        onSelectPokemon(successfulPokemon[0]);
      }

      // If some Pokemon failed to load, show a partial error
      if (successfulPokemon.length < listData.results.length) {
        setError(`Loaded ${successfulPokemon.length} out of ${listData.results.length} Pokemon`);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load Pokemon');
      setPokemonList([]);
      setFilteredPokemon([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [onSelectPokemon]);

  useEffect(() => {
    const filtered = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pokemon.id.toString().includes(searchQuery)
    );
    setFilteredPokemon(filtered);
    setCurrentPage(1);
    if (filtered.length > 0) {
      onSelectPokemon(filtered[0]);
    }
  }, [searchQuery, pokemonList, onSelectPokemon]);

  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPokemon = filteredPokemon.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && pokemonList.length === 0) {
    return (
      <Container>
        <ErrorMessage>
          {error}
          <br />
          <RetryButton onClick={fetchPokemon}>
            Retry
          </RetryButton>
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}
      <SearchBar value={searchQuery} onChange={handleSearch} />
      <GridContainer>
        {currentPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            onClick={() => onSelectPokemon(pokemon)}
          >
            <PokemonSprite
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
            <PokemonNumber>#{String(pokemon.id).padStart(3, '0')}</PokemonNumber>
            <PokemonName>{pokemon.name}</PokemonName>
          </PokemonCard>
        ))}
      </GridContainer>
      <NavigationButtons>
        <NavButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Prev
        </NavButton>
        <NavButton
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </NavButton>
      </NavigationButtons>
    </Container>
  );
};

export default PokemonList; 