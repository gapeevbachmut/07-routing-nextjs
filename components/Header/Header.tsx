import Link from 'next/link';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
// import { getAllTags } from '@/lib/api';

const Header = async () => {
  // const tags = await getAllTags();

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <TagsMenu
              // tags={tags}
              tags={['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']}
            />

            {/* <Link href="/notes">Notes</Link> */}
          </li>
          {/* <li>
              <button onClick={handleClick}>Open menu</button>
            </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
