import { InputHTMLAttributes } from 'react';

interface GameInputProps extends InputHTMLAttributes<HTMLInputElement> { }

export function GameInput(props: GameInputProps) {
    return (
        <input
            {...props}
            className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
        />
    );
}