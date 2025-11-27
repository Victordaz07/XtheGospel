import React, { ReactNode } from 'react';
import './PageContainer.css';

type CSSVarStyle = React.CSSProperties & {
  [key: `--${string}`]: string | number | undefined;
};

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  /**
   * Optional max width override (number interpreted as px)
   */
  maxWidth?: number | string;
  /**
   * Removes the default padding when set to true
   */
  noPadding?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  maxWidth,
  noPadding = false,
}) => {
  const style: CSSVarStyle = {};

  if (maxWidth) {
    style['--ui-page-container-max-width'] =
      typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
  }

  if (noPadding) {
    style['--ui-page-container-padding-x'] = '0px';
    style['--ui-page-container-padding-top'] = '0px';
    style['--ui-page-container-padding-bottom'] = '0px';
  }

  return (
    <div className={`ui-page-container ${className}`} style={style}>
      {children}
    </div>
  );
};

