

export const useFormatStringForId = (str) => {
    let regex = /[\u0000-\u002F\u003A-\u0040\u005B-\u0060\u007B-\uFFFF]/gu;
    let newStr = str.replace(regex, '');
    return newStr;
}
