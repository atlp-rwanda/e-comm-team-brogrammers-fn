/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../redux/features/actions/updateSellerCollection';

function UpdateForm({ product }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    images: product.images,
    name: product.name,
    description: product.description,
    quantity: product.quantity,
    exp_date: product.exp_date,
    available: product.available,
    price: product.price,
    category: product.category,
    // Add more fields as necessary
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ productId: product.id, formData }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      {}

      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateForm;

/* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateProduct } from '../redux/features/actions/updateSellerCollection';

// function UpdateProductForm({ productId }) {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     images: [],
//     name: '',
//     description: '',
//     quantity: 0,
//     exp_date: '',
//     available: true,
//     price: 0,
//     category: 1,
//     createdAt: '',
//     updatedAt: '',
//     seller: {},
//   });

//   const loading = useSelector((state) => state.updateSellerStatus.loading);
//   const error = useSelector((state) => state.updateSellerStatus.error);

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateProduct({ productId, data: formData }));
//   };

//   return (
//     <div>
//       {loading && <div>Loading...</div>}
//       {error && <div>{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//         />

//         <label htmlFor="description">Description</label>
//         <textarea
//           id="description"
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//         />

//         <label htmlFor="quantity">Quantity</label>
//         <input
//           type="number"
//           id="quantity"
//           name="quantity"
//           value={formData.quantity}
//           onChange={handleInputChange}
//         />

//         <label htmlFor="exp_date">Expiration Date</label>
//         <input
//           type="date"
//           id="exp_date"
//           name="exp_date"
//           value={formData.exp_date}
//           onChange={handleInputChange}
//         />

//         <label htmlFor="available">Available</label>
//         <input
//           type="checkbox"
//           id="available"
//           name="available"
//           checked={formData.available}
//           onChange={handleInputChange}
//         />

//         <label htmlFor="price">Price</label>
//         <input
//           type="number"
//           id="price"
//           name="price"
//           value={formData.price}
//           onChange={handleInputChange}
//         />

//         <label htmlFor="category">Category</label>
//         <select
//           id="category"
//           name="category"
//           value={formData.category}
//           onChange={handleInputChange}
//         >
//           <option value="1">Category 1</option>
//           <option value="2">Category 2</option>
//           {/* Add more options as needed */}
//         </select>

//         {/* Add other fields and form elements as needed */}

//         <button type="submit">Update Product</button>
//       </form>
//     </div>
//   );
// }

// export default UpdateProductForm;
// UpdateForm.js
