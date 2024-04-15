'use client';

import { RecoilRoot } from 'recoil';
import { ReactNode } from 'react';
import Header from './Header';
import SideBar from './SideBar/SideBar';
import { SessionProvider } from 'next-auth/react';

const RecoilRootWrapper = ({ children }: { children: ReactNode }) => (
    <SessionProvider>
        <RecoilRoot>
        <Header/>
        <SideBar/>
     {children}
     </RecoilRoot>
     </SessionProvider>
);

export default RecoilRootWrapper;