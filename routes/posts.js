const express = require('express');
const router = express.Router();
const Post = require('../schemas/post');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

router
    .route('/') // 패스 구분
    .get(async (req, res) => { //         .정렬    필드명   내림차순
        const result = await Post.find({}).sort({ createdAt: -1 });
        res.send(result.map(r => {
            return {
                postId: r._id,
                user: r.user,
                title: r.title,
                createdAt: r.createdAt,
            }
        }));
    })
    .post(async (req, res) => {
        const { user, password, title, content } = req.body;

        if (!user || !password || !title || !content) { // 필수 정보중 하나라도 없다면?
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' }); // 에러출력
        } else {
            await Post.create({ user, password, title, content });
      
            res.status(200).json({massage: "게시글을 생성하였습니다."});
        }
    });


router
    .route('/:id')
    .get(async (req, res) => {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) { // id 값의 형태가 ObjectID (mongoDB의 자체 데이터 타입)이 아니라면
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' }); // 경고를 내보낸다.
        } else {
            const result = await Post.findOne({ _id: id });

            if (result) {
                res.send({
                    postId: result._id,
                    user: result.user,
                    title: result.title,
                    content: result.content,
                    createdAt: result.createdAt,
                });
            } else {
                res.status(400).json({ message: '게시글 조회에 실패하였습니다.' });
            }
        }
    })
    .put(async (req, res) => {
        const { id } = req.params;
        const { user, content, password, title } = req.body;

        if (!ObjectId.isValid(id) || !user || !password || !title || !content) { // 필수 데이터를 모두 보내야한다.
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
        } else {
            const post = await Post.findOne({ _id: id });

            if(!post) {
                res.status(400).json({ message: '게시글 조회에 실패하였습니다.' }); // 게시글 id를 확인한다.
            } else {                                                              // ↓
                if(post.password === password) {                                  // id값과 비밀번호가 일치하는지 확인한다.
                    await Post.updateOne({ _id: id }, { user, content, title });
                    res.status(200).json({ message: "게시글을 수정하였습니다."});
                } else {
                    res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
                }
            }
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        const { password } = req.body;

        if (!ObjectId.isValid(id) || !password) {                               // 입력 받은 데이터가 적절한지 검증
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
        } else {
            const post = await Post.findOne({ _id: id });

            if(!post) {                                                          // 올바른 게시글 id인지 확인
                res.status(400).json({ message: '게시글 조회에 실패하였습니다.' });
            } else {
                if(post.password === password) {                                 // 비밀번호 확인
                    await Post.deleteOne({ _id: id });
                    res.status(200).json({message: "게시글을 삭제하였습니다."});
                } else {
                    res.status(400).json({message: '비밀번호가 일치하지 않습니다.'})
                }
            }
        }
    });

module.exports = router;