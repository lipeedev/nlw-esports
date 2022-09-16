import * as Dialog from '@radix-ui/react-dialog';
import { MagnifyingGlassPlus } from 'phosphor-react';

export function GameBox() {
    return (
        <div className='pt-1 self-stretch bg-gradient-duo-text rounded-lg overflow-hidden mt-8'>
            <div className='py-6 px-8 bg-[#2A2634] self-stretch flex justify-between items-center'>
                <div>
                    <strong className='text-2xl font-black text-white block'>Não encontrou seu duo?</strong>
                    <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
                </div>


                <Dialog.Trigger className='bg-violet-500 text-white px-4 py-3 rounded-md hover:bg-violet-600 flex items-center gap-3'>
                    <MagnifyingGlassPlus size={24} />
                    Publicar anúncio
                </Dialog.Trigger>
            </div>
        </div>
    );
}