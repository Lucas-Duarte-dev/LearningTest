import type { NextPage } from 'next'
import Head from 'next/head'
import { Search } from '../components/search';

const Home: NextPage = () => {
  return (
    <div>
      <Search />
      <div>
        <header>
          <h2>Wrist Watch</h2>
          <span>200+ Products</span>
        </header>

      </div>
    </div>
  )
}

export default Home
