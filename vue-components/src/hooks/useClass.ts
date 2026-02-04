export function useClass(componentName: string) {
  const prefix = 'mi';
  const base = `${prefix}-${componentName}`;

  const cls = (name?: string) => {
    if (name) {
      return `${base}-${name}`;
    }

    return base;
  };

  return {
    prefixCls: base,
    cls,
  };
}
