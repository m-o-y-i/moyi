import { Request, Response, Router } from 'express';
import client from '../../../mongoDB'
import { nanoid } from 'nanoid';

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

router.post('/write_article_detail', async (req: Request, res: Response) => {
    await client.connect()
    try {
        const { title, describe, content } = req.body
        const article = client.db("article").collection("article")
        const _id = nanoid();
        await article.insertOne({ _id, title, describe, content })
        res.status(200).json({ code: 200, status: true, message: 'success' })
    } catch (error) {
        res.status(200).json({ code: 200, status: false, message: error })
    }
    finally {
        // 关闭数据库连接
        await client.close();
    }
});

export { router as articleRouter };
