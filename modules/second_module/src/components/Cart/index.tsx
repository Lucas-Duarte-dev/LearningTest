import { MdArrowRight, MdClose } from 'react-icons/md';
import { ReactNode } from 'react';
import styles from "./styles.module.scss";
import { CartItem } from '../CartItem';

interface CartProps {
  children: ReactNode
}

export function Cart() {
  return (
    <div className={styles.cart_wrapper}>
      <header className={styles.cart_header}>
        <h3>Your cart</h3>
        <button>
          <MdClose />
        </button>
      </header>
      <CartItem />
      <div className={styles.add_promocode}>
        <input type="text" placeholder="Add promocode"/>
        <button type="button">Apply</button>
      </div>
      <button type="button" className={styles.button_checkout}>
        Checkout
        <MdArrowRight />
      </button>
    </div>
  );
}