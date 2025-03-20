import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import { Pokemon } from './services/pokeApi';
import { MobileWarning } from './components/MobileWarning';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #87CEEB;
  gap: 20px;
`;

const PokedexFrame = styled.div`
  background-color: #e4000f;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 
    0 0 0 2px #aa1f2f,
    0 0 0 4px #e4000f,
    0 0 20px rgba(0, 0, 0, 0.3);
  max-width: 900px;
  width: 100%;
  position: relative;
  display: flex;
  gap: 20px;
`;

const PokedexLeft = styled.div`
  flex: 1;
  position: relative;
`;

const PokedexRight = styled.div`
  flex: 1;
  position: relative;
`;

const TopLights = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1;
`;

const Light = styled.div<{ color: string; size?: string }>`
  width: ${props => props.size || '15px'};
  height: ${props => props.size || '15px'};
  background-color: ${props => props.color};
  border-radius: 50%;
  border: 1px solid #aa1f2f;
  box-shadow: 
    inset 0 0 10px rgba(255, 255, 255, 0.8),
    0 0 5px rgba(0, 0, 0, 0.3);
`;

const ScreenFrame = styled.div`
  background-color: #dedede;
  border-radius: 10px;
  padding: 20px;
  margin: 60px 0 20px;
  border: 2px solid #aa1f2f;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
`;

const MainScreen = styled.div`
  background-color: #98cb98;
  border: 3px solid #2c532c;
  border-radius: 5px;
  padding: 15px;
  aspect-ratio: 1;
  position: relative;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
`;

const Controls = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  align-items: center;
`;

const ControlsLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ControlsRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const DPad = styled.div`
  width: 80px;
  height: 80px;
  position: relative;

  &::before, &::after {
    content: '';
    position: absolute;
    background-color: #222;
    border-radius: 5px;
  }

  &::before {
    width: 30px;
    height: 80px;
    left: 25px;
  }

  &::after {
    width: 80px;
    height: 30px;
    top: 25px;
  }
`;

const ButtonsGroup = styled.div`
  display: flex;
  gap: 15px;
`;

const ActionButton = styled.div`
  width: 35px;
  height: 35px;
  background-color: #222;
  border-radius: 50%;
  transform: rotate(-45deg);
`;

const SmallButtonsGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
`;

const SmallButton = styled.div<{ color?: string }>`
  width: 40px;
  height: 10px;
  background-color: ${props => props.color || '#aa1f2f'};
  border-radius: 5px;
`;

const RoundButton = styled.div<{ size?: string; color?: string }>`
  width: ${props => props.size || '20px'};
  height: ${props => props.size || '20px'};
  background-color: ${props => props.color || '#222'};
  border-radius: 50%;
  border: 2px solid #aa1f2f;
  align-self: center;
`;

const Divider = styled.div`
  width: 30px;
  background-color: #aa1f2f;
  margin: 0 -5px;
  border-radius: 5px;
  position: relative;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: #aa1f2f;
    left: -5px;
    border-radius: 50%;
  }

  &::before {
    top: 20%;
  }

  &::after {
    bottom: 20%;
  }
`;

const Credits = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: #0f380f;
  text-align: center;
  white-space: nowrap;
  
  a {
    color: #e4000f;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) {
    return <MobileWarning />;
  }

  return (
    <Router>
      <AppContainer>
        <PokedexFrame>
          <PokedexLeft>
            <TopLights>
              <Light color="#3298cb" size="20px" />
              <Light color="#ff0000" />
              <Light color="#ff0000" />
              <Light color="#ff0000" />
            </TopLights>
            <ScreenFrame>
              <MainScreen>
                <PokemonList onSelectPokemon={setSelectedPokemon} />
              </MainScreen>
            </ScreenFrame>
            <Controls>
              <ControlsLeft>
                <DPad />
              </ControlsLeft>
              <ControlsRight>
                <ButtonsGroup>
                  <ActionButton />
                  <ActionButton onClick={() => window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0', '_blank')} style={{ cursor: 'pointer' }} />
                </ButtonsGroup>
              </ControlsRight>
            </Controls>
            <SmallButtonsGroup>
              <SmallButton color="#222" />
              <SmallButton color="#222" />
              <RoundButton size="15px" />
            </SmallButtonsGroup>
          </PokedexLeft>
          <Divider />
          <PokedexRight>
            <ScreenFrame>
              <MainScreen>
                {selectedPokemon && <PokemonDetail pokemon={selectedPokemon} />}
              </MainScreen>
            </ScreenFrame>
            <SmallButtonsGroup>
              <SmallButton />
              <SmallButton />
              <SmallButton />
              <RoundButton size="15px" />
            </SmallButtonsGroup>
          </PokedexRight>
        </PokedexFrame>
        <Credits>
          Built by <a href="mailto:thearvindas@gmail.com">Arvin</a> using React + Vite + TypeScript + Styled Components + <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer">PokéAPI</a> + <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer">Cursor IDE</a>
        </Credits>
      </AppContainer>
    </Router>
  );
}

export default App;
