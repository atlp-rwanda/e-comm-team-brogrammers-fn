import { test, describe, expect } from '@jest/globals';
import { store } from '../../src/redux/store';
import { toggle, set } from '../../src/redux/features/slices/sample';

describe('test login states', () => {
  test('should return error for wrong credentials', async () => {
    let boolean;
    store.dispatch(set(false));
    boolean = store.getState().boolean;
    expect(boolean.value).toBe(false);

    store.dispatch(set(true));
    boolean = store.getState().boolean;
    expect(boolean.value).toBe(true);

    store.dispatch(toggle());
    boolean = store.getState().boolean;
    expect(boolean.value).toBe(false);
  });
});
