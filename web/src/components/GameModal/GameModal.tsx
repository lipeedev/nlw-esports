import * as Dialog from '@radix-ui/react-dialog';
import { Game } from '../../typings/game';
import { GameForm } from './GameForm';

export function GameModal() {

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='fixed bg-black/60 inset-0' />

            <Dialog.Content className='w-[480px] -translate-x-1/2 -translate-y-1/2 fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 shadow-lg shadow-black/25'>
                <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

                <GameForm />
            </Dialog.Content>

        </Dialog.Portal>
    );
}