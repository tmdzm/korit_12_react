// 타입만 선언
export type CarResponse = {
  brand : string;
  model : string;
  color : string;
  registrationNumber: string;
  modelYear: number;
  price: number;
  _links: {
    self: {
      href: string;
    }, car: {
      href: string;
    },
    owner: {
      href: string;
    }
  }
}
//request일땐 id가 아직 없지만, response에선 존재한다.
//백엔드에서 리퀘 , 리스폰스 2개 프론트엔드에서 2개, 엔티티 1개, 총 타입이 5개가 튀어 나올 수 있다.