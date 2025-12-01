import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { TabSection } from '../../../data/missionary/leadershipModeEnhanced';
import { TabSectionRenderer } from './TabSectionRenderer';
import './SectionCard.css';

interface SectionCardProps {
  section: TabSection;
  roleColor: string;
  tabId: string;
  roleId: string;
  defaultExpanded?: boolean;
  onDataChange?: (sectionId: string, data: Record<string, any>) => void;
}

export const SectionCard: React.FC<SectionCardProps> = ({ 
  section, 
  roleColor,
  tabId,
  roleId,
  defaultExpanded = false,
  onDataChange
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="section-card" style={{ borderLeftColor: roleColor }}>
      <button
        className="section-card-header"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ color: roleColor }}
      >
        <h3 className="section-card-title">{section.title}</h3>
        <span className="section-card-toggle">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      {isExpanded && (
        <div className="section-card-content">
          {section.description && (
            <p className="section-card-description">{section.description}</p>
          )}
          <TabSectionRenderer
            section={section}
            roleColor={roleColor}
            tabId={tabId}
            roleId={roleId}
            onDataChange={onDataChange}
          />
        </div>
      )}
    </div>
  );
};

