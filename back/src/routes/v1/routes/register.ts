import { Request, Response, Router } from 'express';
import client from '../../../mongoDB'
import { getBcryptPassWord, getCustomEncryption } from '../../../lib/tools';

const router = Router();

// 注册
router.post('/register', async (req: Request, res: Response) => {
    await client.connect()
    try {
        await client.connect();
        const { userName } = req.body;
        const users = client.db("moyi").collection("users");
        const inquire = await users.findOne({ userName });

        if (!inquire) {
            // 解析自定义加密
            const encryptedPassword = await getCustomEncryption(req.body.passWord.slice(0, req.body.passWord.length - 2));
            // 设置bcrypt加密
            const hashedPassword = await getBcryptPassWord(encryptedPassword);
            await users.insertOne({ userName, passWord: hashedPassword });
            return res.status(200).json({
                code: 200,
                status: true,
                message: '注册成功',
            });
        } else {
            return res.status(200).json({
                code: 200,
                status: false,
                message: '用户名已经存在'
            });
        }
    } catch (error) {
        return res.status(200).json({
            code: 200,
            status: false,
            message: '未知错误',
        });
    } finally {
        await client.close();
    }
});

export { router as registerRouter };


