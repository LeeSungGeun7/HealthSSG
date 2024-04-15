import { useRecoilState } from 'recoil';
import { slideAtom } from '@/states/slideAtom';

interface DotProps {
    currentPage : Number ,
    num : Number | null

}


const Dot = ({ num, currentPage }:DotProps) => {
    const [page , setPage] = useRecoilState(slideAtom);
    return (
      <div
        onClick={() => 
          
          {if (num !== null) setPage(num.valueOf())}}
        style={{
          width: 10,
          height: 10,
          border: "1px solid black",
          borderRadius: 999,
          backgroundColor: currentPage === num ? "black" : "transparent",
          //transitionDuration: 1000,
          transition: "background-color 0.5s",
        }}
      ></div>
    );
  };
  
  const Dots = ({currentPage }:DotProps) => {
    return (
      <div style={{ zIndex:100,position: "fixed", top: "50%", right: 60 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: 20,
            height: 100,
          }}
        >
          <Dot  num={1} currentPage={currentPage}></Dot>
          <Dot  num={2} currentPage={currentPage}></Dot>
          <Dot  num={3} currentPage={currentPage}></Dot>
          <Dot  num={4} currentPage={currentPage}></Dot>
          <Dot  num={5} currentPage={currentPage}></Dot>
        </div>
      </div>
    );
  };
  
  export default Dots;