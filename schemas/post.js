const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true, // 필수 정보라는 의미
        },
        password: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,   // 자동으로 타임 스탬프 생성. createdAt
        versionKey : false, // 버전 정보는 만들지 않음. _v
                            // id는 몽고DB에서 자동 생성하는 것을 이용한다.
    }
);

module.exports = mongoose.model('Post', postSchema);