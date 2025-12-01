import React from 'react';
import { 
  FaHome, 
  FaUsers, 
  FaExchangeAlt, 
  FaWater, 
  FaBook, 
  FaComments,
  FaChartLine,
  FaHandshake,
  FaMapMarkedAlt,
  FaBriefcase,
  FaPlane,
  FaHeart,
  FaUser
} from 'react-icons/fa';

// Mapeo de iconos para tabs de liderazgo
export const getTabIcon = (tabId: string, iconName?: string): React.ReactNode => {
  // Si hay un iconName específico, intentar usarlo
  if (iconName) {
    const iconMap: Record<string, React.ReactNode> = {
      'home-outline': <FaHome />,
      'people-circle-outline': <FaUsers />,
      'swap-horizontal-outline': <FaExchangeAlt />,
      'water-outline': <FaWater />,
      'journal-outline': <FaBook />,
      'chatbubbles-outline': <FaComments />,
      'leaderboard-outline': <FaChartLine />,
      'ribbon-outline': <FaHandshake />,
      'map-outline': <FaMapMarkedAlt />,
      'briefcase-outline': <FaBriefcase />,
      'airplane-outline': <FaPlane />,
      'heart-outline': <FaHeart />,
      'podium-outline': <FaChartLine />,
      'star-outline': <FaHandshake />,
      'mail-outline': <FaComments />,
      'clipboard-outline': <FaBriefcase />,
      'sync-outline': <FaExchangeAlt />,
      'person-outline': <FaUser />
    };
    if (iconMap[iconName]) {
      return iconMap[iconName];
    }
  }

  // Fallback por tabId
  const tabIconMap: Record<string, React.ReactNode> = {
    'dashboard': <FaHome />,
    'district_council': <FaUsers />,
    'exchanges': <FaExchangeAlt />,
    'baptismal_interviews': <FaWater />,
    'profile': <FaUser />,
    'personal_notes': <FaBook />,
    'zone_messages': <FaComments />,
    'zone_council': <FaChartLine />,
    'zone_exchanges': <FaExchangeAlt />,
    'zone_reports': <FaBriefcase />,
    'zone_communication': <FaComments />,
    'mission_leaders_council': <FaChartLine />,
    'transfers_planning': <FaMapMarkedAlt />,
    'office_admin': <FaBriefcase />,
    'field_tours': <FaPlane />,
    'ap_companionship': <FaHeart />
  };

  return tabIconMap[tabId] || <span>📋</span>;
};

