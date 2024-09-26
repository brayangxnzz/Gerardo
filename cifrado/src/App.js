import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Encabezado from './componentes/encabezado';
import CifradoApp from './componentes/cifrado';

const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<><Encabezado /><CifradoApp /></>}/> 
      </Routes> 
    </Router>
  );
};

export default App;
