import { useEffect, useState } from 'react';

function Footer() {
  const [letters, setLetters] = useState([
    'A',
    'F',
    'G',
    'D',
    'E',
    'K',
    'L',
    'X',
    'O',
    'R',
  ]);

  const getRandomLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLetters((prevLetters) => {
        const newLetters = [...prevLetters];
        const randomIndex = Math.floor(Math.random() * newLetters.length);
        newLetters[randomIndex] = getRandomLetter() as string;
        return newLetters;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      aria-label="Flying Text"
      className="fixed bottom-0 z-50 hidden w-full bg-white sm:block"
    >
      <div className="mx-auto px-4 pb-16 sm:px-6 lg:px-2">
        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          {letters.map((letter, index) => (
            <li key={index}>
              <h1 className="text-sm text-gray-700 transition hover:text-gray-700/75">
                {letter}
              </h1>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
