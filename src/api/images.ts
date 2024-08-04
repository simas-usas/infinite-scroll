import { CuratedResponse } from './models';

export const fetchImages = async (page: number): Promise<CuratedResponse> => {
  const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

  const res = await fetch(`https://api.pexels.com/v1/curated?page=${page + 1}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: API_KEY,
    },
  });

  return res.json();
};
