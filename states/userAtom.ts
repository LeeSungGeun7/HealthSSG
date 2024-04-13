import { atom } from 'recoil';

export interface User {
  id: number ;
  email: string;
  username: string | null;
  role: string; // 실제 데이터베이스에서 사용하는 타입으로 수정
  phone: string | null;
  post: string | null;
  profile: string | null;
  createdAt: Date;
  updatedAt: Date; 
}

export const userAtom = atom<User | null>({
  key: 'userAtom',
  default: null,
});