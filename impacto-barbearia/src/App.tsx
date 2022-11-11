import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import PaginaAgendamentos from './dashboard/paginas/agendamentos';
import PaginaClientes from './dashboard/paginas/clientes';
import Login from './login/login';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [token, setToken] = useState<string>('');

  const atualizarJwt = (novoToken: string) => {
    setToken(novoToken);
    localStorage.setItem('token', novoToken);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <nav className='navbar navbar-expand-lg'>
          <div className='container-fluid'>
            <a className="navbar-brand" href="/">
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <Link to="/agendamentos" className='nav-link'>Agendamentos</Link>
                </li>
                <li className='nav-item'>
                  <Link to="/clientes" className='nav-link'>Clientes</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<Login atualizarJwt={atualizarJwt} />} />
          <Route path='/agendamentos' element={<ProtectedRoute token={token}><PaginaAgendamentos /></ProtectedRoute>} />
          <Route path='/clientes' element={<ProtectedRoute token={token}><PaginaClientes /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
