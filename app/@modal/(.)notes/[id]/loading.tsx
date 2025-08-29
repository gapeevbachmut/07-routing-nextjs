// import { CircleLoader } from 'react-spinners';
import css from './NotePreview.module.css';

export default function Loading() {
  // return <CircleLoader />;
  return <p className={css.loading}>Loading, previewing, please wait...</p>;
}

//   await new Promise(r => setTimeout(r, 2000));
