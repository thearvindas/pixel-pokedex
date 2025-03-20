import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  background-color: #7bac7b;
  border: 2px solid #0f380f;
  border-radius: 4px;
  color: #0f380f;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;

  &::placeholder {
    color: #2c532c;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #0f380f;
  }
`;

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Search Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </SearchContainer>
  );
}; 