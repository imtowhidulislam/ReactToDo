import { Toaster, } from 'react-hot-toast';
import './App.css';
import { Todo } from './components/index';

function App() {
  return (
    <div>
      <Todo />
      <Toaster />
    </div>
  );
}

export default App;
