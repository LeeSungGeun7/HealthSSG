import { NextApiRequest, NextApiResponse } from 'next';



export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message , socket} = req.body;

    // 서버 측 Socket.IO 인스턴스 가져오기
    const io = socket.server.io ;

    // 클라이언트로 메시지 전송
    io.emit('message2', message);

    res.status(200).json({ message: 'Message sent' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// Socket.IO 서버 인스턴스를 미들웨어로 사용
export const config = {
  api: {
    bodyParser: false,
  },
};