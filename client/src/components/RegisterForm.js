import React from 'react';

const RegisterForm = ({ name, email, password, setName, setEmail, setPassword, onSubmit, toggleLogin }) => (
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
    <button type="submit">Cadastrar</button>
    <button type="button" className="link-btn" onClick={toggleLogin}>
      Já tem conta? Faça login
    </button>
  </form>
);

export default RegisterForm; 