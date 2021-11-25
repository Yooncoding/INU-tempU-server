# 오늘의 기분 for INU

![logo](https://user-images.githubusercontent.com/63987872/142992813-364c5b7f-a471-4609-af5b-9153b71221d1.png)

- 어플 'MOODA', '하루콩'과 같이 오늘 하루 어떤 감정을 느꼈는가? 또한 그 감정을 느낀 이유는 무엇이었는지 온도로 표현해서 기록하는 어플
- 재미요소를 위해 인천대학우들의 오늘의 온도 평균을 표시하며 매일 베팅을 하여 오차범위 ±2°C이내로 포인트 지급
- 어플의 UI는 카카오 오븐으로 제작하여 프론트엔드 부분은 생략하고 백엔드에 초점을 맞춰 백엔드 개발만 진행

### **✅ 사용 기술 및 개발 환경**

Node.js, express, Visual Studio Code, MySQL, Sequelize, AWS ec2, Post man

### **✅ 프로젝트 정리**

[오늘의 기분 for INU Wiki](https://github.com/Yooncoding/INU-tempU-server/wiki)

### **✅ 실행**

깃허브 클론을 진행합니다.

```bash
git clone https://github.com/Yooncoding/INU-tempU-server.git
```

모듈을 설치합니다.

```bash
npm install
```

환경 변수를 셋팅합니다.

```bash
# .env
PORT =
DB_HOST =
DB_USER =
DB_PASSWORD =
DB_DATABASE =

JWT_SECRET =

LOGIN_METHOD =
LOGIN_URL =
LOGIN_CONTENT_TYPE =
```

서버를 개발 스크립트로 실행합니다.

```bash
npm run dev
```
