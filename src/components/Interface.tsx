import type { Session } from 'next-auth/core/types';
import { useEffect, useRef, useState } from 'react';

import data from '../../public/text.json';

const wordCount = 4;

function getRandomText() {
  const wordList: (string | undefined)[] = [];

  while (wordList.length < wordCount) {
    const randomWord = data[Math.floor(Math.random() * data.length)];
    if (
      wordList[wordList.length - 1] !== randomWord ||
      wordList[wordList.length - 1] === undefined
    ) {
      wordList.push(randomWord);
    }
  }

  return wordList.length > 0 ? wordList : ['Error: No text found. Try again!'];
}

interface InterfaceProps {
  user: Session;
  typingState: (isFinished: boolean) => void;
}

const Interface: React.FC<InterfaceProps> = ({ user, typingState }) => {
  const [inputValue, setInputValue] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [typingText, setTypingText] = useState(getRandomText());
  const [wpm, setWpm] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const firstName = user.user?.name?.split(' ')[0];
  const email = user.user?.email;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFinished) {
      const durationInMinutes = startTime
        ? (Date.now() - startTime) / 60000
        : 0;
      setWpm(Math.floor(Number((wordIndex / durationInMinutes).toFixed(2))));
      typingState(true);
    }
  }, [isFinished, wordIndex, typingText, startTime, typingState]);

  const handleChange = (e: { target: { value: string } }) => {
    const currentInput = e.target.value;
    setInputValue(currentInput);

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (currentInput === typingText[wordIndex] && wordIndex === wordCount - 1) {
      setIsFinished(true);
      setInputValue('');
    } else if (currentInput.endsWith(' ') || currentInput.endsWith('\n')) {
      if (currentInput.trim() === typingText[wordIndex]) {
        setWordIndex(wordIndex + 1);
      }
      setInputValue('');
    }
  };

  const handleTryAgain = () => {
    setWordIndex(0);
    setWpm(0);
    setStartTime(null);
    setInputValue('');
    setTypingText(getRandomText());
    setIsFinished(false);
    inputRef.current?.focus();
    typingState(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isFinished) {
      handleTryAgain();
    }
  };

  useEffect(() => {
    const handleEnterPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isFinished) {
        handleTryAgain();
      }
    };

    document.addEventListener('keydown', handleEnterPress);

    inputRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleEnterPress);
    };
  }, [isFinished]);

  const renderWord = (word: string, index: number) => {
    const wordWithOptionalSpace = index === wordCount - 1 ? word : `${word} `;
    return wordWithOptionalSpace.split('').map((char, charIndex) => {
      const isCorrect =
        index < wordIndex ||
        (index === wordIndex && inputValue[charIndex] === char);
      const isError =
        index === wordIndex &&
        inputValue[charIndex] !== char &&
        charIndex < inputValue.length;
      return (
        <span
          key={charIndex}
          style={{
            textDecoration: isCorrect || isError ? 'line-through' : 'none',
            color: isError ? 'red' : isCorrect ? 'blue' : 'inherit',
          }}
        >
          {char}
        </span>
      );
    });
  };

  const updateTypingHistory = async () => {
    if (!isFinished || !wpm || !email) return;

    try {
      await fetch('/api/update_history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wpm,
        }),
      });
    } catch (error) {
      console.error('Error updating typing history', error);
    }
  };

  useEffect(() => {
    if (isFinished) {
      updateTypingHistory();
    }
  }, [isFinished, wpm]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center p-4 pb-32">
        <div className="max-width-2-3 flex items-center justify-center rounded bg-white p-2 shadow-2xl">
          <div
            id="typingtext"
            className="relative flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-100 to-teal-100 p-2 text-xl"
          >
            <div className={`roboto grow ${isFinished ? 'blur' : ''}`}>
              {typingText.map((word, index) => (
                <span key={`${word}-${index}`}>
                  {renderWord(word ?? '', index)}
                </span>
              ))}
            </div>
            {isFinished && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-4xl font-bold">{`${wpm} WPM`}</p>
                {/* <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="inline-flex items-center">
                    <span className="inline-flex items-center justify-center rounded border border-black p-1 shadow-sm">
                      &#x2190;
                    </span>
                    <span className="ml-2">Leaderboard</span>
                  </div>
                  <div className="inline-flex items-center">
                    <span className="mr-2">Stats & History</span>
                    <span className="inline-flex items-center justify-center rounded border border-black p-1 shadow-sm">
                      &#x2192;
                    </span>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-1/3 items-center justify-center rounded bg-white p-2 shadow-xl">
          <input
            ref={inputRef}
            id="input-field"
            type="text"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            className="w-full rounded-lg p-2 outline-none"
            placeholder={`Welcome to the practice grounds, ${firstName}!`}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isFinished}
          />
          <button
            type="button"
            className="ml-2 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 p-2 text-white shadow-xl"
            onClick={handleTryAgain}
          >
            Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interface;
