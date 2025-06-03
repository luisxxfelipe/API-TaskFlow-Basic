import React from 'react';

const Sidebar = ({ isAdmin, onSelect, onLogout, selected }) => (
  <nav className="sidebar">
    <ul>
      {isAdmin && (
        <li className={selected === 'users' ? 'active' : ''} onClick={() => onSelect('users')}>
          Usuários
        </li>
      )}
      <li className={selected === 'tasks' ? 'active' : ''} onClick={() => onSelect('tasks')}>
        Tasks
      </li>
      <li className="logout" onClick={onLogout}>
        Sair
      </li>
    </ul>
  </nav>
);

export default Sidebar; 