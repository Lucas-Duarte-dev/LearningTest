import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <header>
        <h1>Logo</h1>
        <section>
          <input type="text" placeholder="O que está procurando?"/>
        </section>
        <nav>
        </nav>
      </header>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
