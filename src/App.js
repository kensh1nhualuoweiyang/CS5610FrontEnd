import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Navigate } from "react-router";
import Application from './Application';
function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path='/' element = {<Navigate to="Application"/>}/>
          <Route path="/Application/*" element = {<Application/>}/>
        </Routes>
      </div>
    </HashRouter>
    
  );
}

export default App;
