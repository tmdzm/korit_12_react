export default function MyForm() {
  const handleSubmit = (event) =>{
    event.preventDefault();//기본 동작 방지 -> 새창이 안나오게한다
    //form 제출이라는 기본동작을 막았다.
    alert("Form Submit"); //
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='username'/><br />
      <input type="submit" value='제출'/>
    </form>
  );
}