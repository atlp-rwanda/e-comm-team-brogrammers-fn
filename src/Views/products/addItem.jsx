import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Input from '../../components/input';
import SearchTop from '../../components/searchTop';
import TextArea from '../../components/textarea';
import Select from '../../components/select';
import addItemSchema from '../../validations/additem';
import categoriesThunk from '../../redux/features/actions/categories';
import addItemThunk from '../../redux/features/actions/additem';
import ImageItem from '../../components/imageitem';
import ImageInput from '../../components/imageinput';

function AddItem() {
  const navigate = useNavigate();
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(categoriesThunk());
  }, []);

  const {
    user: { user, loading },
    categories: { categories },
    addedItem: { item, loading: itemLoading, error },
  } = useSelector((state) => state);

  const Popup = Swal.mixin({
    customClass: {
      confirmButton: 'btn1 btn-success swal-button',
      cancelButton: 'btn1 btn-danger swal-button',
    },
    buttonsStyling: false,
  });

  useEffect(() => {
    if (!loading && (!user || user.role.toLowerCase() === 'buyer'))
      navigate('/');
  }, [user, loading]);

  const [files, setFiles] = useState([]);
  const [filesError, setFilesError] = useState(undefined);

  useEffect(() => {
    if (
      !itemLoading &&
      !error.check &&
      error.status === 201 &&
      item &&
      files.length !== 0
    ) {
      Popup.fire({
        title: `${
          item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()
        }, was added`,
        text: 'Product was added successfully, you can click view product to take a look.',
        icon: 'warning',
        iconHtml: `<img src="${item.images[0]}" />`,
        confirmButtonText: 'view product',
      }).then(() => navigate('/'));
    }
  }, [item, itemLoading, error]);

  const uploaded = useCallback(async (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    await setFiles((prev) =>
      [...chosenFiles, ...prev].filter(
        (element, index, array) =>
          array.findIndex(
            (el) => element.name === el.name && element.size === el.size
          ) === index
      )
    );
  }, []);
  const removeImage = useCallback((image) => {
    setFiles((prev) => prev.filter((img) => img !== image));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addItemSchema),
  });

  const submit = (data) => {
    if (files.length < 2) {
      setFilesError('Please add atleast 2 images');
      return;
    }
    setFilesError(undefined);
    dispacth(addItemThunk({ data, images: files }));
    reset();
  };
  return (
    <>
      <SearchTop />
      <section>
        <div className="add-item">
          <form
            method="POST"
            onSubmit={handleSubmit(submit)}
            data-testid="itemform"
          >
            <div className="images">
              <h2>New Product</h2>
              <ImageInput onChange={uploaded} />
              {filesError && (
                <p className="error" data-testid="filesErrors">
                  {filesError}
                </p>
              )}
              {files && Array.isArray(files) && files.length > 0 && (
                <ul data-testid="file-list">
                  {files.map((one) => (
                    <li key={one.lastModified}>
                      <ImageItem file={one} remove={removeImage} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="text">
              {error?.message && <p className="error">{error.message}</p>}
              <Input
                type="text"
                placeholder="Title"
                register={{ ...register('name') }}
                errors={errors?.name?.message}
              />
              <TextArea
                placeholder="Description"
                max={2000}
                register={{ ...register('description') }}
                errors={errors?.description?.message}
              />
              <Select
                placeholder="Category"
                options={categories.map((one) => ({
                  value: one.id,
                  text: one.title,
                }))}
                register={{ ...register('category') }}
                errors={errors?.category?.message}
              />
              <Input
                type="number"
                placeholder="Quantity in store"
                register={{ ...register('price') }}
                errors={errors?.price?.message}
              />
              <Input
                type="number"
                placeholder="Price in USD"
                register={{ ...register('quantity') }}
                errors={errors?.quantity?.message}
              />
              <Input
                type="date"
                placeholder="Expired date"
                register={{ ...register('expdate') }}
                errors={errors?.expdate?.message}
              />
              <button type="submit" className="btn1" disabled={itemLoading}>
                {!itemLoading ? (
                  'Add product'
                ) : (
                  <div className="lds-ellipsis">
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddItem;
