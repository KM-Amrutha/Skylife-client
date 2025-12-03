export function debounce<T extends unknown[]>(
  func: (...args: T) => void | Promise<void>,
  wait: number
): (...args: T) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: T) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}