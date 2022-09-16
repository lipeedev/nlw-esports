/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'galaxy-background': 'url(\'/background-galaxy.png\')',
        'gradient-duo-text': 'linear-gradient(89.86deg, #9572FC 0%, #43E7AD 50.52%, #E1D55D 100%)',
        'gradient-game-card': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
      }
    },
  },
  plugins: [],
}
