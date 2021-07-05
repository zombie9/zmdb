import './App.scss';
import Navbar from './components/navbar'
import Movies from './components/movies'

function App() {
  return (
    <div className="container">
      <Navbar />
      <Movies />
    </div>
  );
}

export default App;
