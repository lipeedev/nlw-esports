interface GameCardProps {
    url: string;
    name: string;
    adsCount: number;
}

export function GameCard({ url, name, adsCount }: GameCardProps) {
    return (
        <a className='relative rounded overflow-hidden'>
            <img src={url} />
            <div className='w-full pt-16 pb-4 px-4 bg-gradient-game-card absolute bottom-0 left-0 right-0'>
                <strong className='font-bold text-white block'>{name}</strong>
                <span className='text-sm text-zinc-300 block'>{adsCount} Anúncio(s)</span>
            </div>
        </a>
    );
}