export type NavigationMenuProps = {
  readonly isCollapsed: boolean;
};

function CollapsedNavigationMenu() {
  return <h1>Collapsed</h1>;
}

function FullNavigationMenu() {
  return <h1>Full</h1>;
}

export function NavigationMenu({ isCollapsed }: NavigationMenuProps) {
  if (isCollapsed) {
    return <CollapsedNavigationMenu />;
  }

  return <FullNavigationMenu />;
}
