import type { Session } from 'next-auth/core/types';
import { useEffect, useRef, useState } from 'react';

import data from '../../public/text.json';

const wordCount = 40;

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
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [displayedWPM, setDisplayedWPM] = useState(0);
  const [mistakes, setMistakes] = useState({});
  const [freezeMistakes, setFreezeMistakes] = useState({});
  const [sessionMistakes, setSessionMistakes] = useState({});
  const [totalSessionMistakes, setTotalSessionMistakes] = useState(0);
  const hasUpdatedRef = useRef(false);
  const firstName = user.user?.name?.split(' ')[0];
  const email = user.user?.email;
  const inputRef = useRef<HTMLInputElement>(null);

  async function fetchTypingMistakes() {
    try {
      const response = await fetch('/api/get_mistakes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const { mistakes } = await response.json();
      return mistakes;
    } catch (error) {
      console.error('Failed to fetch typing mistakes:', error);
      return null;
    }
  }

  useEffect(() => {
    if (!hasStartedTyping) {
      fetchTypingMistakes().then((mistakes) => {
        if (mistakes) {
          setMistakes(mistakes);
          setFreezeMistakes(mistakes);
        }
      });
    }
  }, [hasStartedTyping]);

  function getPlaceholderMessage(wpm: number) {
    if (wpm === 0) {
      return `You can start typing here, ${firstName}!`;
    } else if (wpm < 30) {
      return `That's a good start ${firstName}, try to pick up the pace!`;
    } else if (wpm < 50) {
      return `You're doing great ${firstName}, keep pushing!`;
    } else if (wpm < 80) {
      return `Impressive speed ${firstName}, but can you go faster?`;
    } else {
      return `You're a typing master ${firstName}, incredible speed!`;
    }
  }

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

    // Start the timer when the user starts typing
    if (!hasStartedTyping && currentInput.length > 0) {
      setHasStartedTyping(true);
      if (!startTime) {
        setStartTime(Date.now());
      }
    }

    const currentWordWithSpace = typingText[wordIndex] + ' ';
    const isCorrectUpToSpace = currentInput === currentWordWithSpace;

    // If the current word is correct, move to the next word
    if (isCorrectUpToSpace) {
      setWordIndex((prevIndex) => prevIndex + 1);
      setInputValue('');
    }

    // Check for mistakes
    if (currentInput.length > 1) {
      const lastChar = currentInput.slice(-1);
      const expectedChar = typingText[wordIndex]?.[currentInput.length - 1];

      if (
        lastChar !== expectedChar &&
        currentInput.length <= (typingText[wordIndex]?.length ?? 0)
      ) {
        const prevChar = currentInput.slice(-2, -1);
        const correctSequence = prevChar + (expectedChar ?? '');

        if (expectedChar && correctSequence.length === 2) {
          const mistakeKey = `${correctSequence}`;
          updateMistakes(mistakeKey);
        }
      }
    }

    // Check if the typing test is finished
    if (
      currentInput.trim() === typingText[wordIndex] &&
      wordIndex === typingText.length - 1
    ) {
      finishTypingTest();
    }
  };

  // Function to update mistakes
  const updateMistakes = (mistakeKey: string) => {
    setMistakes((prevMistakes: Record<string, number>) => ({
      ...prevMistakes,
      [mistakeKey]: (prevMistakes[mistakeKey] || 0) + 1,
    }));
    setSessionMistakes((prevMistakes: Record<string, number>) => ({
      ...prevMistakes,
      [mistakeKey]: (prevMistakes[mistakeKey] || 0) + 1,
    }));
  };

  // Function to finish the typing test
  const finishTypingTest = () => {
    if (startTime) {
      const durationInMinutes = (Date.now() - startTime) / 60000;
      const calculatedWPM = Math.floor((wordIndex + 1) / durationInMinutes);
      setWpm(calculatedWPM);
    }
    setIsFinished(true);
    setInputValue('');
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
    setSessionMistakes({});
    setTotalSessionMistakes(0);
    setFreezeMistakes({});
    setMistakes({});
    hasUpdatedRef.current = false;
    fetchTypingMistakes().then((mistakes) => {
      if (mistakes) {
        setMistakes(mistakes);
        setFreezeMistakes(mistakes);
      }
    });
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

  const renderWord = (
    word: string,
    index: number,
    mistakes: Record<string, number>
  ) => {
    const wordWithOptionalSpace = index === wordCount - 1 ? word : `${word} `;

    return wordWithOptionalSpace.split('').map((char, charIndex) => {
      const isCorrect =
        index < wordIndex ||
        (index === wordIndex && inputValue[charIndex] === char);
      const isError =
        index === wordIndex &&
        inputValue[charIndex] !== char &&
        charIndex < inputValue.length;
      const matchingSequence = `${char}${wordWithOptionalSpace[charIndex + 1]}`;
      const reversedMatchingSequence = `${
        wordWithOptionalSpace[charIndex - 1]
      }${char}`;
      const shouldHighlight =
        mistakes[matchingSequence] ??
        (0 > 0 || mistakes[reversedMatchingSequence]) ??
        0 > 0;

      return (
        <span
          key={charIndex}
          style={{
            textDecoration: isCorrect || isError ? 'line-through' : 'none',
            color: isError
              ? 'red'
              : isCorrect
              ? 'rgba(0, 20, 255, 0.7)'
              : 'inherit',
            background: shouldHighlight
              ? 'rgba(255, 0, 0, 0.3)'
              : 'transparent',
          }}
        >
          {char}
        </span>
      );
    });
  };

  useEffect(() => {
    if (isFinished && !hasUpdatedRef.current) {
      const totalMistakes = calculateTotalMistakes(sessionMistakes);
      const charCount = calculateCharCount(typingText as string[]);
      const accuracy = calculateAccuracy(charCount, totalMistakes);

      setDisplayedWPM(wpm);
      setTotalSessionMistakes(totalMistakes);
      updateTypingHistory(accuracy, totalMistakes);
      setHasStartedTyping(false);

      hasUpdatedRef.current = true;
    }
  }, [isFinished, mistakes, sessionMistakes, wpm, email]);

  const calculateTotalMistakes = (mistakes: Record<string, number>) => {
    return Object.values<number>(mistakes).reduce<number>(
      (acc: number, curr: number) => acc + curr,
      0
    );
  };

  const calculateCharCount = (text: string[]) => {
    return text.reduce((total, word) => total + (word?.length || 0), 0);
  };

  const calculateAccuracy = (charCount: number, totalMistakes: number) => {
    return Math.floor(((charCount - totalMistakes) / charCount) * 100);
  };

  const updateTypingHistory = async (
    accuracy: number,
    totalSessionMistakes: number
  ) => {
    if (!isFinished || !wpm || !email || wpm > 250) return;

    const timestamp = new Date().getTime();

    try {
      await fetch('/api/update_history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Timestamp': timestamp.toString(),
        },
        body: JSON.stringify({
          wpm,
          mistakes: sessionMistakes,
          accuracy,
          totalSessionMistakes,
        }),
      });
    } catch (error) {
      console.error('Error updating typing history', error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center p-4 pb-32">
        <div className="max-width-2-3 mb-2 flex items-center justify-center rounded bg-white shadow-2xl">
          <div
            id="typingtext"
            className="relative flex items-center justify-center rounded-lg bg-teal-100 p-2 text-xl"
          >
            <div className={`roboto grow ${isFinished ? 'blur' : ''}`}>
              {typingText.map((word, index) => (
                <span key={`${word}-${index}`}>
                  {renderWord(word ?? '', index, freezeMistakes)}
                </span>
              ))}
            </div>
            {isFinished && (
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center">
                <div className="flex flex-row items-center justify-center space-x-4">
                  <p className="self-center">
                    {`Mistakes: ${totalSessionMistakes} `}
                    <span role="img" aria-label="warning">
                      ⚠️
                    </span>
                  </p>
                  <p className="self-center text-3xl font-bold">{`${displayedWPM} WPM`}</p>
                  <p className="self-center">{`Accuracy: ${Math.floor(
                    ((typingText.reduce(
                      (total, word) => total + (word?.length || 0),
                      0
                    ) -
                      Object.values<number>(sessionMistakes).reduce<number>(
                        (acc: number, curr: number) => acc + curr,
                        0
                      )) /
                      typingText.reduce(
                        (total, word) => total + (word?.length || 0),
                        0
                      )) *
                      100
                  )}%`}</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex flex-wrap items-center gap-2">
                    {Object.entries(sessionMistakes)
                      .slice(0, 7)
                      .map(([mistake, count]) => (
                        <span
                          key={mistake}
                          className="rounded  border-black bg-red-200 px-2.5 py-0.5 text-sm font-medium text-red-800 outline-black dark:bg-red-300 dark:text-red-900"
                        >
                          {`${mistake} : ${count}`}
                        </span>
                      ))}
                  </div>
                </div>
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
            placeholder={
              !hasStartedTyping
                ? getPlaceholderMessage(isFinished ? displayedWPM : 0)
                : ''
            }
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
