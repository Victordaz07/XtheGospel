import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { mockNewConverts, NewConvert, ConvertTimeframe } from '../../data/leaderNewConverts';
import '../../pages/Page.css';
import './LeaderScreens.css';

export const LeaderNewConvertsScreen: React.FC = () => {
  const { t } = useI18n();
  const [selectedConvert, setSelectedConvert] = useState<string | null>(null);

  const getStatusLabel = (status: string) => {
    return t(`memberLeader.newConverts.status.${status}`);
  };

  const getTimeframeMonths = (timeframe: ConvertTimeframe) => {
    if (timeframe === '0-3') return '0_3';
    if (timeframe === '3-6') return '3_6';
    return '6_12';
  };

  const getPlanItems = (timeframe: ConvertTimeframe) => {
    const key = getTimeframeMonths(timeframe);
    const items: string[] = [];
    for (let i = 0; i < 3; i++) {
      const itemKey = `memberLeader.newConverts.plan.months${key}.items.${i}`;
      const item = t(itemKey);
      if (item !== itemKey) items.push(item);
    }
    return items;
  };

  const stats = {
    total: mockNewConverts.length,
    withCalling: mockNewConverts.filter(c => c.hasCalling).length,
    preparing: mockNewConverts.filter(c => c.isPreparingForTemple).length
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('memberLeader.newConverts.title')}</h1>
        <p className="page-subtitle">{t('memberLeader.newConverts.subtitle')}</p>
      </div>
      <div className="page-content">
        <div className="leader-stats-card">
          <p>
            {t('memberLeader.newConverts.stats', stats)}
          </p>
        </div>

        {mockNewConverts.map(convert => (
          <div key={convert.id} className="leader-convert-card">
            <div className="leader-convert-header">
              <div>
                <h3>{convert.name}</h3>
                <p className="leader-convert-time">
                  {t('memberLeader.newConverts.timeframeLabel', { months: convert.monthsSinceBaptism })}
                </p>
              </div>
            </div>

            <div className="leader-convert-status-chips">
              {convert.statuses.map(status => (
                <span key={status} className="leader-status-chip">
                  {getStatusLabel(status)}
                </span>
              ))}
            </div>

            <div className="leader-convert-actions">
              <button
                className="leader-button-small"
                onClick={() => setSelectedConvert(
                  selectedConvert === convert.id ? null : convert.id
                )}
              >
                {t('memberLeader.newConverts.viewPlan')}
              </button>
              <button className="leader-button-small secondary">
                {t('memberLeader.newConverts.quickNotes')}
              </button>
            </div>

            {selectedConvert === convert.id && (
              <div className="leader-plan-detail">
                <h4>{t(`memberLeader.newConverts.plan.months${getTimeframeMonths(convert.timeframe)}.title`)}</h4>
                <ul>
                  {getPlanItems(convert.timeframe).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

