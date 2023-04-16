import { useDispatch } from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { getuni } from './actions/uni';
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import EventsDetail from "./components/Event/EventsDetail"
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import RSOsDetail from "./components/RSO/RSOsDetail";

function App() {
  const dispatch = useDispatch();
  dispatch(getuni())

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Home/>}></Route>
        <Route path="/home" exact element={<Home/>}></Route>
        <Route path="/auth" exact element={<Auth/>}></Route>
        <Route path="/admin" exact element={<Admin/>}></Route>
        <Route path="/events/:id" exact element={<EventsDetail/>}></Route>
        <Route path="/rsos/:id" exact element={<RSOsDetail/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
