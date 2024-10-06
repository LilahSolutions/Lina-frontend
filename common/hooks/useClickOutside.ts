import React, { useEffect } from 'react';

/**
 * Receives a ref and a handler to be called when clicking outside the ref element.
 * @param {React.RefObject<HTMLElement>} ref - reference to the element.
 * @param {Function} handler - function to be called when clicking outside the element.
 *
 * Note: improved version of https://usehooks.com/useOnClickOutside/
 */
const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (_event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if `mousedown` or `touchstart` started inside ref element
      if (startedInside || !startedWhenMounted) return;

      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) return;

      handler(event);
    };

    const validateEventStart = (event: MouseEvent | TouchEvent) => {
      startedWhenMounted = !!ref.current;
      startedInside =
        !!ref.current && ref.current.contains(event.target as Node);
    };

    document.addEventListener('mousedown', validateEventStart);
    document.addEventListener('touchstart', validateEventStart);
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('mousedown', validateEventStart);
      document.removeEventListener('touchstart', validateEventStart);
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);

  return null;
};

export default useClickOutside;
