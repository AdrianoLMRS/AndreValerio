// Integration log format message
export const log = (label: string, message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const time = new Date().toLocaleTimeString(undefined, { hour12: false });
    const gray = '\x1b[90m';
    const blue = '\x1b[34m';
    const green = '\x1b[32m';
    const red = '\x1b[31m';
    const reset = '\x1b[0m';

    const prefix = `${gray}${time}${reset} ${blue}[${label}]${reset}`;

    const color = type === 'success' ? green : type === 'error' ? red : reset;
    const icon = type === 'success' ? '✔️' : type === 'error' ? '❌' : '';
    console[type === 'error' ? 'error' : 'log'](`${prefix} ${color}${icon} ${message}${reset}`);
};