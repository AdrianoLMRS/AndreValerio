export const getCssVariable = (variableName: string): string | null => {
    if (typeof window === 'undefined') return null;
  
    const value = getComputedStyle(document.documentElement).getPropertyValue(variableName);
    return value.trim() || null;
};
  