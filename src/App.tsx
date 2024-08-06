import { useState } from 'react';
import ImageCard from './components/ImageCard/ImageCard';
import ImageGrid from './components/ImageGrid/ImageGrid';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import { useGetImages } from './hooks/useGetImages';
import Spinner from './components/Spinner/Spinner';
import styles from './App.module.css';

const App = () => {
  const [page, setPage] = useState(0);

  const { images, loading, error } = useGetImages(page);

  const lastImageElementRef = useInfiniteScroll(() => {
    setPage((prevPage) => prevPage + 1);
  });

  if (error) {
    return <div>Failed to retrieve images.</div>;
  }

  return (
    <>
      <ImageGrid>
        {images.map((image, index) => (
          <div ref={images.length === index + 1 ? lastImageElementRef : null} key={`${image.id}-${index}`}>
            <ImageCard image={image} />
          </div>
        ))}
      </ImageGrid>
      {loading && <Spinner className={images.length ? styles.scrollSpinner : ''} />}
    </>
  );
};

export default App;
