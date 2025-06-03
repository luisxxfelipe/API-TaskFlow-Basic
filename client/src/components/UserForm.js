import React from 'react';

const UserForm = ({ name, email, password, setName, setEmail, setPassword, onSubmit }) => (
  <form onSubmit={onSubmit} className="form">
    <input
      type="text"
      placeholder="Nome"
      value={name}
      onChange={e => setName(e.target.value)}
      required
    />
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Senha"
      value={password}
      onChange={e => setPassword(e.target.value)}
      required
    />
    <button type="submit">Cadastrar novo usuário</button>
  </form>
);

export default UserForm; 