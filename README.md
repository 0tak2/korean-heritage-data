# 한국 문화유산 데이터셋

- 목적: 문화유산 정보를 오프라인에서도 활용가능한 데이터셋으로 구축. 간단한 이미지와 공간 정보를 포함.
- 최종 업데이트: 2025-01-31

## 마일스톤

- 1단계 (진행중)
  - [x] [국가유산청 OpenAPI](https://www.cha.go.kr/html/HtmlPage.do?pg=/publicinfo/pbinfo3_0201.jsp&mn=NS_04_04_03) 등을 활용해 국보, 보물로 지정된 국가유산에 대한 JSON 데이터셋 정리.
  - [] 문화유산 영문 명칭 수록
- N단계
  - 시도등록문화유산 포함

## 데이터 활용

[/data 디렉토리](./data/) 확인

## 직접 데이터 다운로드

1. deno 설치
2. /data-builder 디렉토리 이동 후 main.ts 상단 옵션을 필요에 따라 수정
3. main.ts 실행
4. /data-builder/result 디렉토리 확인

## 저작권

(c) 대한민국 국가유산청, 2025  
(c) Korea Heritage Service, 2025

- OpenAPI 데이터에 대한 저작권 정책이 명확하지 않아 대외적/영리적 활용 시 기관 확인 필요
