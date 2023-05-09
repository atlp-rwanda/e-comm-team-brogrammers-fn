import FilterNav from '../../components/filternav';
import SearchTop from '../../components/searchTop';
import ProductList from '../../components/productList';

function Products() {
  return (
    <section className="products-list">
      <SearchTop />
      <FilterNav />
      <ProductList />
    </section>
  );
}

export default Products;
