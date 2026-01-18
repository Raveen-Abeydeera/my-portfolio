import { useState, useEffect } from 'react';

export default function Typewriter({ words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000 }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor logic
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Typing logic
  useEffect(() => {
    if (index === words.length) return;

    if ( subIndex === words[index].length + 1 && !reverse ) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? deletingSpeed : subIndex === words[index].length ? pauseTime : typingSpeed, parseInt(Math.random() * 50)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="font-bold text-accent-primary">
        {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
    </span>
  );
}