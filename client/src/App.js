import './App.scss';
import Movies from './components/movies'

function App() {
  return (
    <div className="container">
      <h1 className="text-warning">ZMDB</h1>
      <Movies />
    </div>
  );
}

export default App;
