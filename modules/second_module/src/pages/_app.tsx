import '../styles/global.scss'
import type { AppProps } from 'next/app'
import { Search } from '../components/search';
import { MdFmdGood, MdShoppingCart } from 'react-icons/md';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="main_wrapper">
      <main className="main_container">
        <header className="header_container">
          <div className="header_content">
            <div>
              <MdFmdGood />
              <span>NY</span>
            </div>
            <h1>Brand</h1>
            <MdShoppingCart />
          </div>
          <nav className="categories">
            <span>Home</span>
            <span>Shop</span>
            <span>Categories</span>
            <span>Contact</span>
            <span>About</span>
          </nav>
        </header>
        <Component {...pageProps} />
      </main>
      <footer className="footer_container">
        <div className="footer_content">
          <h2>Brand</h2>
          <span>All rights reserved</span>
        </div>
      </footer>
    </div>
  );
}

export default MyApp
