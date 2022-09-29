import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './dashboard/dashboard';
import PaginaAgendamentos from './dashboard/paginas/agendamentos';
import PaginaClientes from './dashboard/paginas/clientes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className='navbar navbar-expand-lg'>
          <a className="navbar-brand" href="/">
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
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
        </nav>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='clientes' element={<PaginaClientes />} />
          <Route path='agendamentos' element={<PaginaAgendamentos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
