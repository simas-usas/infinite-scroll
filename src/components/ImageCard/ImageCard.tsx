import { Photo } from '../../api/models';
import styles from './ImageCard.module.css';
import { getFavouriteStatus, addFavourite, removeFavourite } from '../../db/indexedDb';
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
    <div className={styles.card}>
      <img src={image.src.landscape} loading="lazy" alt={image.alt} />
      <div className={styles.cardPanel}>
        <div className={styles.details}>
          <span className={styles.title} title={image.alt}>
            {image.alt}
          </span>
          {image.alt && <div className={styles.divider} />}
          <span className={styles.photographer}>{image.photographer}</span>
        </div>
        <button className={`${styles.favouriteButton} ${isFavourite ? styles.favourited : ''}`} onClick={handleClick}>
          {isFavourite ? 'Unfavourite' : 'Favourite'}
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
