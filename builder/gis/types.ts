export interface SpcaItem {
  sn: number, // 번호
  ccbaAdmin: string; // 관리 주체
  ccbaAsdt: number; // 지정 일자
  ccbaMnm: string; // 이름
  ccceName: string; // 시대명
  ccmaName: string, // 지정 등급
  cnX: string, // X 좌표 (UTM-K)
  cnY: string, // Y 좌표 (UTM-K)
  crltsnoNm: string, // 지정 번호
  ctgrname: string, // 유형 명칭
  vlocName: string, // 소재지 명칭
}
