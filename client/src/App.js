import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import  Test  from './test';
import { Videoplayer}  from './videoplayer';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Test />}></Route>
        <Route path='/video' element={<Videoplayer />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
