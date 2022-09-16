import { FormEvent, useEffect, useState } from 'react';
import { Check, GameController } from 'phosphor-react';

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Game } from '../../typings/game';
import { GameInput } from './GameInput';

type GameFormList = Pick<Game, 'title' | 'id'>[];


export function GameForm() {
    const [games, setGames] = useState<GameFormList>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);


    useEffect(() => {
        fetch('http://localhost:3333/games')
            .then(r => r.json())
            .then(data => setGames(data));
    }, []);

    async function handleSubmitForm(ev: FormEvent) {
        ev.preventDefault();
        const formData = new FormData(ev.target as HTMLFormElement);

        const data = Object.fromEntries(formData);

        try {
            await fetch(`http://localhost:3333/games/${data.game}/ads`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    yearsPlaying: Number(data.yearsPlaying),
                    discord: data.discord,
                    weekDays: weekDays.map(Number),
                    hourStart: data.hourStart,
                    hourEnd: data.hourEnd,
                    useVoiceChannel: useVoiceChannel
                })
            });

            alert('Anúncio cadastrado com sucesso!');
        } catch (err) {
            console.error(err);
            alert('Erro ao enviar anúncio!');
        }
    }

    return (
        <form onSubmit={handleSubmitForm} className='mt-8 flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <label htmlFor='game' className='font-semibold'>Qual o Game?</label>

                <select name='game' id='game' className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none' defaultValue='' >
                    <option selected disabled>Selecione o Game que deseja jogar</option>

                    {games.map(game => <option key={game.id} value={game.id}>{game.title}</option>)}
                </select>
            </div>


            <div className='flex flex-col gap-2'>
                <label htmlFor='name' className='font-semibold'>Seu nome (ou nickname)</label>
                <GameInput name='name' id='name' placeholder='Como te chamam dentro do Game?' />
            </div>


            <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='yearsPlaying' className='font-semibold'>Joga há quantos anos?</label>
                    <GameInput type='number' name='yearsPlaying' id='yearsPlaying' placeholder='Tudo bem ser ZERO' />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor='discord' className='font-semibold'>Qual seu Discord?</label>
                    <GameInput name='discord' id='discord' placeholder='Usuário#0001' />
                </div>
            </div>


            <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='weekDays' className='font-semibold'>Quando costuma a jogar?</label>

                    <ToggleGroup.Root onValueChange={setWeekDays} value={weekDays} type='multiple' className='grid grid-cols-4 gap-2'>
                        <ToggleGroup.Item value='0' title='Domingo' className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>D</ToggleGroup.Item>
                        <ToggleGroup.Item value='1' title='Segunda' className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                        <ToggleGroup.Item value='2' title='Terça' className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>T</ToggleGroup.Item>
                        <ToggleGroup.Item value='3' title='Quarta' className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                        <ToggleGroup.Item value='4' title='Quinta' className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                        <ToggleGroup.Item value='5' title='Sexta' className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                        <ToggleGroup.Item value='6' title='Sábado' className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                    </ToggleGroup.Root>
                </div>

                <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor='hourStart' className='font-semibold'>Qual horário do dia?</label>

                    <div className='grid grid-cols-2 gap-2'>
                        <GameInput name='hourStart' id='hourStart' type='time' placeholder='De' />
                        <GameInput name='hourEnd' id='hourEnd' type='time' placeholder='Até' />
                    </div>
                </div>
            </div>


            <label className='mt-2 flex items-center gap-2 text-sm'>
                <Checkbox.Root className='w-6 h-6 p-1 rounded bg-zinc-900' checked={useVoiceChannel} onCheckedChange={checked => checked ? setUseVoiceChannel(true) : setUseVoiceChannel(false)}>
                    <Checkbox.Indicator>
                        <Check className='w-4 h-4 text-emerald-400' />
                    </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
            </label>


            <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close className='bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold'>Cancelar</Dialog.Close>
                <button className='bg-violet-500 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3' type='submit'>
                    <GameController size={24} />
                    Encontrar Duo
                </button>
            </footer>
        </form>
    );
}