/* eslint-disable react/button-has-type */
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { set, toggle } from './redux/features/slices/sample';

function App() {
  const bool = useSelector((state) => state.boolean);
  const dispatch = useDispatch();

  const buttonStyle = {
    padding: '.5rem 1rem',
    margin: '5px',
  };
  return (
    <div className="App">
      <p>BROGRAMMERS</p>
      <div style={{ width: 'max-content', textAlign: 'center' }}>
        <p>{bool.value ? 'true' : 'false'}</p>
        <p>
          <button style={buttonStyle} onClick={() => dispatch(set(true))}>
            true
          </button>
          <button style={buttonStyle} onClick={() => dispatch(toggle())}>
            inverse
          </button>
          <button style={buttonStyle} onClick={() => dispatch(set(false))}>
            false
          </button>
        </p>
      </div>
    </div>
  );
}

export default App;
