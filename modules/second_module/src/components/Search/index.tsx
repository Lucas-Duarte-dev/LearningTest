import { MdSearch } from 'react-icons/md';
import styles from './styles.module.scss';

export function Search() {
  return (
    <div className={styles.search_container}>
      <div className={styles.search_contain}>
        <label htmlFor="search">
          <MdSearch />
        </label>
        <input type="text" placeholder="Search" id="search" className={styles.search}/>
      </div>
    </div>
  )
}