import { expect, test } from '@jest/globals';
import { Rwf, USDollar } from '../../src/helpers/currency';

const number = 1000;

const rwf = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'Rwf',
});
test('test number to RWF', () => {
  const out = Rwf.format(number);
  expect(out).toBe(rwf.format(number));
});

test('test number to USD', () => {
  const out = USDollar.format(number);
  expect(out).toEqual('$1,000.00');
});
