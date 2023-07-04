import bcrypt from 'bcryptjs';

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