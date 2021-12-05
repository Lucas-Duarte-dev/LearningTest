import { MdShoppingCart } from 'react-icons/md';
import styles from './styles.module.scss';

export function ProductCard() {
  return (
    <div className={styles.product_card_wrapper}>
      <div className={styles.product_image}>
        <img src="https://cdn.pocket-lint.com/r/s/970x/assets/images/158839-laptops-review-apple-macbook-pro-14-inch-review-image2-ribxgzs9jt.jpg"
        alt="Product Image" />
        <div>
          <button>
            <MdShoppingCart />
          </button>
        </div>
      </div>
      <div className={styles.product_info}>
        <span>Mac Book Air Pro</span>
        <p>100$</p>
      </div>
    </div>
  );
}