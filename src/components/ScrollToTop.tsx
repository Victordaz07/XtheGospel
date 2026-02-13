import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop - Resets scroll position on route change
 * Place this component inside your Router but outside Routes
 */
export function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Also scroll any layout content containers
    const containers = document.querySelectorAll(
      '.inv-layout-content, .unified-layout-content, .layout-content, .nm-layout-content'
    );
    containers.forEach(container => {
      container.scrollTo(0, 0);
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
