import {HelloProps} from './types.ts'

export default function HelloComponent({name,age} : HelloProps){

  return (
    <h1>
      안녕하세요, {name} 님. 당신은 올해 {age}살이 되었습니다.
    </h1>
  )
}