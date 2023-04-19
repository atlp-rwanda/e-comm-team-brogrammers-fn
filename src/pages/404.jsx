import { Link } from 'react-router-dom';
import SearchBox from '../components/search';

function NotFound() {
  return (
    <div className="p-404">
      <h1>404</h1>
      <h2>PAGE NOT FOUND</h2>
      <p>
        We are sorry, the page you requested doesnot exist in our website! You
        can search our products using the box below or return to{' '}
        <Link to="/">home page</Link>
      </p>
      <SearchBox />
    </div>
  );
}

export default NotFound;
