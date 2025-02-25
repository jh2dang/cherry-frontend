
# 🍒 나만의 ${\large{\color{#ef4444}체}}$크 ${\large{\color{#ef4444}리}}$스트: Cherry


**[할 일 목록을 관리하는 TO-DO 리스트 웹 애플리케이션, Cherry 바로가기](http://jh2dev.site/)**
<br/>
```
회원가입이 불편하신 분들은 테스트 계정을 사용해 주세요! 이름: test / 메일: test
```
<br/>
<br/>
<img src="https://github.com/user-attachments/assets/b490a156-9938-4fc9-8e77-b637e70bfd71"  width="200" height="400"/>
<img src="https://github.com/user-attachments/assets/46a03879-f180-43f7-a703-9826b50f981d"  width="200" height="400"/>
<img src="https://github.com/user-attachments/assets/f40050ee-5e8b-47b4-81e5-f5310214730e"  width="200" height="400"/>
<br/>
<br/>
<br/>
<br/>

## 🎯 **기능 소개**

- 📝 **할 일 추가**: 제목과 설명을 입력하여 새로운 할 일을 등록할 수 있습니다.
- ✅ **할 일 체크**: 완료된 항목을 체크하면 회색으로 처리되며 리스트의 하단으로 이동합니다.
- 📌 **우선순위 설정**: `높음`, `중간`, `낮음` 우선순위를 설정하여 정렬할 수 있습니다.
- 🔍 **검색 기능**: 할 일 목록에서 제목과 설명을 검색할 수 있습니다.
- ✏️ **할 일 수정**: 기존 할 일의 제목을 수정할 수 있습니다.
- ❌ **할 일 삭제**: 더 이상 필요하지 않은 항목을 삭제할 수 있습니다.
<br/>
<br/>

## 📁 **폴더 구조**
```
src/  
│── apis/                # API 요청 함수  
│── assets/              # 이미지 정적 파일  
│── components/
│   │── blocks/          # 페이지 내에서 사용되는 블록 컴포넌트  
│   │── pages/           # 주요 페이지 컴포넌트
│   │── ui/              # shadcn/ui
│── routes/
│   │── App.jsx          # 라우트 관리  
│   │── PrivateRoutes.jsx # 로그인이 필요한 라우트 관리  
│── store/               # Zustand 상태관리
│── index.css            # 전역 스타일  
│── main.jsx
│── .gitignore
│── package.json 
│── README.md

```
<br/>
<br/>

## 🛠 **기술 스택**
- **Frontend**: React, TailwindCSS, shadcn/ui, Zustand, Vite
- **Backend**: FastAPI [API명세 바로가기](http://3.27.168.60:8000/docs#/)
- **Database**: MySQL
<br/>
<br/>

## 📌 **구동 방법**
> 프론트엔드와 백엔드는 이미 배포되어 있으므로, [여기](http://jh2dev.site/)에서 Cherry를 사용할 수 있습니다.

> 로컬 환경에서의 구동 방법은 다음과 같습니다.
```
1️⃣ 프로젝트 클론
git clone https://github.com/jh2dang/cherry-frontend.git
cd cherry-frontend

2️⃣ 패키지 설치
npm install

3️⃣ 개발 서버 실행
npm run dev
```
