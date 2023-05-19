import {
  jest,
  describe,
  beforeEach,
  it,
  afterEach,
  expect,
} from '@jest/globals';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from '../../src/redux/configs/axios';
import AddCartThunk from '../../src/redux/features/actions/addCart';

const mockStore = configureMockStore([thunk]);
jest.mock('../../src/redux/configs/axios');

describe('AddCartThunk', () => {
  let store;
  const id = 1;
  const quantities = 2;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches the correct actions on successful request', async () => {
    const response = { data: { success: true } };
    axios.post.mockResolvedValueOnce(response);

    await store.dispatch(AddCartThunk({ id, quantities }));

    const actions = store.getActions();
    expect(actions[0].type).toEqual('cart/add/pending');
    expect(actions[1].type).toEqual('cart/add/fulfilled');
    expect(actions[1].payload).toEqual(response.data);
  });

  it('dispatches the correct actions on failed request', async () => {
    const errorMessage = 'Rejected';
    const errorResponse = {
      response: {
        data: {
          error: {
            message: errorMessage,
          },
        },
      },
    };
    axios.post.mockRejectedValueOnce(errorResponse);

    await store.dispatch(AddCartThunk({ id, quantities }));

    const actions = store.getActions();
    expect(actions[0].type).toEqual('cart/add/pending');
    expect(actions[1].type).toEqual('cart/add/rejected');
    expect(actions[1].error.message).toEqual(errorMessage);
  });
});
