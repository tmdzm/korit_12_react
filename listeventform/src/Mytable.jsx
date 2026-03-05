

export default function MyTable() {
  const data = [
    {id : 1, brand : '현대' , model:'그랜저'},
    {id : 2, brand : '기아' , model:'셀토스'},
    {id : 3, brand : '람보르기니' , model:'우라칸'}
  ];
  return(
    <>
      <table>
        <tbody>
          {
            data.map((car) => <tr key={car.id}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
            </tr>)//두 줄 이상이면 중괄호로 감싸야 하지만, enter가 기준인 것은 아니다.
            //이 경우 코드는 한줄로 읽는다.
            //중괄호를 쓰게되면 리턴을 따로 명싱해야한다.
          }
        </tbody>
      </table>
    </>
  )
}