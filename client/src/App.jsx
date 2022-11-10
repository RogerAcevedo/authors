import './App.css';
import {Routes, Route} from 'react-router-dom'

import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Edit from './pages/Edit';


function App() {
  return (
    <fieldset>
      <h1>App.jsx</h1>
      <Routes>
        <Route path="/" element={ < Create /> }/>
        <Route path="/authors" element={< Dashboard />} />
        <Route path="/authors/edit/:author_id" element={< Edit />} />
        
      </Routes>
    </fieldset>
  );
}

export default App;
