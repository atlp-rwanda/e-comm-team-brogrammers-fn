import ProductList from '../components/productList';
import SearchTop from '../components/searchTop';

function ViewProducts() {
  return (
    <div className="productCard">
      <SearchTop />
      <ProductList />
    </div>
  );
}

export default ViewProducts;
