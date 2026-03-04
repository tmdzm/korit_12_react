import HeaderText from "./HeaderText";

export default function Drink(props){
  return (
    <>
      <h1>
        Would you like to drink some {props.drink}?
      </h1>
      <HeaderText text='추가 텍스트' />
    </>
  )
}