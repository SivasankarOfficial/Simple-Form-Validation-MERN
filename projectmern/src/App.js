import Form  from "./Form";
import Edit  from "./Edit";

import {BrowserRouter,Routes,Route} from "react-router-dom"


const App = () => {
  return (
  <>
  <BrowserRouter>
  <Routes>

    <Route path="/" element={<Form/>}></Route>
    <Route path="/update/:id" element={<Edit/>}></Route>
</Routes>
</BrowserRouter>

  </> 
  );
}
 
export default App;