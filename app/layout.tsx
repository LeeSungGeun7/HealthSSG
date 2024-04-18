// "use client"
// import { Inter } from "next/font/google";
// import { SessionProvider, signOut} from "next-auth/react"
// import "./globals.css";
// import Header from "@/components/Header";
// import SideBar from "@/components/SideBar/SideBar";
// import { RecoilRoot, useRecoilState } from "recoil";
// import Modal from "@/components/Modal/Modal";
// import { useEffect, useState } from "react";
// import { KakaoLogout } from "@/actions/KaKaoLogout";
// import { Metadata } from "next";





// const inter = Inter({ subsets: ["latin"] });

// declare global {
//   interface Window {
//     naver:any;
//     Kakao:any; // 나중에 설명할 카카오 로그인을 위해 이 부분도 추가해주세요!
//   }
// }


// export const metadata: Metadata = {
//   title: "이성근 , Frontend Developer",
//   description: "이성근 프론트엔드 개발자의 블로그, Frontend Developer",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [isModalOpen , setIsModalOpen] = useState(false);
//   const [ACCESS_TOKEN , setACCESS_TOKEN] = useState(typeof window !== 'undefined' ? localStorage.getItem("access_token") : 0);

//   useEffect(()=> {
//     if (typeof window ! == 'undefined') {
//       setACCESS_TOKEN(localStorage.getItem("access_token")); 
      
//     }
//   },[])
  
//   return (
//     <SessionProvider >
//       <RecoilRoot>
//     <html lang="en">

//       <body className={inter.className}>
//       <Header setIsModalOpen={setIsModalOpen} />
//         <SideBar/>
//         {children}

//         <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onClick={
//           async ()=>{
//             const res= await KakaoLogout(ACCESS_TOKEN)
//             if (res) {
//               localStorage.removeItem('access_token');
//               setIsModalOpen(false);
              
//             }
//           }}
//           >로그아웃 하시겠습니까?</Modal>

//         </body>
        
//     </html>
//     </RecoilRoot>
//     </SessionProvider>
//   );
// }



import { Inter } from "next/font/google";

import "./globals.css";


import { Metadata } from "next";

import RecoilRootWrapper from "@/components/RecoilRootWrapper";
import Head from "next/head";







const inter = Inter({ subsets: ["latin"] });

declare global {
  interface Window {
    naver:any;
    Kakao:any; // 나중에 설명할 카카오 로그인을 위해 이 부분도 추가해주세요!
  }
}


export const metadata: Metadata = {
  title: "이성근 , Frontend Developer",
  description: "이성근 프론트엔드 개발자의 블로그, Frontend Developer",
  icons:{
    icon:'/logo.ico'
  },
  verification: {
    google: "google-site-verification=XeYNgCCAdlB7S_QFDNsj0P0CFsnnU8yRw52RVF8CCaU"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  
  
  return (
    //  <SessionProvider >
      <>
      <meta name="naver-site-verification" content="a654ebea498ce63dd21f867a77d0a6735bdb2301" />
      {/* <Head>
			<title>이성근 프론트엔드 개발자</title>
		</Head> */}
    <html lang="en">
      <body className={inter.className}>
      {/* <Header/>
        <SideBar/> */}
        <RecoilRootWrapper>
        {children}
        </RecoilRootWrapper>
        </body>

    </html>

   {/* </SessionProvider> */}
   </>
  );

}


