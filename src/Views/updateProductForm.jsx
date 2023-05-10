/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateSellerCollection } from '../redux/features/actions/updateSellerCollection';
import oneProductThunk from '../redux/features/actions/oneProduct';

function UpdateProductForm() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { data: product, status } = useSelector((state) => state.oneproduct);

  useEffect(() => {
    dispatch(oneProductThunk(id));
  }, []);

  const [formData, setFormData] = useState({
    images: [],
    name: '',
    description: '',
    quantity: 0,
    exp_date: '',
    available: true,
    price: 0,
    category: 1,
    createdAt: '',
    updatedAt: '',
    seller: {},
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: [file],
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateSellerCollection(id, formData));
    // Send the updated product data to the backend
  };

  return (
    <form className="sellerupdateItem" onSubmit={handleSubmit}>
      <div className="image-preview">
        {product && product.images && (
          <img src={product.images[0]} alt="Previous" />
        )}
        <label className="updatedimage"> About to update to: </label>
        {previewImage && <img src={previewImage} alt="Updated" />}
      </div>
      <div className="form-fields">
        <label className="sellerupdatelabel">
          Images:
          <input type="file" onChange={handleImageUpload} multiple />
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
          Expiration Date:
          <input
            type="date"
            name="exp_date"
            value={formData.exp_date}
            onChange={handleInputChange}
          />
        </label>
        <label className="sellerupdatelabel">
          Available:
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
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
      </div>
      <div className="form-footer">
        {' '}
        {/* Added new div for the button */}
        <button className="updatebuttonproduct" type="submit">
          Update
        </button>
      </div>
    </form>
  );
}
export default UpdateProductForm;
