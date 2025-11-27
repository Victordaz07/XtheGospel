import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import '../Page.css';
import { useI18n } from '../../context/I18nContext';
import { getMemberSupportIdeas } from '../../utils/memberData';
import './MemberMissionarySupport.css';

// Type declaration for browser window
declare const window:
  | {
      alert: (message: string) => void;
    }
  | undefined;

const mockActivities = [
  {
    id: '1',
    title: 'Visita a la familia Rivera',
    date: 'Martes 19:00',
    need: 'Se necesitan 2 acompañantes',
  },
  {
    id: '2',
    title: 'Clase de inglés en la capilla',
    date: 'Jueves 18:30',
    need: 'Traer amigos e interactuar',
  },
  {
    id: '3',
    title: 'Noche de hogar con los López',
    date: 'Domingo 20:00',
    need: 'Familia anfitriona',
  },
];

const MemberMissionarySupport: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const supportIdeas = useMemo(() => getMemberSupportIdeas(t), [t]);
  const [companionForm, setCompanionForm] = useState({
    name: '',
    availability: '',
    notes: '',
  });
  const [referralForm, setReferralForm] = useState({
    friendName: '',
    contact: '',
    notes: '',
  });

  const handleCompanionSubmit = () => {
    if (!companionForm.name.trim()) return;
    if (typeof window !== 'undefined' && window.alert) {
      window.alert(
        `${t('member.ui.offerCompanionship')}: ${companionForm.name}`,
      );
    }
    setCompanionForm({ name: '', availability: '', notes: '' });
  };

  const handleReferralSubmit = () => {
    if (!referralForm.friendName.trim()) return;
    if (typeof window !== 'undefined' && window.alert) {
      window.alert(
        `${t('member.ui.sendReferral')}: ${referralForm.friendName}`,
      );
    }
    setReferralForm({ friendName: '', contact: '', notes: '' });
  };

  return (
    <div className="page">
      <button
        className="support-back-button"
        onClick={() => navigate(-1)}
        aria-label={t('common.back') || 'Volver'}
      >
        <FaArrowLeft />
        <span>{t('common.back') || 'Volver'}</span>
      </button>

      <div className="page-content support-page-content">
        <header className="support-header-card">
          <h1 className="support-title">{t('member.supportMissionaries.title')}</h1>
          <p className="support-subtitle">{t('member.supportMissionaries.intro')}</p>
        </header>

        <section className="support-section">
          <h2 className="support-section-title">
            {t('member.supportMissionaries.activitiesTitle')}
          </h2>
          <div className="support-activities-list">
            {mockActivities.map(activity => (
              <div key={activity.id} className="support-activity-card">
                <h3 className="support-activity-title">{activity.title}</h3>
                <div className="support-activity-meta">
                  <span className="support-activity-date">{activity.date}</span>
                  <span className="support-activity-separator">•</span>
                  <span className="support-activity-need">{activity.need}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="support-section">
          <h2 className="support-section-title">{t('member.ui.offerCompanionship')}</h2>
          <div className="support-form-card">
            <div className="form-group">
              <label className="support-form-label">{t('member.supportMissionaries.form.name')}</label>
              <input
                type="text"
                className="support-form-input"
                value={companionForm.name}
                onChange={e =>
                  setCompanionForm({
                    ...companionForm,
                    name: (e.target as any).value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label className="support-form-label">{t('member.supportMissionaries.form.availability')}</label>
              <input
                type="text"
                className="support-form-input"
                value={companionForm.availability}
                onChange={e =>
                  setCompanionForm({
                    ...companionForm,
                    availability: (e.target as any).value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label className="support-form-label">{t('member.supportMissionaries.form.notes')}</label>
              <textarea
                rows={3}
                className="support-form-textarea"
                value={companionForm.notes}
                onChange={e =>
                  setCompanionForm({
                    ...companionForm,
                    notes: (e.target as any).value,
                  })
                }
              />
            </div>
            <button className="support-form-button" onClick={handleCompanionSubmit}>
              {t('member.ui.save')}
            </button>
          </div>
        </section>

        <section className="support-section">
          <h2 className="support-section-title">{t('member.ui.sendReferral')}</h2>
          <div className="support-form-card">
            <div className="form-group">
              <label className="support-form-label">{t('member.supportMissionaries.form.friendName')}</label>
              <input
                type="text"
                className="support-form-input"
                value={referralForm.friendName}
                onChange={e =>
                  setReferralForm({
                    ...referralForm,
                    friendName: (e.target as any).value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label className="support-form-label">{t('member.supportMissionaries.form.contact')}</label>
              <input
                type="text"
                className="support-form-input"
                value={referralForm.contact}
                onChange={e =>
                  setReferralForm({
                    ...referralForm,
                    contact: (e.target as any).value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label className="support-form-label">{t('member.supportMissionaries.form.notes')}</label>
              <textarea
                rows={3}
                className="support-form-textarea"
                value={referralForm.notes}
                onChange={e =>
                  setReferralForm({
                    ...referralForm,
                    notes: (e.target as any).value,
                  })
                }
              />
            </div>
            <button className="support-form-button" onClick={handleReferralSubmit}>
              {t('member.ui.save')}
            </button>
          </div>
        </section>

        <section className="support-section">
          <h2 className="support-section-title">{t('member.supportMissionaries.howToHelpTitle')}</h2>
          <div className="support-content-card">
            <ul className="support-list">
              {supportIdeas.howToHelp.map((idea, index) => (
                <li key={index} className="support-list-item">{idea}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="support-section">
          <h2 className="support-section-title">{t('member.supportMissionaries.attitudeBlock.title')}</h2>
          <div className="support-content-card">
            <ul className="support-list">
              {supportIdeas.attitudePoints.map((idea, index) => (
                <li key={index} className="support-list-item">{idea}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MemberMissionarySupport;
