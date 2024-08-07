import { useState } from 'react';
import { ImageCard, ImageGrid, Spinner } from '#components';
import { useGetImages, useInfiniteScroll } from '#hooks';
import styles from './App.module.css';

const App = () => {
  const [page, setPage] = useState(0);

  const { images, loading, error } = useGetImages(page);

  const lastImageElementRef = useInfiniteScroll(() => {
    setPage((prevPage) => prevPage + 1);
  }, loading);

  if (error) {
    return <div>Failed to retrieve images.</div>;
  }

  return (
    <main>
      <ImageGrid>
        {images.map((image, index) => (
          <div ref={images.length === index + 1 ? lastImageElementRef : null} key={`${image.id}-${index}`}>
            <ImageCard image={image} />
          </div>
        ))}
      </ImageGrid>
      {loading && <Spinner className={images.length ? styles.scrollSpinner : ''} />}
    </main>
  );
};

export default App;
