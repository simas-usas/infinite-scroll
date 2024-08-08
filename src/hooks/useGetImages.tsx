import { useState, useEffect, useRef } from 'react';
import { Photo } from '#api/models';
import { fetchImages } from '#api/images';

const useGetImages = (page: number) => {
  const [images, setImages] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const initialMountRef = useRef(true);

  useEffect(() => {
    const getImages = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchImages(page);
        setImages((prev) => [...prev, ...(data.photos as Photo[])]);
      } catch (error) {
        console.error('Failed to fetch images:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (initialMountRef.current) {
      initialMountRef.current = false;
    } else {
      getImages();
    }
  }, [page]);

  return { images, loading, error };
};

export default useGetImages;
