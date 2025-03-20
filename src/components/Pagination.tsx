import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px;
`;

const PageButton = styled.button<{ disabled?: boolean }>`
  background-color: ${props => props.disabled ? '#306230' : '#0f380f'};
  color: #9bbc0f;
  border: 2px solid #0f380f;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 2px 2px 0 #0f380f;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover {
    background-color: ${props => props.disabled ? '#306230' : '#9bbc0f'};
    color: ${props => props.disabled ? '#8bac0f' : '#0f380f'};
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 #0f380f;
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: 2px 2px 0 #0f380f;
  }
`;

const PageInfo = styled.span`
  font-family: 'Press Start 2P', cursive;
  color: #0f380f;
  font-size: 8px;
  text-shadow: 1px 1px 0 #9bbc0f;
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <PaginationContainer>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </PageButton>
      <PageInfo>
        Page {currentPage} of {totalPages}
      </PageInfo>
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </PageButton>
    </PaginationContainer>
  );
}; 