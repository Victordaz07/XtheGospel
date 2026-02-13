declare module 'hammerjs';

declare module 'react-dom/client' {
  export function createRoot(container: Element | DocumentFragment): {
    render(children: React.ReactNode): void;
    unmount(): void;
  };
}

declare module '@react-navigation/material-top-tabs' {
  export function createMaterialTopTabNavigator(): {
    Navigator: React.ComponentType<Record<string, unknown>>;
    Screen: React.ComponentType<Record<string, unknown>>;
  };
}
