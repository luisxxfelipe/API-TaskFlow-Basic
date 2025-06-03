import React, { useState, useEffect } from 'react';
import './App.css';
import api, { getUserFromToken } from './services/api';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import EditUserModal from './components/EditUserModal';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Sidebar from './components/Sidebar';

function TasksList({ tasks, onEdit, onDelete }) {
  return (
    <ul className="user-list">
      {tasks.length === 0 ? (
        <li>Nenhuma task cadastrada.</li>
      ) : (
        tasks.map(task => (
          <li key={task.id} className="user-item">
            <span>{task.title} - {task.description}</span>
            <div className="actions">
              <button className="edit-btn" onClick={() => onEdit(task)}>Editar</button>
              <button className="delete-btn" onClick={() => onDelete(task.id)}>Excluir</button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

function TaskForm({ title, setTitle, description, setDescription, onSubmit, isEditing, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="form">
      <input
        type="text"
        placeholder="Título da Task"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit">{isEditing ? 'Salvar' : 'Adicionar Task'}</button>
        {isEditing && <button type="button" className="delete-btn" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [selectedPage, setSelectedPage] = useState('tasks');
  const [userPayload, setUserPayload] = useState(getUserFromToken());
  // Tasks
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  // Redireciona para a página correta ao logar
  useEffect(() => {
    if (isAuthenticated && userPayload) {
      if (userPayload.is_admin) setSelectedPage('users');
      else setSelectedPage('tasks');
    }
  }, [isAuthenticated, userPayload]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      setMessage('Erro ao buscar usuários. Faça login novamente.');
      if (err.response && err.response.status === 401) handleLogout();
    }
    setLoading(false);
  };

  // Fetch real tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      setMessage('Erro ao buscar tasks. Faça login novamente.');
    }
  };

  useEffect(() => {
    if (isAuthenticated && userPayload?.is_admin) fetchUsers();
    if (isAuthenticated) fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, userPayload]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await api.post('/users/login', { email: loginEmail, password: loginPassword });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      setUserPayload(getUserFromToken());
      setLoginEmail('');
      setLoginPassword('');
      setMessage('Login realizado com sucesso!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erro ao fazer login.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUsers([]);
    setUserPayload(null);
    setMessage('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.post('/users/register', { name, email, password });
      setMessage('Cadastro realizado! Faça login.');
      setShowRegister(false);
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erro ao cadastrar usuário.');
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setMessage('');
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setEditName('');
    setEditEmail('');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.put(`/users/${editingUser.id}`, { name: editName, email: editEmail });
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, name: editName, email: editEmail } : u));
      setMessage('Usuário atualizado com sucesso!');
      closeEditModal();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erro ao atualizar usuário.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;
    setMessage('');
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
      setMessage('Usuário excluído com sucesso!');
    } catch (err) {
      setMessage('Erro ao excluir usuário.');
    }
  };

  // Task CRUD
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskTitle || !taskDescription) return;
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask.id}`, { title: taskTitle, description: taskDescription });
        setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, title: taskTitle, description: taskDescription } : t));
        setEditingTask(null);
        setMessage('Task atualizada com sucesso!');
      } else {
        const res = await api.post('/tasks', { title: taskTitle, description: taskDescription });
        setTasks([res.data, ...tasks]);
        setMessage('Task criada com sucesso!');
      }
      setTaskTitle('');
      setTaskDescription('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erro ao salvar task.');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
      setMessage('Task excluída com sucesso!');
    } catch (err) {
      setMessage('Erro ao excluir task.');
    }
  };

  const handleCancelEditTask = () => {
    setEditingTask(null);
    setTaskTitle('');
    setTaskDescription('');
  };

  if (!isAuthenticated) {
    return (
      <div className="container">
        <h1>{showRegister ? 'Cadastro' : 'Login'}</h1>
        {showRegister ? (
          <RegisterForm
            name={name}
            email={email}
            password={password}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            onSubmit={handleRegister}
            toggleLogin={() => { setShowRegister(false); setMessage(''); }}
          />
        ) : (
          <LoginForm
            email={loginEmail}
            password={loginPassword}
            setEmail={setLoginEmail}
            setPassword={setLoginPassword}
            onSubmit={handleLogin}
            toggleRegister={() => { setShowRegister(true); setMessage(''); }}
          />
        )}
        {message && <p className="message">{message}</p>}
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar
        isAdmin={userPayload?.is_admin}
        onSelect={setSelectedPage}
        onLogout={handleLogout}
        selected={selectedPage}
      />
      <div style={{ flex: 1 }}>
        <div className="container">
          {selectedPage === 'users' && userPayload?.is_admin && (
            <>
              <div className="header-row">
                <h1>Cadastro de Usuários</h1>
              </div>
              <UserForm
                name={name}
                email={email}
                password={password}
                setName={setName}
                setEmail={setEmail}
                setPassword={setPassword}
                onSubmit={handleRegister}
              />
              {message && <p className="message">{message}</p>}
              <h2>Usuários Cadastrados</h2>
              {loading ? (
                <p>Carregando usuários...</p>
              ) : (
                <UserList users={users} onEdit={openEditModal} onDelete={handleDelete} />
              )}
              <EditUserModal
                editingUser={editingUser}
                editName={editName}
                setEditName={setEditName}
                editEmail={editEmail}
                setEditEmail={setEditEmail}
                onClose={closeEditModal}
                onSubmit={handleEditSubmit}
              />
            </>
          )}
          {selectedPage === 'tasks' && (
            <>
              <div className="header-row">
                <h1>Tasks</h1>
              </div>
              <TaskForm
                title={taskTitle}
                setTitle={setTaskTitle}
                description={taskDescription}
                setDescription={setTaskDescription}
                onSubmit={handleAddTask}
                isEditing={!!editingTask}
                onCancel={handleCancelEditTask}
              />
              <TasksList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
            </>
          )}
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
