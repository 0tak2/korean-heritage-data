import { xml_document } from "jsr:@libs/xml/parse";

interface HeritageSearchRequestOptions {
  pageSize: number,
  pageNumber: number,
  kindCode?: HeritageKindCode,
  // TODO: 조회 조건을 늘리고 싶다면 여기에 추가하고 구현
}

interface HeritageItem {
  sn: number; // 순번 (일련번호)
  no: number; // 고유 키값
  ccmaName: string; // 국가유산종목 (예: 국보, 보물 등)
  ccbaMnm1: string; // 국가유산명 (국문)
  ccbaMnm2: string; // 국가유산명 (한자)
  ccbaCtcdNm: string; // 시도명 (예: 경상북도)
  ccsiName: string; // 시군구명 (예: 경주시)
  ccbaAdmin: string; // 관리자 (예: 불국사)
  ccbaKdcd: HeritageKindCode; // 종목코드
  ccbaCtcd: string; // 시도코드
  ccbaAsno: string; // 관리번호
  ccbaCncl: boolean; // 지정해제 여부 (예: "N" -> 지정 유지, "Y" -> 지정 해제됨)
  ccbaCpno: string; // 국가유산연계번호
  longitude: number; // 경도 (0이면 위치 값 없음)
  latitude: number; // 위도 (0이면 위치 값 없음)
  regDt: Date; // 최종 수정 일시 (YYYY-MM-DD HH:mm:ss 형식)
}

interface HeritageItemResponse {
  sn: string;
  no: string;
  ccmaName: string;
  ccbaMnm1: string;
  ccbaMnm2: string;
  ccbaCtcdNm: string;
  ccsiName: string;
  ccbaAdmin: string;
  ccbaKdcd: HeritageKindCode;
  ccbaCtcd: string;
  ccbaAsno: string;
  ccbaCncl: string;
  ccbaCpno: string;
  longitude: string;
  latitude: string;
  regDt: string;
}

interface HeritageSearchListResponse extends xml_document {
  result: {
    totalCnt: string,
    pageUnit: string,
    pageIndex: string,
    item: [HeritageItemResponse] 
  }
}

interface HeritageDetailItem {
  ccbaKdcd: HeritageKindCode; // 종목코드
  ccbaAsno: string; // 관리번호
  ccbaCtcd: string; // 시도코드
  ccbaCpno: string; // 국가유산연계번호
  longitude: string; // 경도 (0이면 위치 값 없음)
  latitude: string; // 위도 (0이면 위치 값 없음)
  ccmaName: string; // 국가유산종목
  gcodeName: string; // 국가유산분류
  bcodeName: string; // 국가유산분류2
  mcodeName: string; // 국가유산분류3
  scodeName: string; // 국가유산분류4
  ccbaQuan: string; // 수량
  ccbaAsdt: string; // 지
  ccbaLcad: string; // 소재지 상세
  ccceName: string; // 시대
  ccbaPoss: string; // 소유자
  ccbaAdmin: string; // 관리자
  imageUrl: string | null; // 메인노출이미지URL
  content: string; // 내용
}

interface HeritageDetailResponse extends xml_document {
  result: {
    ccbaKdcd: HeritageKindCode,
    ccbaAsno: string,
    ccbaCtcd: string,
    ccbaCpno: string,
    longitude: string,
    latitude: string,
    item: HeritageDetailItem,
  }
}

enum HeritageKindCode {
  Gukbo = '11',
  Bomul = '12',
  Sajeok = '13',
  SajeokMyeongseung = '14',
  Myeongseung = '15',
  CheonyeongGineomul = '16',
  GukgamuHyeongYuhansan = '17',
  GukgaMinjokMunhwaYuhansan = '18',
  SidoYuhyeongMunhwaYuhansan = '21',
  SidoMyeongYuhansan = '22',
  SidoGinyeomul = '23',
  SidoMinjokMunhwaYuhansan = '24',
  SidoDeungnokYuhansan = '25',
  MunhwaYuhansanJaryo = '31',
  GukgaDeungnokYuhansan = '79',
  Ibuk5doMyeongYuhansan = '80',
}

export type {
  HeritageSearchRequestOptions, HeritageItem, HeritageItemResponse, HeritageSearchListResponse,
  HeritageDetailItem, HeritageDetailResponse,
}

export { HeritageKindCode }
