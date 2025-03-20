import { Pokemon } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (): Promise<Pokemon[]> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=151`);
  const data = await response.json();
  
  const pokemonPromises = data.results.map(async (pokemon: { name: string; url: string }) => {
    const response = await fetch(pokemon.url);
    return response.json();
  });

  return Promise.all(pokemonPromises);
};

export const fetchPokemonById = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error('Pokemon not found');
  }
  return response.json();
}; 