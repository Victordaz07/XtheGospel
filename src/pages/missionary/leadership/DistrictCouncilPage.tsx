import React from 'react';
import { XtgPage } from '../../../components/layout/XtgPage';
import { XtgCard } from '../../../components/ui/XtgCard';
import { useI18n } from '../../../context/I18nContext';

export function DistrictCouncilPage() {
  const { t } = useI18n();

  return (
    <XtgPage
      title={t('leadership.districtCouncil.title') || "District Council"}
      subtitle={t('leadership.districtCouncil.subtitle') || "Plan, conduct, and record your weekly district council with a people-focused approach."}
      badge="District Leader"
    >
      <div className="xtg-section xtg-grid-2">
        <XtgCard title={t('leadership.districtCouncil.agenda') || "This Week's Agenda"}>
          {/* formulario/plantilla de agenda */}
          <p className="xtg-text-muted">
            {t('leadership.districtCouncil.agendaDesc') || "Plan the spiritual focus, training topic, and goals for this week's council."}
          </p>
        </XtgCard>

        <XtgCard title={t('leadership.districtCouncil.followups') || "Assigned Follow-ups"}>
          {/* lista de compromisos / tareas derivadas del consejo */}
          <p className="xtg-text-muted">
            {t('leadership.districtCouncil.followupsDesc') || "Track commitments and follow-up tasks assigned during the council."}
          </p>
        </XtgCard>
      </div>

      <div className="xtg-section">
        <XtgCard title={t('leadership.districtCouncil.notes') || "Spiritual Impressions & Notes"}>
          {/* notas, impresiones del Espíritu */}
          <p className="xtg-text-muted">
            {t('leadership.districtCouncil.notesDesc') || "Record spiritual impressions, key insights, and important notes from the council."}
          </p>
        </XtgCard>
      </div>
    </XtgPage>
  );
}

