import { useState } from 'react';
import ImageCard from './components/ImageCard/ImageCard';
import ImageGrid from './components/ImageGrid/ImageGrid';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import { useGetImages } from './hooks/useGetImages';

const App = () => {
  const [page, setPage] = useState(0);

  const { images, loading, error } = useGetImages(page);

  const lastImageElementRef = useInfiniteScroll(() => {
    setPage((prevPage) => prevPage + 1);
  });

  return (
    <>
      {error && <div>Failed to load images.</div>}
      {loading && <div>Loading...</div>}
      <ImageGrid>
        {images.map((image, index) => (
          <div ref={images.length === index + 1 ? lastImageElementRef : null} key={`${image.id}-${index}`}>
            <ImageCard image={image} />
          </div>
        ))}
      </ImageGrid>
    </>
  );
};

export default App;
