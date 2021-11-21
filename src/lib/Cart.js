import {find, remove} from 'lodash';
import Money from 'dinero.js';

Money.defaultCurrency ='BRL';
Money.defaultPrecision = 2;

export default class Cart {
  items = [];

  add(item) {
    const itemToFind = {product: item.product}

    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }


    this.items.push(item);
  }

  remove(product) {
    remove(this.items, {product})
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      return acc.add(Money({amount: item.quantity * item.product.price}));
    }, Money({amount: 0}));
  }

  summary() {
    const total = this.getTotal().getAmount();
    const items = this.items;

    return {
      total,
      items,
    }
  };


  checkout() {
    const {items, total} = this.summary();
    this.items = [];

    return {
      total,
      items
    }
  }
}
