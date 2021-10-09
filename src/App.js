import './App.css';
import { Joystick } from './joystick';

function App() {
  return (
    <div className="h-screen">
      <div className="bg-gray-200 h-2/4 w-2/4">
        <Joystick />
      </div>
    </div>
  );
}

export default App;
