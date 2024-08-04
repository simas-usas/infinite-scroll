import { useState, useEffect } from 'react';
import { Photo } from '../api/models';
import { fetchImages } from '../api/images';

export const useGetImages = (page: number) => {
  const [images, setImages] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

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

    getImages();
  }, [page]);

  return { images, loading, error };
};
