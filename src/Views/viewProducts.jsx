import ProductList from '../components/productList';
import SearchBox from '../components/search';

function getProducts() {
  return (
    <div className="productCard">
      <SearchBox className="searchProduct" /> <br />
      <ProductList />
    </div>
  );
}

export default getProducts;
