/* eslint-disable no-undef */
/* eslint-disable import/named */
// redux/slice/product.test.js
import axios from 'axios';
import productSlice, {
  initialState,
} from '../../src/redux/features/slices/product';
import fetchProducts from '../../src/redux/features/actions/products';

jest.mock('axios');

describe('productSlice', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should handle fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type };
    const nextState = productSlice.reducer(state, action);

    expect(nextState.status).toEqual('loading');
  });

  it('should handle fetchProducts.fulfilled', () => {
    const products = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    const action = { type: fetchProducts.fulfilled.type, payload: products };
    const nextState = productSlice.reducer(state, action);

    expect(nextState.status).toEqual('succeeded');
    expect(nextState.products).toEqual(products);
  });

  it('should handle fetchProducts.rejected', () => {
    const error = 'Unable to fetch products';
    const action = { type: fetchProducts.rejected.type, payload: error };
    const nextState = productSlice.reducer(state, action);

    expect(nextState.status).toEqual('failed');
    expect(nextState.error).toEqual(error);
  });

  it('should dispatch fetchProducts and update state on successful API call', async () => {
    const products = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    axios.get.mockResolvedValueOnce({
      data: { allproducts: { results: products } },
    });

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ products: { status: 'idle' } }));

    await fetchProducts()(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(fetchProducts.pending());
    expect(dispatch).toHaveBeenCalledWith(fetchProducts.fulfilled(products));
  });

  it('should dispatch fetchProducts and update state on unsuccessful API call', async () => {
    const error = 'Unable to fetch products';
    axios.get.mockRejectedValueOnce(error);

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ products: { status: 'idle' } }));

    await fetchProducts()(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(fetchProducts.pending());
    expect(dispatch).toHaveBeenCalledWith(fetchProducts.rejected(error));
  });
});
