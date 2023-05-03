import ProductList from '../components/productList';
import SearchTop from '../components/searchTop';

function getProducts() {
  return (
    <div className="productCard">
      <SearchTop />
      <ProductList />
    </div>
  );
}

export default getProducts;
