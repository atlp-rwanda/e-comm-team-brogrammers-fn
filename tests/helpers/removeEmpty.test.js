import { expect, test } from '@jest/globals';
import removeEmpty from '../../src/helpers/removeEmpty';

test('removing empty value in object', () => {
  const out = removeEmpty({ a: 'a', b: undefined });
  expect(out).toHaveProperty('a', 'a');
  expect(out).not.toHaveProperty('b');
});
