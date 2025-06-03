import React from 'react';

const LoginForm = ({ email, password, setEmail, setPassword, onSubmit, toggleRegister }) => (
  <form onSubmit={onSubmit} className="form">
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
    <button type="submit">Entrar</button>
    <button type="button" className="link-btn" onClick={toggleRegister}>
      Não tem conta? Cadastre-se
    </button>
  </form>
);

export default LoginForm; 