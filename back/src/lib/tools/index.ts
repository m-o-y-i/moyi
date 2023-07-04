import bcrypt from 'bcryptjs';

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

// 生成密码的哈希值
export const getBcryptPassWord = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (!err) {
                    resolve(hash);
                } else {
                    reject(err);
                }
            });
        });
    });
};