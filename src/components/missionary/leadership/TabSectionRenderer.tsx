import React, { useState, useEffect } from 'react';
import { TabSection } from '../../../data/missionary/leadershipModeEnhanced';
import './TabSectionRenderer.css';

interface TabSectionRendererProps {
  section: TabSection;
  roleColor: string;
  tabId: string;
  roleId: string;
  onDataChange?: (sectionId: string, data: Record<string, any>) => void;
}

export const TabSectionRenderer: React.FC<TabSectionRendererProps> = ({ 
  section, 
  roleColor,
  tabId,
  roleId,
  onDataChange
}) => {
  const storageKey = `@leadership_${roleId}_${tabId}_${section.id}`;
  const [data, setData] = useState<Record<string, any>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Cargar datos guardados
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error cargando datos:', e);
    }
  }, [storageKey]);

  const saveData = (newData: Record<string, any>) => {
    setData(newData);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newData));
    } catch (e) {
      console.error('Error guardando datos:', e);
    }
  };

  const handleFieldChange = (fieldIndex: number, value: string) => {
    const newData = { ...data, [`field_${fieldIndex}`]: value };
    saveData(newData);
    if (onDataChange) {
      onDataChange(section.id, newData);
    }
  };

  const handleItemToggle = (itemIndex: number) => {
    const newData = { ...data, [`item_${itemIndex}`]: !data[`item_${itemIndex}`] };
    saveData(newData);
    if (onDataChange) {
      onDataChange(section.id, newData);
    }
  };

  const handlePromptChange = (promptIndex: number, value: string) => {
    const newData = { ...data, [`prompt_${promptIndex}`]: value };
    saveData(newData);
    if (onDataChange) {
      onDataChange(section.id, newData);
    }
  };

  // Render según el tipo
  switch (section.type) {
    case 'info':
      return (
        <div className="tab-section tab-section-info">
          <h3 className="tab-section-title">{section.title}</h3>
          {section.description && <p className="tab-section-description">{section.description}</p>}
          {section.bullets && (
            <ul className="tab-section-bullets">
              {section.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      );

    case 'template':
      return (
        <div className="tab-section tab-section-template">
          <h3 className="tab-section-title">{section.title}</h3>
          {section.description && <p className="tab-section-description">{section.description}</p>}
          {section.fields && (
            <div className="tab-section-fields">
              {section.fields.map((field, idx) => (
                <div key={idx} className="tab-section-field">
                  <label className="tab-section-field-label">{field}</label>
                  <textarea
                    className="tab-section-field-input"
                    value={data[`field_${idx}`] || ''}
                    onChange={(e) => handleFieldChange(idx, e.target.value)}
                    placeholder={`Escribe sobre: ${field}`}
                    rows={2}
                    style={{ borderLeftColor: roleColor }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case 'checklist':
      return (
        <div className="tab-section tab-section-checklist">
          <h3 className="tab-section-title">{section.title}</h3>
          {section.description && <p className="tab-section-description">{section.description}</p>}
          {section.items && (
            <div className="tab-section-checklist-items">
              {section.items.map((item, idx) => (
                <label key={idx} className="tab-section-checklist-item">
                  <input
                    type="checkbox"
                    checked={data[`item_${idx}`] || false}
                    onChange={() => handleItemToggle(idx)}
                    style={{ accentColor: roleColor }}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      );

    case 'journal':
      return (
        <div className="tab-section tab-section-journal">
          <h3 className="tab-section-title">{section.title}</h3>
          {section.description && <p className="tab-section-description">{section.description}</p>}
          {section.prompts && (
            <div className="tab-section-journal-prompts">
              {section.prompts.map((prompt, idx) => (
                <div key={idx} className="tab-section-journal-prompt">
                  <label className="tab-section-journal-prompt-label">{prompt}</label>
                  <textarea
                    className="tab-section-journal-prompt-input"
                    value={data[`prompt_${idx}`] || ''}
                    onChange={(e) => handlePromptChange(idx, e.target.value)}
                    placeholder="Escribe tus reflexiones..."
                    rows={4}
                    style={{ borderLeftColor: roleColor }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case 'form':
      return (
        <div className="tab-section tab-section-form">
          <h3 className="tab-section-title">{section.title}</h3>
          {section.description && <p className="tab-section-description">{section.description}</p>}
          {section.fields && (
            <div className="tab-section-form-fields">
              {section.fields.map((field, idx) => (
                <div key={idx} className="tab-section-form-field">
                  <label className="tab-section-form-field-label">{field}</label>
                  <input
                    type="text"
                    className="tab-section-form-field-input"
                    value={data[`field_${idx}`] || ''}
                    onChange={(e) => handleFieldChange(idx, e.target.value)}
                    placeholder={`Ingresa: ${field}`}
                    style={{ borderLeftColor: roleColor }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case 'list':
      return (
        <div className="tab-section tab-section-list">
          <h3 className="tab-section-title">{section.title}</h3>
          {section.description && <p className="tab-section-description">{section.description}</p>}
          {section.fields && (
            <div className="tab-section-list-structure">
              <p className="tab-section-list-note">Estructura sugerida para esta lista:</p>
              <ul className="tab-section-list-fields">
                {section.fields.map((field, idx) => (
                  <li key={idx} className="tab-section-list-field">
                    <span className="tab-section-list-field-icon">•</span>
                    <span>{field}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );

    case 'practice':
      return (
        <div className="tab-section tab-section-practice">
          <h3 className="tab-section-title">{section.title}</h3>
          {section.description && <p className="tab-section-description">{section.description}</p>}
          {section.fields && (
            <div className="tab-section-practice-fields">
              {section.fields.map((field, idx) => (
                <div key={idx} className="tab-section-practice-field">
                  <label className="tab-section-practice-field-label">{field}</label>
                  <textarea
                    className="tab-section-practice-field-input"
                    value={data[`field_${idx}`] || ''}
                    onChange={(e) => handleFieldChange(idx, e.target.value)}
                    placeholder={`Describe: ${field}`}
                    rows={3}
                    style={{ borderLeftColor: roleColor }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
};

