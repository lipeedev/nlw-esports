import { useEffect, useState } from 'react';
import { Game } from './typings/game';
import * as Dialog from '@radix-ui/react-dialog';

import { GameCard, DuoText, GameBox, GameModal } from './components';

import './styles/main.css';
import logo from './assets/logo-nlw-esports.svg'

export default function App() {

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(r => r.json())
      .then(data => setGames(data));
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto items-center my-20 flex flex-col'>
      <img src={logo} />

      <DuoText />

      <div className='grid grid-cols-6 gap-6'>
        {games.map(g => <GameCard
          adsCount={g._count.ads}
          url={g.bannerUrl}
          name={g.title}
          key={g.id}
        />)}
      </div>

      <Dialog.Root>
        <GameBox />

        <GameModal />
      </Dialog.Root>
    </div>
  );
}
