//Contact.tsx

import { Link ,Outlet} from "react-router-dom";

export default function Contact(){

  return (
    <>
      <h3>Contact Component</h3>
      <nav>
        <Link to='seoul'>서울 지점</Link>{'  |  '}
        <Link to='busan'>부산 지점</Link> {/*호라이즌탈*/}
      </nav>
      <hr/> {/*호라이즌탈, 줄긋는것*/}
      <Outlet/>{/*아웃렛, 어디에 출력할래를 정해주는것*/}
    </>
  );
}