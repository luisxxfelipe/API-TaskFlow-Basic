import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => (
  <ul className="user-list">
    {users.length === 0 ? (
      <li>Nenhum usuário cadastrado.</li>
    ) : (
      users.map(user => (
        <li key={user.id} className="user-item">
          <span>{user.name} ({user.email})</span>
          <div className="actions">
            <button className="edit-btn" onClick={() => onEdit(user)}>Editar</button>
            <button className="delete-btn" onClick={() => onDelete(user.id)}>Excluir</button>
          </div>
        </li>
      ))
    )}
  </ul>
);

export default UserList; 