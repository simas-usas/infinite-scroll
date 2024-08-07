import { Photo } from '#api/models';
import styles from './ImageCard.module.css';
import { getFavouriteStatus, addFavourite, removeFavourite } from '#db/indexedDb';
import { useEffect, useState } from 'react';

interface Props {
  image: Photo;
}

const ImageCard = ({ image }: Props) => {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const checkFavouriteStatus = async () => {
      const favouriteStatus = await getFavouriteStatus(image.id);
      setIsFavourite(favouriteStatus);
    };
    checkFavouriteStatus();
  }, []);

  const handleClick = async () => {
    if (isFavourite) {
      await removeFavourite(image.id);
    } else {
      await addFavourite(image.id);
    }
    const favouriteStatus = await getFavouriteStatus(image.id);
    setIsFavourite(favouriteStatus);
  };

  return (
    <article className={styles.card}>
      <img
        src={image.src.landscape}
        srcSet={`
          ${image.src.tiny} 280w, 
          ${image.src.medium} 350w, 
          ${image.src.large} 940w, 
          ${image.src.landscape} 1200w
        `}
        sizes="(max-width: 340px) 280px, (max-width: 410px) 350px, (max-width: 1000px) 940px, 1200px"
        loading="lazy"
        alt={image.alt}
      />
      <div className={styles.cardPanel}>
        <div className={styles.details}>
          <span className={styles.title} title={image.alt}>
            {image.alt}
          </span>
          {image.alt && <div className={styles.divider} />}
          <span className={styles.photographer}>{image.photographer}</span>
        </div>
        <button
          aria-pressed={isFavourite}
          aria-label="favourite button"
          className={`${styles.favouriteButton} ${isFavourite ? styles.favourited : ''}`}
          onClick={handleClick}
        >
          {isFavourite ? 'Unfavourite' : 'Favourite'}
        </button>
      </div>
    </article>
  );
};

export default ImageCard;
