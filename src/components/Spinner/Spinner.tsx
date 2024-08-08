import { Spinner as SpinnerIcon } from '#assets';
import style from './Spinner.module.css';

interface Props {
  className?: string;
}

const Spinner = ({ className }: Props) => (
  <SpinnerIcon className={`${style.spinner} ${className}`} data-testid="spinner" />
);

export default Spinner;
