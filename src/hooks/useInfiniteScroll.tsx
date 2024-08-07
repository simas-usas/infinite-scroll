import { useCallback, useRef } from 'react';

const useInfiniteScroll = (callback: () => void, isFetching: boolean) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          callback();
        }
      });

      if (node) observer.current.observe(node);
    },
    [callback],
  );

  return lastElementRef;
};

export default useInfiniteScroll;
