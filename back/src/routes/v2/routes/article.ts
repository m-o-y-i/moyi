import { Request, Response, Router } from 'express';
import client from '../../../mongoDB'

const router = Router();

router.get('/article_list', async (req: Request, res: Response) => {
    await client.connect()
    try {
        const article = client.db("article").collection("article")
        const data = await article.find({}).toArray();
        res.status(200).json({ code: 200, status: true, data, message: 'success' })
    } catch (error) {
        res.status(200).json({ code: 200, status: false, message: error })
    }
    finally {
        // 关闭数据库连接
        await client.close();
    }
});

router.post('/article_detail', async (req: Request, res: Response) => {
    await client.connect()
    try {
        const { id } = req.body
        const article = client.db("article").collection("article")
        const data = await article.findOne({ _id: id })
        res.status(200).json({ code: 200, status: true, data, message: 'success' })
    } catch (error) {
        res.status(200).json({ code: 200, status: false, message: error })
    }
    finally {
        // 关闭数据库连接
        await client.close();
    }
});

export { router as articleRouter };
