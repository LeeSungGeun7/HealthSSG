<!-- 
<img src="https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/cf2e53f7-c592-420f-560a-a6ed19070300/public">




- Next.js 14 
- React 
- Typescript

CSS 
-Tailwindcss 

Animaition
-Framer.motion

Icon
-React Icon 

DB
-Prisma mysql

라이브러리 
dash
Socket.io




적용된 기술 
디바운스 ,  스로틀링 
좋아요 버튼 스토틀링 적용 -> 서버 부하 감소 

스크롤에 따라 애니메이션 적용하기 
풀페이지 스크롤 전환 

Grid , Flex 에 따른 웹,모바일 반응형 

useEffect 언마운트 활용
주요 페이지 에서 다른페이지 이동시 
스크롤 위치를 로컬스토리지에 저장하여
이동했던 페이지 에서 뒤로가기시 저장되었던 스크롤 위치를 복구
사용자 경험증가 


주요기능 -
게시판 , 채팅 , 메인페이지소개

상태관리 
Recoil 라이브러리 사용 




문제1 -
무한스크롤 상세페이지 들어가고나서 이전페이지 복귀후 스크롤 위치 저장 
해결 방법 -> 데이터를 로컬스토리지에 저장하고 스크롤위치를 저장한후 이전페이지 복귀시 원래있던데로 
페이지로드가능 


문제2 부모 함수를 자식 -> 자식 에게 전달하면서 프랍스드릴링발생 
프랍스드릴링 -> Recoil 전역상태관리로 해결 


문제3 - 서버사이드에서 로컬스토리지 사용안됨
CSR과 SSR의 차이로 인한 에러!
Next.js는 client-side 렌더를 하기전에 server-side 렌더를 수행한다.
Next.js에서 제공하는 Server Side Rendering(SSR)에선 client-side에 존재하는 window, document 전역객체를 사용할 수 없다.
그래서 console.log(localStorage)만 코드에 써두고 실행시켜도

ReferenceError: localStorage is not defined
라는 에러가 나온다.

문제4 - 카카오 DEV 세팅 시크릿 활성화
next-auth 카카오프로바이더 
약 한달간 프로젝트 진행하면서 
잘되던 카카오로그인이 안되어서 
카카오 DEV 세팅 시크릿 활성화를 해서 문제해결함
시크릿을 활성화하면 시크릿코드 인가코드로 넘겨 토큰을 반환받음 

SEO 최적화 
SSR 
SSG
ISR


진행상황 

메인페이지 80 
포스트 생성 / 삭제X / 수정X
포스트 상세페이지 / 댓글 / 댓글삭제 / 댓글수정X
유저프로필 수정 / 닉네임 or 사진 한가지만 변경X



배포시 마주한 에러 -

No duplicate props allowed - props를 중복해서 사용한경우 

Component definition is missing display name - 컴포넌트화 시키지 않은
DeleteButton.displayName = 'DeleteButton'; 명시해서 해결  -->



<img src="https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/cf2e53f7-c592-420f-560a-a6ed19070300/public">


**배포주소** https://myport.site/

**구현기능**
<br>
카카오로그인 , 게시물 작성 , 댓글작성





**주요 라이브러리**

전역 상태관리  Recoil 사용 
<br>
Framer-motion 애니메이션  사용
<br>
next-auth 인증 사용 


