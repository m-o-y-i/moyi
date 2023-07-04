
export const setCustomEncryption = (str: string) => {
    let transformedStr = ''
    const reversedStr = str.split("").reverse().join("");
    for (let i = 0; i < reversedStr.length; i++) {
        transformedStr += `${reversedStr.charCodeAt(i)},`;
    }
    return transformedStr
}

export const getCustomEncryption = (str: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reversedStr = str.split(",");
        let transformedStr = "";

        reversedStr.forEach((item) => {
            const charCode = Number(item);
            transformedStr += String.fromCharCode(charCode);
        });

        const finalStr = transformedStr.split("").reverse().join("");
        resolve(finalStr);
    });
};
