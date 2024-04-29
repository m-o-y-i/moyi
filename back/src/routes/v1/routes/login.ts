import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import client from '../../../mongoDB'
import { getCustomEncryption } from '../../../lib/tools';

const router = Router();

// 登录
router.post('/login', async (req: Request, res: Response) => {
    await client.connect()
    try {
        const { userName } = req.body
        const users = client.db("moyi").collection("users")
        const inquire = await users.findOne({ userName })
        // 解析自定义加密
        getCustomEncryption(req.body.passWord.slice(0, req.body.passWord.length - 2)).then((passWord) => {
            if (inquire) {
                // 对比bcrypt加密
                bcrypt.compare(passWord, inquire.passWord, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        // 进行登录或其他操作
                        res.status(200).json({
                            code: 200,
                            status: true,
                            message: '登录成功'
                        })
                    } else {
                        // 返回密码错误的提示信息
                        res.status(200).json({
                            code: 200,
                            status: false,
                            message: '密码不正确'
                        })
                    }
                });
            } else {
                res.status(200).json({
                    code: 200,
                    status: false,
                    message: '用户名不存在,请先注册或者联系管理员'
                })
            }
        })
    } finally {
        // 关闭数据库连接
        await client.close();
    }
});

export { router as loginRouter };
