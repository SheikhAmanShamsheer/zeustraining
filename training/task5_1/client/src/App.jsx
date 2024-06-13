import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Data from './pages/Data'


function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Data/>}/>
        {/* <Route path="/upload" element={<Data/>}/> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
