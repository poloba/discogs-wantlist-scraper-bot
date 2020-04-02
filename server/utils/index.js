export const toNumDate = (any) => any.replace(/[[^0-9]]/, '').replace(/["']/g, '');
export const toStr = (any) => {
    if (any === 0) {
        return '0';
    }
    if (!any) {
        return '';
    }
    return String(any);
};
export const toNum = (any) => Number(any) || 0;
