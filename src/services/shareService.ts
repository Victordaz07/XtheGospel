// src/services/shareService.ts
// Servicio para compartir agendas y contenido

import { DistrictCouncil } from './districtCouncilService';

export interface ShareTemplate {
  id: string;
  title: string;
  body: string;
}

export const ShareService = {
  // Generar texto para compartir (WhatsApp/Email)
  generateAgendaText: (council: DistrictCouncil, template: 'short' | 'full' = 'full'): string => {
    if (template === 'short') {
      return `📝 Reunión de Distrito – ${council.date} a las ${council.time}

Lugar: ${council.location}
Distrito: ${council.districtId || 'Mi Distrito'}

Tema espiritual: ${council.spiritualStart.ideaCentral || 'Por definir'}
Capacitación: ${council.training.tema || 'Por definir'}

Por favor lleguen puntuales, con sus metas y experiencias listas para compartir.

– Líder de Distrito`;
    }

    // Template completo
    return `📋 AGENDA – REUNIÓN DE DISTRITO
Distrito: ${council.districtId || 'Mi Distrito'}
Fecha: ${council.date || '—'} – Hora: ${council.time || '—'}
Lugar: ${council.location || '—'}
Líder de distrito: ${council.leaderName || 'Líder de Distrito'}

1️⃣ Inicio espiritual
• Escritura / cita: ${council.spiritualStart.scripture || 'Por definir'}
• Idea central: ${council.spiritualStart.ideaCentral || 'Por definir'}
• Aplicación para el distrito: ${council.spiritualStart.application || 'Por definir'}

2️⃣ Revisión de metas y progreso
• Personas con fecha bautismal: ${council.progress.personasConFecha || 'N/A'}
• Personas en riesgo: ${council.progress.personasEnRiesgo || 'N/A'}
• Investigadores nuevos: ${council.progress.investigadoresNuevos || 'N/A'}
• Investigadores en la Iglesia: ${council.progress.investigadoresEnIglesia || 'N/A'}
• Comentarios pastorales: ${council.progress.comentarios || 'N/A'}

3️⃣ Experiencias espirituales
• Preguntas guía:
  - ¿Qué milagro vimos esta semana?
  - ¿Qué oración fue respondida?
  - ¿Qué experiencia fortaleció nuestra fe?

4️⃣ Capacitación misional
• Tema: ${council.training.tema || 'Por definir'}
• Escritura base: ${council.training.escritura || 'Por definir'}
• Principio doctrinal: ${council.training.principio || 'Por definir'}
• Habilidad práctica: ${council.training.habilidad || 'Por definir'}
• Compromiso del distrito: ${council.training.compromiso || 'Por definir'}

5️⃣ Prácticas (role plays)
• Escenario: ${council.roleplays.escenario || 'Por definir'}
• Objetivo espiritual: ${council.roleplays.objetivo || 'Por definir'}
• Puntos fuertes: ${council.roleplays.puntosFuertes || 'Por definir'}
• Aspectos a mejorar: ${council.roleplays.aspectosMejorar || 'Por definir'}
• Compromiso: ${council.roleplays.compromiso || 'Por definir'}

6️⃣ Metas con nombres
• Personas a enseñar: ${council.goals.personas || 'Por definir'}
• Compromisos a invitar: ${council.goals.compromisos || 'Por definir'}
• Fechas a fijar o confirmar: ${council.goals.fechas || 'Por definir'}
• Acciones por área: ${council.goals.acciones || 'Por definir'}
• Seguimiento para la próxima reunión: ${council.goals.seguimiento || 'Por definir'}

🙏 Oración final
• Personas por las que oraremos: ${council.closing.personas || 'Por definir'}
• Misioneros con necesidades especiales: ${council.closing.misioneros || 'Por definir'}
• Unidad y ánimo del distrito: ${council.closing.unidad || 'Por definir'}

"Recordemos que cada número representa una persona real, un hijo de Dios."`;
  },

  // Compartir por WhatsApp
  shareToWhatsApp: (text: string): void => {
    try {
      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/?text=${encodedText}`;
      const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        console.warn('No se pudo abrir WhatsApp. Verifica que los pop-ups estén permitidos.');
      }
    } catch (e) {
      console.error('Error compartiendo por WhatsApp:', e);
    }
  },

  // Compartir por Email
  shareToEmail: (subject: string, body: string): void => {
    try {
      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(body);
      const emailUrl = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
      // Usar window.location en lugar de window.open para mailto
      window.location.href = emailUrl;
    } catch (e) {
      console.error('Error compartiendo por email:', e);
    }
  },

  // Copiar al portapapeles
  copyToClipboard: async (text: string): Promise<boolean> => {
    try {
      // Verificar si el API está disponible
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) {
      // Si falla el API moderno, usar fallback
      console.warn('Clipboard API no disponible, usando fallback:', e);
    }
    
    // Fallback para navegadores antiguos o cuando el API falla
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      textArea.style.opacity = '0';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      
      // Seleccionar en diferentes navegadores
      if (navigator.userAgent.match(/ipad|iphone/i)) {
        const range = document.createRange();
        range.selectNodeContents(textArea);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
        textArea.setSelectionRange(0, 999999);
      } else {
        textArea.select();
      }
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      return successful;
    } catch (err) {
      console.error('Error copiando al portapapeles:', err);
      return false;
    }
  },

  // Compartir con opciones
  shareWithOptions: async (council: DistrictCouncil, method: 'whatsapp' | 'email' | 'copy'): Promise<boolean> => {
    try {
      const text = ShareService.generateAgendaText(council, 'full');
      const subject = `Reunión de Distrito – ${council.date} ${council.time}`;

      switch (method) {
        case 'whatsapp':
          ShareService.shareToWhatsApp(text);
          return true;
        
        case 'email':
          ShareService.shareToEmail(subject, text);
          return true;
        
        case 'copy':
          return await ShareService.copyToClipboard(text);
        
        default:
          return false;
      }
    } catch (e) {
      console.error('Error en shareWithOptions:', e);
      return false;
    }
  }
};

