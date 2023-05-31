/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { toast } from 'react-toastify';

import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateSellerCollection } from '../redux/features/actions/updateSellerCollection';
import oneProductThunk from '../redux/features/actions/oneProduct';
//

function UpdateProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { data: product } = useSelector((state) => state.oneproduct);
  const { loading } = useSelector((state) => state.updateSellerStatus);

  useEffect(() => {
    dispatch(oneProductThunk(id));
  }, []);

  const [formData, setFormData] = useState({
    images: [], // Set initial value as an empty array
    name: '',
    description: '',
    quantity: 0,
    expdate: '',
    price: 0,
    category: 1,
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);
  // const [previewImage,setPreviewImage,files, setFiles] = useState([]);
  // const [filesError, setFilesError] = useState(undefined);
  const [previewImage, setPreviewImage] = useState([]);
  // const [uploaded, setUploaded] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  // /////
  const handleImageUpload = (event) => {
    const { name, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files,
    }));

    // const file = event.target.files;
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     setPreviewImage(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     images: [file], // Wrap the file in an array
    //   }));
    // }
  };

  // ///

  const showToast = (message) => {
    toast.info(message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);

    dispatch(updateSellerCollection(id, formData));

    showToast('Product updating');
    setTimeout(() => {
      toast.dismiss();
      toast.success('Product Updated successfully');
      navigate('/collection/manageProducts');
    }, 2000);
  };

  return (
    <form className="sellerupdateItem" onSubmit={handleSubmit}>
      <div className="image-preview">
        {product && product.images && (
          <img src={product.images[1]} alt="Previous" />
        )}
        <label className="updatedimage"> About to update to: </label>
        {previewImage && <img src={previewImage} alt="" />}
      </div>

      <div className="form-fields">
        <label className="sellerupdatelabel">
          Images:
          <input
            type="file"
            name="images"
            onChange={handleImageUpload}
            multiple
          />
        </label>

        <label className="sellerupdatelabel">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label className="sellerupdatelabel">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label className="sellerupdatelabel">
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
        </label>
        <label className="sellerupdatelabel">
          Expiry Date:
          <input
            type="date"
            name="expdate"
            value={formData.expdate}
            onChange={handleInputChange}
          />
        </label>

        <label className="sellerupdatelabel">
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <label className="sellerupdatelabel">
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value={1}>Consumer products</option>
            <option value={2}>Industrial products</option>
            <option value={3}>Service products</option>
          </select>
        </label>
        <div className="form-footer">
          {' '}
          <button
            onClick={handleSubmit}
            className="updatebuttonproduct"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Updating' : 'Update'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default UpdateProductForm;
