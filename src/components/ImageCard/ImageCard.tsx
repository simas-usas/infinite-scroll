import { Photo } from '../../api/models';
import styles from './ImageCard.module.css';

interface Props {
  image: Photo;
}

const ImageCard = ({ image }: Props) => {
  return (
    <div className={styles.card}>
      <img src={image.src.landscape} loading="lazy" alt={image.alt} />
    </div>
  );
};

export default ImageCard;
