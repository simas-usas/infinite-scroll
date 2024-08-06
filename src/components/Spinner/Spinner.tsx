import { Spinner as SpinnerIcon } from '../../assets';
import style from './Spinner.module.css';

interface Props {
  className?: string;
}

const Spinner = ({ className }: Props) => (
  <div>
    <SpinnerIcon className={`${style.spinner} ${className}`} />
  </div>
);

export default Spinner;
