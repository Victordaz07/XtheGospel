import React, { useState } from 'react';
import { FaQuestionCircle, FaTimes } from 'react-icons/fa';
import './CouncilHelpModal.css';

interface CouncilHelpModalProps {
  roleColor: string;
}

export const CouncilHelpModal: React.FC<CouncilHelpModalProps> = ({ roleColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        className="council-help-button"
        onClick={() => setIsOpen(true)}
        style={{ color: roleColor, borderColor: roleColor }}
        title="¿Cómo llenar esta reunión?"
      >
        <FaQuestionCircle />
        <span>Ayuda</span>
      </button>
    );
  }

  return (
    <>
      <button
        className="council-help-button"
        onClick={() => setIsOpen(true)}
        style={{ color: roleColor, borderColor: roleColor }}
        title="¿Cómo llenar esta reunión?"
      >
        <FaQuestionCircle />
        <span>Ayuda</span>
      </button>
      
      <div className="council-help-overlay" onClick={() => setIsOpen(false)}>
        <div className="council-help-modal" onClick={(e) => e.stopPropagation()} style={{ borderTopColor: roleColor }}>
          <div className="council-help-header">
            <h2>Guía para llenar la Reunión de Distrito</h2>
            <button 
              className="council-help-close" 
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar"
              title="Cerrar"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="council-help-content">
            <div className="council-help-section">
              <h3>📋 Información básica</h3>
              <p>
                <strong>Fecha y hora:</strong> Define cuándo será la reunión. Usa la fecha real del consejo de distrito.
              </p>
              <p>
                <strong>Lugar:</strong> Indica dónde se realizará (ej: "Capilla Barrio Centro", "Casa de oración").
              </p>
            </div>

            <div className="council-help-section">
              <h3>🙏 Inicio espiritual</h3>
              <p>
                <strong>Escritura o cita profética:</strong> Una escritura o cita que quieras compartir para inspirar al distrito (ej: "DyC 88:77").
              </p>
              <p>
                <strong>Idea central:</strong> El mensaje principal que quieres transmitir (1-2 frases).
              </p>
              <p>
                <strong>Aplicación para el distrito:</strong> Cómo aplicar este principio en la obra misional esta semana.
              </p>
            </div>

            <div className="council-help-section">
              <h3>📊 Progreso con nombres</h3>
              <p>
                <strong>Importante:</strong> Habla de personas, no de números. Ejemplos:
              </p>
              <ul>
                <li><strong>Personas con fecha bautismal:</strong> "María tiene fecha para el 15 de diciembre"</li>
                <li><strong>Personas en riesgo:</strong> "Juan dejó de asistir a la Iglesia, necesita visita"</li>
                <li><strong>Investigadores nuevos:</strong> "Conocimos a Pedro esta semana, primera lección programada"</li>
                <li><strong>Investigadores en la Iglesia:</strong> "Ana asistió el domingo pasado, muy animada"</li>
              </ul>
            </div>

            <div className="council-help-section">
              <h3>✨ Experiencias espirituales</h3>
              <p>
                Comparte milagros, respuestas a oraciones, o momentos que fortalecieron la fe del distrito. 
                Esto edifica y anima a todos.
              </p>
            </div>

            <div className="council-help-section">
              <h3>📚 Capacitación misional</h3>
              <p>
                <strong>Tema:</strong> Qué vas a enseñar (ej: "Cómo extender fechas bautismales", "Uso del Libro de Mormón").
              </p>
              <p>
                <strong>Escritura base:</strong> La escritura que fundamenta la capacitación.
              </p>
              <p>
                <strong>Principio doctrinal:</strong> El principio clave que quieres que aprendan.
              </p>
              <p>
                <strong>Habilidad práctica:</strong> Qué acción concreta van a practicar.
              </p>
            </div>

            <div className="council-help-section">
              <h3>🎭 Prácticas (role plays)</h3>
              <p>
                Define un escenario real para que practiquen (ej: "Extender fecha bautismal a un investigador que no está listo").
                Observa y da retroalimentación constructiva.
              </p>
            </div>

            <div className="council-help-section">
              <h3>🎯 Metas con nombres</h3>
              <p>
                <strong>Recuerda:</strong> Metas específicas con nombres de personas reales. Ejemplos:
              </p>
              <ul>
                <li>"Esta semana enseñaremos a Carlos y le extenderemos fecha bautismal"</li>
                <li>"Visitaremos a la familia García para invitarles a la Iglesia"</li>
                <li>"Confirmaremos la fecha bautismal de Sofía"</li>
              </ul>
            </div>

            <div className="council-help-section">
              <h3>✅ Checklist de la reunión</h3>
              <p>
                Usa esta lista para asegurarte de que la reunión sea espiritual y efectiva. 
                Marca cada punto mientras preparas o después de la reunión.
              </p>
            </div>

            <div className="council-help-section">
              <h3>🙏 Oración final</h3>
              <p>
                Define por quién y por qué orarán. Esto ayuda a enfocar las oraciones en personas específicas 
                y necesidades reales del distrito.
              </p>
            </div>

            <div className="council-help-tips">
              <h3>💡 Consejos importantes</h3>
              <ul>
                <li>Puedes guardar como borrador y seguir editando después</li>
                <li>Al publicar, todos los misioneros del distrito podrán ver la agenda</li>
                <li>Puedes compartir la agenda por WhatsApp o correo antes de la reunión</li>
                <li>Los misioneros podrán hacer preguntas y comentarios sobre la agenda</li>
                <li>Recuerda: cada número representa una persona real, un hijo de Dios</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

