import { useEffect, useState, useRef } from 'react';

const useStickyHeader = () => {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => setIsSticky(window.pageYOffset !== 0);

  return { isSticky, headerRef };
};

export default useStickyHeader;
