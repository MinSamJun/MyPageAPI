const express = require('express'); // express 호출
const connect = require('./schemas'); // 스키마랑 연결
// 스키마 : 어떤 데이터들이 어떻게 저장될지를 정하는 것
// 데이터의 타입 등등
const routes = require('./routes'); // 루트랑 연결

const app = express(); // 익스프레스 가져오기
const port = 3000;     // 익스프레스를 가져오기 위한 포트 번호

connect();

app.use(express.json());

app.use('/api', routes); // /api 패스 로 라우터 가져오기

app.listen(port, () => { // 3000 번 포트로 앱을 열기
    console.log(port, '서버가 실행되었습니다.');
});