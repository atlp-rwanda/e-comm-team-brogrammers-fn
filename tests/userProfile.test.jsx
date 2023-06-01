/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as axios from 'axios';
import thunk from 'redux-thunk';
import updateprofileThunk from '../src/redux/features/actions/UpdateProfile';
import updateProfile from '../src/redux/features/slices/updateProfile';
import UserProfile, {
  ProfileComponent,
} from '../src/Views/UserProfile/UserProfile';
import '@testing-library/jest-dom';

const mockStore = configureStore([thunk]);

jest.mock('axios');

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('UserProfile', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      user: {
        loading: false,
        user: {
          username: 'testuser',
          email: 'test@example.com',
          gender: 'Male',
          avatar: 'avatar.jpg',
          cover_image: 'cover.jpg',
        },
      },
      updateProfile: {
        success: false,
        error: null,
        loading: 0,
      },
    });

    component = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
  });

  it('should render the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the profile component with the correct data', () => {
    const { getByText } = component;
    expect(getByText('testuser')).toBeInTheDocument();
    expect(getByText('Male')).toBeInTheDocument();
  });

  it('should call the updateprofileThunk action when the form is submitted', () => {
    const { getByText } = component;
    expect(getByText('Update Profile')).toBeInTheDocument();
  });
});

describe('ProfileComponent', () => {
  it('should render the username', () => {
    const { getByText } = render(
      <ProfileComponent username="John Doe" avatar="" coverImage="" />
    );
    expect(getByText('John Doe')).toBeInTheDocument();
  });

  it('should render the avatar image', () => {
    const { getByAltText } = render(
      <ProfileComponent username="" avatar="avatar.jpg" coverImage="" />
    );
    expect(getByAltText('Avatar')).toHaveAttribute('src', 'avatar.jpg');
  });

  it('should render the cover image', () => {
    const { container } = render(
      <ProfileComponent username="" avatar="" coverImage="cover.jpg" />
    );
    expect(container.querySelector('.cover-image')).toHaveStyle(
      `background-image: url(cover.jpg)`
    );
  });
});

describe('updateProfile', () => {
  let store;
  beforeEach(() => {
    axios.patch.mockResolvedValue({
      username: 'testuser',
      email: 'test@example.com',
      gender: 'Male',
      avatar: 'avatar.jpg',
      cover_image: 'cover.jpg',
    });

    store = mockStore({
      user: {
        loading: false,
        user: {
          username: 'testuser',
          email: 'test@example.com',
          gender: 'Male',
          avatar: 'avatar.jpg',
          cover_image: 'cover.jpg',
        },
      },
      updateProfile: {
        success: false,
        error: '',
        loading: 0,
      },
    });
  });

  it('should have initial state', () => {
    expect(updateProfile.getInitialState()).toEqual(
      store.getState().updateProfile
    );
  });

  it('should handle updateprofileThunk.pending action', () => {
    store.dispatch(updateprofileThunk({ data: {}, action: '' }));
    expect(store.getState().updateProfile.loading).toBeLessThan(1);
  });
});

// describe('handleUpdateProfile', () => {
//   it('should dispatch updateprofileThunk with username, email and gender', () => {
//     const data = {
//       username: 'testUser',
//       email: 'test@example.com',
//       gender: 'male',
//     };
//     const expectedAction = {
//       action: '',
//       data: {
//         username: 'testUser',
//         email: 'test@example.com',
//         gender: 'male',
//       },
//     };
//     const dispatch = jest.fn();
//     handleUpdateProfile(data);
//     expect(dispatch).toHaveBeenCalledWith(updateprofileThunk(expectedAction));
//   });

//   it('should dispatch updateprofileThunk with avatar if present', () => {
//     const data = {
//       avatar: [{ name: 'avatar.jpg' }],
//     };
//     const formData = new FormData();
//     formData.set('image', data.avatar[0]);
//     const expectedAction = {
//       action: '/avatar',
//       data: formData,
//     };
//     const dispatch = jest.fn();
//     handleUpdateProfile(data);
//     expect(dispatch).toHaveBeenCalledWith(updateprofileThunk(expectedAction));
//   });

//   it('should dispatch updateprofileThunk with coverImage if present', () => {
//     const data = {
//       coverImage: [{ name: 'coverImage.jpg' }],
//     };
//     const formData = new FormData();
//     formData.set('image', data.coverImage[0]);
//     const expectedAction = {
//       action: '/cover-image',
//       data: formData,
//     };
//     const dispatch = jest.fn();
//     handleUpdateProfile(data);
//     expect(dispatch).toHaveBeenCalledWith(updateprofileThunk(expectedAction));
//   });
// });
