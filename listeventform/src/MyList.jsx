

export default function MyList() {
  const data = [1,2,3,4,5]

  return(
    <ul>
      {
        data.map((elem,index) => 
          <li key={index}>List Item : {elem*2}</li> // key = {index} 는 고유한 값이어야 한다. index는 고유한 값이 아니므로 권장되지 않음
        )
      }
    </ul>
  )

}