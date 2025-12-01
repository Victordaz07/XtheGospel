import apConfig from './assistant_to_president.json';

export interface RoleConfig {
  title: string;
  description: string;
  tabs: {
    [key: string]: {
      title: string;
      subtitle: string;
      purpose: string;
      sections: Array<{
        id: string;
        type: 'info' | 'form' | 'list' | 'checklist' | 'journal';
        title: string;
        bullets?: string[];
        fields?: string[];
        items?: string[];
        prompts?: string[];
        description?: string;
      }>;
    };
  };
}

export const getAPConfig = (): RoleConfig => {
  return apConfig.assistant_to_president as RoleConfig;
};

export const getAPTabConfig = (tabKey: string) => {
  const config = getAPConfig();
  return config.tabs[tabKey];
};

export const getAPSectionConfig = (tabKey: string, sectionId: string) => {
  const tabConfig = getAPTabConfig(tabKey);
  return tabConfig?.sections.find(section => section.id === sectionId);
};

