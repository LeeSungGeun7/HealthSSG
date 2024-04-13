import {useRouter} from 'next/navigation'
import React from 'react'



function Div(props:any) {
  const route = useRouter()
  
    const handleRoute = (e:any) => {
      if (e == "Home") {
        route.push('/')
      }
      else route.push(`/${e}`)
  }
  // return (

  //    <div className={'m-5 text-2xl  font-bold'}> {props.name} </div>

  // )
   // 여기서 'name'은 항목의 이름, 'number'는 현재 활성 상태
   const isActive = props.name === 'Home' && props.number === 1 ||
   props.name === 'Chat' && props.number === 2 ||
   props.name === 'Post' && props.number === 3 ||
   props.name === 'Contact' && props.number === 4;

return (
<div onClick={()=>{handleRoute(props.name)}} className={`${isActive ? 'text-blue-500' : 'text-black'} m-5 text-2xl  font-bold`}>
{props.name}
</div>
);
  
}

export default Div