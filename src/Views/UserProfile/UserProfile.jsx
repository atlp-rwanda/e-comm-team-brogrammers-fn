/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import './UserProfile.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import updateprofileThunk from '../../redux/features/actions/UpdateProfile';
import UserThunk from '../../redux/features/actions/user';
// eslint-disable-next-line import/named
const profileSchema = yup.object().shape({
  username: yup.string().trim().required().min(1),
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be valid'),
  gender: yup
    .string()
    .oneOf(['Male', 'Female', 'Both', 'None'], 'Please select valid gender'),
  avatar: yup.mixed().optional(),
  coverImage: yup.mixed().optional(),
});

function UserProfile() {
  const { loading, user } = useSelector((state) => state.user);
  const { error, loading: updateLoading } = useSelector(
    (state) => state.updateProfile
  );
  const [doneLoading, setDoneLoading] = useState(true);
  const dispatch = useDispatch();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      username: user?.username ?? '',
      email: user?.email ?? '',
      gender: user?.gender ?? '',
      /** @type {FileList | undefined} */ avatar: undefined,
      /** @type {FileList | undefined} */ coverImage: undefined,
    },
    resolver: yupResolver(profileSchema),
  });

  const avatar = watch('avatar');
  const coverImage = watch('coverImage');

  const handleUpdateProfile = (data) => {
    dispatch(
      updateprofileThunk({
        action: '',
        data: {
          username: data.username,
          email: data.email,
          gender: data.gender,
        },
      })
    );
    if (data.avatar?.length > 0) {
      const formData = new FormData();
      formData.set('image', data.avatar[0]);

      dispatch(
        updateprofileThunk({
          action: '/avatar',
          data: formData,
        })
      );
    }
    if (data.coverImage?.length > 0) {
      const formData = new FormData();
      formData.set('image', data.coverImage[0]);
      dispatch(
        updateprofileThunk({
          action: '/cover-image',
          data: formData,
        })
      );
    }
    // let newData = data.avatar ? {image: }
  };

  useEffect(() => {
    if (updateLoading !== 0 && doneLoading) setDoneLoading(false);
    if (updateLoading === 0 && !doneLoading) {
      dispatch(UserThunk());
      toast.success('Profile updated!');
      setDoneLoading(true);
    }
  }, [doneLoading, updateLoading]);

  useEffect(() => {
    if (error) {
      toast.error(`Something went wrong: ${error}`);
    }
  }, [error]);

  return (
    <div>
      <div className="edit-profile-page">
        {user && (
          <ProfileComponent
            avatar={user.avatar}
            coverImage={user.cover_image}
            username={user.username}
          />
        )}
        {(loading || updateLoading || '') && <span className="loader-2" />}
        <h2>Edit Profile</h2>
        {/* Profile form */}
        <div className="profile-form">
          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" {...register('username')} />
            {errors.username && (
              <p className="error" data-testid="errors">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" {...register('email')} />
            {errors.email && (
              <p className="error" data-testid="errors">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" {...register('gender')}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Both">Both</option>
              <option value="None">None</option>
            </select>
            {errors.gender && (
              <p className="error" data-testid="errors">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Submit button */}
        </div>

        {/* Image upload */}
        <div className="image-upload">
          <h2>Update Profile Image</h2>
          <label htmlFor="image-upload-avatar" className="upload-label">
            {user && (
              <img
                src={user.avatar}
                className="profile-small-img"
                alt="Profile"
              />
            )}
            <FaUpload className="upload-icon" />
            {!avatar?.length ? ' Choose new avatar' : avatar[0].name}
          </label>
          {errors.avatar && (
            <p className="error" data-testid="errors">
              {errors.avatar.message}
            </p>
          )}
          <input
            type="file"
            id="image-upload-avatar"
            accept="image/*"
            {...register('avatar')}
          />

          <label htmlFor="image-upload" className="upload-label">
            {user && (
              <img
                src={user.cover_image}
                className="profile-small-img"
                alt="Profile"
              />
            )}
            <FaUpload className="upload-icon" />
            {!coverImage?.length
              ? ' Choose new cover image'
              : coverImage[0].name}
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            {...register('coverImage')}
          />
          {errors.coverImage && (
            <p className="error" data-testid="errors">
              {errors.coverImage.message}
            </p>
          )}
        </div>

        {/* Links */}
        {/* <div className="links">
          <h2>Links</h2>

          <a href="/settings">Settings</a>
          <a href="/change-password">Change Password</a>
        </div> */}
        {updateLoading !== 0 && <span className="loader-2" />}

        <button
          type="button"
          disabled={updateLoading !== 0 || loading}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(handleUpdateProfile)(e);
          }}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export function ProfileComponent({ username, avatar, coverImage }) {
  return (
    <div className="profile-component">
      <div className="profile">
        <div
          className="cover-image"
          style={{ backgroundImage: `url(${coverImage})` }}
        />
        <div className="avatar">
          <img src={avatar} alt="Avatar" />
        </div>
        <h2 className="username">{username}</h2>
      </div>
    </div>
  );
}

export default UserProfile;
