import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { CustomSelect } from '../../vineyard/components/CustomSelect';
import './Page.css';
import './MissionaryPeople.css';

interface Person {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  status: 'new' | 'progress' | 'ready' | 'baptized';
  lastLesson?: string;
  baptismDate?: string;
  notes?: string;
  createdAt: string;
}

const MissionaryPeople: React.FC = () => {
  const { t } = useI18n();
  const [people, setPeople] = useState<Person[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPerson, setNewPerson] = useState<Partial<Person>>({
    name: '',
    phone: '',
    email: '',
    status: 'new',
  });
  const [filter, setFilter] = useState<'all' | Person['status']>('all');

  const addPerson = () => {
    if (!newPerson.name?.trim()) {
      alert(t('missionary.people.fillName') || 'Por favor ingresa un nombre');
      return;
    }

    const person: Person = {
      id: Date.now().toString(),
      name: newPerson.name,
      phone: newPerson.phone,
      email: newPerson.email,
      status: newPerson.status || 'new',
      lastLesson: newPerson.lastLesson,
      notes: newPerson.notes,
      createdAt: new Date().toISOString(),
    };

    setPeople([...people, person]);
    setNewPerson({
      name: '',
      phone: '',
      email: '',
      status: 'new',
    });
    setShowAddForm(false);
  };

  const deletePerson = (id: string) => {
    if (window.confirm(t('missionary.people.deleteConfirm') || '¿Eliminar esta persona?')) {
      setPeople(people.filter(p => p.id !== id));
    }
  };

  const updatePersonStatus = (id: string, status: Person['status']) => {
    setPeople(people.map(p => p.id === id ? { ...p, status } : p));
  };

  const filteredPeople = filter === 'all' 
    ? people 
    : people.filter(p => p.status === filter);

  const getStatusLabel = (status: Person['status']) => {
    switch (status) {
      case 'new': return t('missionary.people.statusNew') || 'Nuevo';
      case 'progress': return t('missionary.people.statusProgress') || 'En Progreso';
      case 'ready': return t('missionary.people.statusReady') || 'Listo para Bautismo';
      case 'baptized': return t('missionary.people.statusBaptized') || 'Bautizado';
      default: return status;
    }
  };

  const getStatusColor = (status: Person['status']) => {
    switch (status) {
      case 'new': return 'status-new';
      case 'progress': return 'status-progress';
      case 'ready': return 'status-ready';
      case 'baptized': return 'status-baptized';
      default: return '';
    }
  };

  const stats = {
    total: people.length,
    new: people.filter(p => p.status === 'new').length,
    progress: people.filter(p => p.status === 'progress').length,
    ready: people.filter(p => p.status === 'ready').length,
    baptized: people.filter(p => p.status === 'baptized').length,
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('missionary.people.title') || 'Personas'}</h1>
        <p>{t('missionary.people.subtitle') || 'Gestiona a las personas que estás enseñando'}</p>
      </div>

      <div className="page-content">
        {/* Estadísticas */}
        <div className="people-stats">
          <div className="people-stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">{t('missionary.people.total') || 'Total'}</div>
          </div>
          <div className="people-stat-card status-new">
            <div className="stat-number">{stats.new}</div>
            <div className="stat-label">{t('missionary.people.statusNew') || 'Nuevos'}</div>
          </div>
          <div className="people-stat-card status-progress">
            <div className="stat-number">{stats.progress}</div>
            <div className="stat-label">{t('missionary.people.statusProgress') || 'En Progreso'}</div>
          </div>
          <div className="people-stat-card status-ready">
            <div className="stat-number">{stats.ready}</div>
            <div className="stat-label">{t('missionary.people.statusReady') || 'Listos'}</div>
          </div>
          <div className="people-stat-card status-baptized">
            <div className="stat-number">{stats.baptized}</div>
            <div className="stat-label">{t('missionary.people.statusBaptized') || 'Bautizados'}</div>
          </div>
        </div>

        {/* Filtros y acciones */}
        <div className="people-actions">
          <div className="people-filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              {t('missionary.people.filterAll') || 'Todos'}
            </button>
            <button
              className={`filter-btn ${filter === 'new' ? 'active' : ''}`}
              onClick={() => setFilter('new')}
            >
              {t('missionary.people.statusNew') || 'Nuevos'}
            </button>
            <button
              className={`filter-btn ${filter === 'progress' ? 'active' : ''}`}
              onClick={() => setFilter('progress')}
            >
              {t('missionary.people.statusProgress') || 'En Progreso'}
            </button>
            <button
              className={`filter-btn ${filter === 'ready' ? 'active' : ''}`}
              onClick={() => setFilter('ready')}
            >
              {t('missionary.people.statusReady') || 'Listos'}
            </button>
            <button
              className={`filter-btn ${filter === 'baptized' ? 'active' : ''}`}
              onClick={() => setFilter('baptized')}
            >
              {t('missionary.people.statusBaptized') || 'Bautizados'}
            </button>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary"
          >
            {showAddForm ? '✖️ Cancelar' : '+ Agregar Persona'}
          </button>
        </div>

        {/* Formulario agregar */}
        {showAddForm && (
          <div className="people-form">
            <h3>{t('missionary.people.addPerson') || 'Agregar Nueva Persona'}</h3>
            <div className="form-group">
              <label>{t('missionary.people.name') || 'Nombre *'}</label>
              <input
                type="text"
                value={newPerson.name || ''}
                onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                placeholder={t('missionary.people.namePlaceholder') || 'Nombre completo'}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{t('missionary.people.phone') || 'Teléfono'}</label>
                <input
                  type="tel"
                  value={newPerson.phone || ''}
                  onChange={(e) => setNewPerson({ ...newPerson, phone: e.target.value })}
                  placeholder={t('missionary.people.phonePlaceholder') || '+1234567890'}
                />
              </div>
              <div className="form-group">
                <label>{t('missionary.people.email') || 'Email'}</label>
                <input
                  type="email"
                  value={newPerson.email || ''}
                  onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
                  placeholder={t('missionary.people.emailPlaceholder') || 'email@ejemplo.com'}
                />
              </div>
            </div>
            <div className="form-group">
              <CustomSelect
                label={t('missionary.people.status') || 'Estado'}
                value={newPerson.status || 'new'}
                onChange={(value) => setNewPerson({ ...newPerson, status: value as Person['status'] })}
                options={[
                  { value: 'new', label: t('missionary.people.statusNew') || 'Nuevo' },
                  { value: 'progress', label: t('missionary.people.statusProgress') || 'En Progreso' },
                  { value: 'ready', label: t('missionary.people.statusReady') || 'Listo para Bautismo' },
                  { value: 'baptized', label: t('missionary.people.statusBaptized') || 'Bautizado' },
                ]}
              />
            </div>
            <div className="form-group">
              <label>{t('missionary.people.notes') || 'Notas'}</label>
              <textarea
                value={newPerson.notes || ''}
                onChange={(e) => setNewPerson({ ...newPerson, notes: e.target.value })}
                placeholder={t('missionary.people.notesPlaceholder') || 'Notas adicionales...'}
                rows={3}
              />
            </div>
            <button onClick={addPerson} className="btn-primary">
              {t('missionary.people.add') || 'Agregar Persona'}
            </button>
          </div>
        )}

        {/* Lista de personas */}
        <div className="people-list">
          {filteredPeople.length === 0 ? (
            <div className="people-empty">
              <p>{t('missionary.people.noPeople') || 'No hay personas registradas.'}</p>
            </div>
          ) : (
            filteredPeople.map((person) => (
              <div key={person.id} className="people-card">
                <div className="people-card-header">
                  <div className="people-card-info">
                    <h3>{person.name}</h3>
                    <span className={`people-status-badge ${getStatusColor(person.status)}`}>
                      {getStatusLabel(person.status)}
                    </span>
                  </div>
                  <div className="people-card-actions">
                    <CustomSelect
                      value={person.status}
                      onChange={(value) => updatePersonStatus(person.id, value as Person['status'])}
                      options={[
                        { value: 'new', label: t('missionary.people.statusNew') || 'Nuevo' },
                        { value: 'progress', label: t('missionary.people.statusProgress') || 'En Progreso' },
                        { value: 'ready', label: t('missionary.people.statusReady') || 'Listo' },
                        { value: 'baptized', label: t('missionary.people.statusBaptized') || 'Bautizado' },
                      ]}
                    />
                    <button
                      onClick={() => deletePerson(person.id)}
                      className="people-delete-btn"
                      title={t('missionary.people.delete') || 'Eliminar'}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div className="people-card-details">
                  {person.phone && (
                    <p className="people-detail-item">📞 {person.phone}</p>
                  )}
                  {person.email && (
                    <p className="people-detail-item">✉️ {person.email}</p>
                  )}
                  {person.lastLesson && (
                    <p className="people-detail-item">📖 {t('missionary.people.lastLesson') || 'Última lección'}: {person.lastLesson}</p>
                  )}
                  {person.baptismDate && (
                    <p className="people-detail-item">💧 {t('missionary.people.baptismDate') || 'Bautismo'}: {new Date(person.baptismDate).toLocaleDateString('es-ES')}</p>
                  )}
                  {person.notes && (
                    <p className="people-detail-item notes">{person.notes}</p>
                  )}
                </div>
                <div className="people-card-footer">
                  <Link to={`/lessons`} className="people-action-link">
                    📖 {t('missionary.people.viewLessons') || 'Ver Lecciones'}
                  </Link>
                  <Link to={`/agenda`} className="people-action-link">
                    📅 {t('missionary.people.schedule') || 'Agendar'}
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionaryPeople;
