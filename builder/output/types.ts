interface HeritageDataEntity {
  sn: number; // 순번 (일련번호)
  no: number; // 고유 키값
  ccmaName: string; // 국가유산종목 (예: 국보, 보물 등)
  ccbaMnm1: string; // 국가유산명 (국문)
  ccbaMnm2: string; // 국가유산명 (한자)
  ccbaCtcdNm: string; // 시도명 (예: 경상북도)
  ccsiName: string; // 시군구명 (예: 경주시)
  ccbaAdmin: string; // 관리자 (예: 불국사)
  ccbaKdcd: string; // 종목코드
  ccbaCtcd: string; // 시도코드
  ccbaAsno: string; // 관리번호
  ccbaCncl: boolean; // 지정해제 여부 (예: "N" -> 지정 유지, "Y" -> 지정 해제됨)
  ccbaCpno: string; // 국가유산연계번호
  longitude: number; // 경도 (0이면 위치 값 없음)
  latitude: number; // 위도 (0이면 위치 값 없음)
  regDt: Date; // 최종 수정 일시 (YYYY-MM-DD HH:mm:ss 형식)
  imageUrl: string | null; // 메인노출이미지URL
  content: string; // 내용
}

export type { HeritageDataEntity }
