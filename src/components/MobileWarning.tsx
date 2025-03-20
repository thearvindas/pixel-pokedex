import React from 'react';
import styled from 'styled-components';

const WarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background-color: #87CEEB;
  text-align: center;
`;

const Message = styled.p`
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  color: #333;
  margin-bottom: 2rem;
  font-family: 'Press Start 2P', system-ui;
  line-height: 1.6;
`;

const Pokeball = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  margin: 20px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: #FF0000;
    border-radius: 100px 100px 0 0;
    border: 8px solid #000;
    border-bottom: none;
    box-sizing: border-box;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: white;
    border-radius: 0 0 100px 100px;
    border: 8px solid #000;
    border-top: none;
    box-sizing: border-box;
  }
`;

const CenterButton = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: white;
  border: 8px solid #000;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #000;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const HorizontalLine = styled.div`
  position: absolute;
  width: 100%;
  height: 8px;
  background-color: #000;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

export const MobileWarning: React.FC = () => {
  return (
    <WarningContainer>
      <Message>
        This site's not feeling its best on mobile. Try it on a computer!
      </Message>
      <Pokeball>
        <HorizontalLine />
        <CenterButton />
      </Pokeball>
    </WarningContainer>
  );
}; 