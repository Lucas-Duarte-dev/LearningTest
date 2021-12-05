import type { NextPage } from 'next'
import { Search } from '../components/Search';
import { ProductCard } from '../components/ProductCard';
import styles from '../styles/pages/home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.home_wrapper}>
      <Search />
      <div>
        <header className={styles.header_content}>
          <h2>Wrist Watch</h2>
          <span>200+ Products</span>
        </header>
        <ProductCard />

      </div>
    </div>
  )
}

export default Home
