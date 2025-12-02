import React from 'react';
import '../styles/xthegospel-ui.css';

type Props = {
  children: React.ReactNode;
};

export const XtgAppLayout: React.FC<Props> = ({ children }) => {
  return <div className="xtg-app-shell">{children}</div>;
};

