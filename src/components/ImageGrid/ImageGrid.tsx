import styles from './ImageGrid.module.css';

interface Props {
  children: React.ReactNode;
}

const ImageGrid = ({ children }: Props) => {
  return <div className={styles.grid}>{children}</div>;
};

export default ImageGrid;
