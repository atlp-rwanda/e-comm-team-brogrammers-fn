/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// /* eslint-disable no-undef */
// import React from 'react';
// import { configureStore } from '@reduxjs/toolkit';

// import {expect,test,beforeEach, fireEvent, render, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// import UpdateProductForm from '../src/Views/updateProductForm';
// import { updateSellerCollection } from '../src/redux/features/actions/updateSellerCollection';

// jest.mock('../src/redux/features/actions/updateSellerCollection', () => ({
//   updateSellerCollection: jest.fn(),
// }));

// describe('UpdateProductForm', () => {
//   let store;

//   beforeEach(() => {
//     store = configureStore();
//   });

//   test('renders UpdateProductForm component', () => {
//     render(
//       <Provider store={store}>
//         <Router>
//           <UpdateProductForm />
//         </Router>
//       </Provider>
//     );

//     // Add your assertions here to check if the component renders correctly
//   });

//   test('handles form submission', () => {
//     const mockDispatch = jest.fn();
//     const mockNavigate = jest.fn();

//     jest.spyOn(React, 'useDispatch').mockReturnValue(mockDispatch);
//     jest.spyOn(React, 'useNavigate').mockReturnValue(mockNavigate);

//     render(
//       <Provider store={store}>
//         <Router>
//           <UpdateProductForm />
//         </Router>
//       </Provider>
//     );

//     // Fill in the form fields
//     fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Test Product' } });
//     fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'Test description' } });
//     // ... fill in the rest of the form fields

//     // Trigger form submission
//     fireEvent.click(screen.getByText('Update'));

//     // Verify that the updateSellerCollection action is dispatched
//     expect(updateSellerCollection).toHaveBeenCalledWith(
//       expect.anything(),
//       expect.objectContaining({
//         name: 'Test Product',
//         description: 'Test description',
//         // ... check the rest of the form field values
//       })
//     );

//     // Verify that the success toast message is shown and navigation occurs
//     expect(mockNavigate).toHaveBeenCalledWith('/collection/manageProducts');
//   });

//   // Add more test cases as needed
// });
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';

import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  useParams,
  useNavigate,
} from 'react-router-dom';
import UpdateProductForm from '../src/Views/updateProductForm';
import { updateSellerCollection } from '../src/redux/features/actions/updateSellerCollection';
import oneProductThunk from '../src/redux/features/actions/oneProduct';

jest.mock('../src/redux/features/actions/updateSellerCollection');
jest.mock('../src/redux/features/actions/oneProduct');

describe('UpdateProductForm', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();
  const mockUseParams = jest.fn();
  const mockUseNavigate = jest.fn();
  const mockProduct = {
    images: [],
    name: 'Product Name',
    description: 'Product Description',
    quantity: 10,
    expdate: '2023-06-01',
    price: 9.99,
    category: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    updateSellerCollection.mockReturnValue(() => Promise.resolve());
    oneProductThunk.mockReturnValue(() => Promise.resolve(mockProduct));

    useParams.mockReturnValue({ id: '123' });
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Provider store={configureStore()}>
        <Router>
          <UpdateProductForm />
        </Router>
      </Provider>
    );
  });

  test('renders the form with pre-filled data', async () => {
    expect(screen.getByLabelText('Name:')).toHaveValue(mockProduct.name);
    expect(screen.getByLabelText('Description:')).toHaveValue(
      mockProduct.description
    );
    expect(screen.getByLabelText('Quantity:')).toHaveValue(
      mockProduct.quantity.toString()
    );
    expect(screen.getByLabelText('Expiry Date:')).toHaveValue(
      mockProduct.expdate
    );
    expect(screen.getByLabelText('Price:')).toHaveValue(
      mockProduct.price.toString()
    );
    expect(screen.getByLabelText('Category:')).toHaveValue(
      mockProduct.category.toString()
    );
  });

  test('handles form submission', async () => {
    fireEvent.change(screen.getByLabelText('Name:'), {
      target: { value: 'New Product Name' },
    });
    fireEvent.change(screen.getByLabelText('Description:'), {
      target: { value: 'New Product Description' },
    });
    fireEvent.change(screen.getByLabelText('Quantity:'), {
      target: { value: '5' },
    });
    fireEvent.change(screen.getByLabelText('Expiry Date:'), {
      target: { value: '2023-06-02' },
    });
    fireEvent.change(screen.getByLabelText('Price:'), {
      target: { value: '19.99' },
    });
    fireEvent.change(screen.getByLabelText('Category:'), {
      target: { value: '2' },
    });

    fireEvent.click(screen.getByText('Update'));

    expect(updateSellerCollection).toHaveBeenCalledWith('123', {
      images: [],
      name: 'New Product Name',
      description: 'New Product Description',
      quantity: 5,
      expdate: '2023-06-02',
      price: 19.99,
      category: 2,
    });

    // Simulate the asynchronous updateSellerCollection action
    await Promise.resolve();

    expect(mockNavigate).toHaveBeenCalledWith('/collection/manageProducts');
  });
});
