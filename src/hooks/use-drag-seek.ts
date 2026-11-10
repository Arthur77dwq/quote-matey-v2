import { useCallback, useEffect, useRef, useState } from 'react';

type SeekHandler = (clientX: number) => void;

export function useDragSeek() {
  const [isDragging, setIsDragging] = useState(false);
  const seekRef = useRef<SeekHandler | null>(null);
  const seekToRef = useRef<SeekHandler | null>(null);

  const stop = useCallback(() => {
    seekRef.current = null;
    seekToRef.current = null;
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      seekToRef.current?.(e.clientX);
    };
    const onMouseUp = () => {
      if (!isDragging) return;
      stop();
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, stop]);

  const startDrag = useCallback((clientX: number, seekTo: SeekHandler) => {
    seekRef.current = seekTo;
    seekToRef.current = seekTo;
    seekTo(clientX);
    setIsDragging(true);
  }, []);

  return { isDragging, startDrag };
}
