import './App.scss';
import Navbar from './components/navbar'
import Movies from './components/movies'
import Footer from './components/footer';

function App() {
  return (
    <div className="container">
      <Navbar />
      <Movies />
      <Footer />
    </div>
  );
}

export default App;
