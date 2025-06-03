import React, { useRef, useEffect } from 'react';

const EditUserModal = ({ editingUser, editName, setEditName, editEmail, setEditEmail, onClose, onSubmit }) => {
  const editNameRef = useRef(null);
  useEffect(() => {
    if (editingUser && editNameRef.current) {
      editNameRef.current.focus();
    }
  }, [editingUser]);

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  if (!editingUser) return null;
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <h3>Editar Usuário</h3>
        <form onSubmit={onSubmit} className="modal-form">
          <input
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            required
            ref={editNameRef}
            placeholder="Nome"
          />
          <input
            type="email"
            value={editEmail}
            onChange={e => setEditEmail(e.target.value)}
            required
            placeholder="Email"
          />
          <div className="modal-actions">
            <button type="submit" className="edit-btn">Salvar</button>
            <button type="button" className="delete-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal; 