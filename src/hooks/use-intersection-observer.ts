import { useEffect } from 'react';

function useObserver<T extends Element>(
  ref: React.RefObject<T | null>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) {
  useEffect(() => {
    const el = ref.current;

    if (!el) return; // handles null safely

    const observer = new IntersectionObserver(callback, options);

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref, callback, options]);
}

export { useObserver };
