/**
 * New Calling Page
 * 
 * Form to propose a new calling.
 * Simple, respectful, no pressure.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallingsStore } from '../state';
import { OrganizationType, ORGANIZATION_LABELS } from '../types';
import './LeadershipPages.css';

// Mock members for development
const MOCK_MEMBERS = [
  { id: 'member-10', name: 'Carlos Rodríguez' },
  { id: 'member-11', name: 'Laura Fernández' },
  { id: 'member-12', name: 'Miguel Ángel Torres' },
  { id: 'member-13', name: 'Patricia Morales' },
  { id: 'member-14', name: 'Fernando Gutiérrez' },
];

const NewCallingPage: React.FC = () => {
  const navigate = useNavigate();
  const addCalling = useCallingsStore((s) => s.addCalling);
  
  const [memberId, setMemberId] = useState('');
  const [memberName, setMemberName] = useState('');
  const [organization, setOrganization] = useState<OrganizationType | ''>('');
  const [position, setPosition] = useState('');
  const [proposedDate, setProposedDate] = useState('');
  const [notes, setNotes] = useState('');
  
  const handleMemberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = MOCK_MEMBERS.find(m => m.id === e.target.value);
    if (selected) {
      setMemberId(selected.id);
      setMemberName(selected.name);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!memberId || !organization || !position) {
      return;
    }
    
    const newCalling = addCalling({
      memberId,
      memberName,
      organization: organization as OrganizationType,
      position,
      proposedDate: proposedDate || undefined,
      notes: notes || undefined,
    });
    
    navigate(`/member/leadership/callings/${newCalling.id}`);
  };
  
  return (
    <div className="leadership-page">
      <header className="leadership-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Cancelar
        </button>
        <h1>Nuevo Llamamiento</h1>
      </header>
      
      <main className="leadership-content">
        <form className="calling-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="member">👤 Miembro</label>
            <select 
              id="member"
              value={memberId}
              onChange={handleMemberChange}
              required
            >
              <option value="">Seleccionar miembro...</option>
              {MOCK_MEMBERS.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="organization">🏛️ Organización</label>
            <select
              id="organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value as OrganizationType)}
              required
            >
              <option value="">Seleccionar...</option>
              {Object.entries(ORGANIZATION_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="position">📋 Rol / Posición</label>
            <input
              id="position"
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Ej: Presidente, Consejero, Maestro..."
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date">📅 Fecha propuesta (opcional)</label>
            <input
              id="date"
              type="date"
              value={proposedDate}
              onChange={(e) => setProposedDate(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="notes">📝 Notas (opcional)</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notas adicionales..."
              rows={3}
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="action-button primary">
              Guardar como Propuesto
            </button>
            <button 
              type="button" 
              className="action-button secondary"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewCallingPage;
