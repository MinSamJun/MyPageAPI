const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId, // 포스트 아이디의 타입을 지정한다.
            ref: 'Post',  // post에서는 id를 mongoDB에서 자동 생성하지만, 이제는 생성된 것을 가져와야하기 때문이다.
        },
        user: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey : false,
    }
);

module.exports = mongoose.model('Commnet', commentSchema);