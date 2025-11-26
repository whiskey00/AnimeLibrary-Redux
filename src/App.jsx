import './App.css'
import { AnimeList as AnimeList } from './components/animeList';
import { InputAnime as InputAnime } from './components/inputAnime';
import { HeroLibrary as HeroLibrary } from './components/heroLibrary';
import { Stack } from '@mui/material';

function App() {
  return (
    <Stack>
      <HeroLibrary />
      <InputAnime />
      <AnimeList />
    </Stack>
  );
}

export default App
