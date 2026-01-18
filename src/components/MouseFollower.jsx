import { useEffect, useRef } from 'react';

export default function MouseFollower() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // Disable on touch

    const cursor = cursorRef.current;
    const dot = dotRef.current;

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      if (cursor && dot) {
        cursor.style.transform = `translate(${clientX - 15}px, ${clientY - 15}px)`;
        dot.style.transform = `translate(${clientX - 3}px, ${clientY - 3}px)`;
      }
    };

    const handleHover = () => {
        if(cursor) {
            cursor.style.transform += ` scale(1.5)`;
            cursor.style.opacity = '0.8';
        }
    };

    const handleLeave = () => {
        if(cursor) {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            cursor.style.opacity = '0.5';
        }
    };

    window.addEventListener('mousemove', moveCursor);
    
    // Add hover effect to clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', handleHover);
        el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
    });
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        className="fixed w-1.5 h-1.5 bg-accent-yellow rounded-full pointer-events-none z-[100] hidden md:block transition-transform duration-75"
      ></div>
      <div 
        ref={cursorRef} 
        className="fixed w-8 h-8 border border-accent-yellow rounded-full pointer-events-none z-[99] hidden md:block opacity-50 mix-blend-difference transition-transform duration-100 ease-out"
      ></div>
    </>
  );
}