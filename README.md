# 한국 문화유산 데이터셋

- 목적: 문화유산 정보를 오프라인에서도 활용가능한 데이터셋으로 구축. 간단한 이미지와 공간 정보를 포함.
- 최종 업데이트: 2025-01-31

## 마일스톤

- 1단계 (진행중)
  - [x] [국가유산청 OpenAPI](https://www.cha.go.kr/html/HtmlPage.do?pg=/publicinfo/pbinfo3_0201.jsp&mn=NS_04_04_03) 등을 활용해 국보, 보물로 지정된 국가유산에 대한 JSON 데이터셋 정리.
  - [ ] 문화유산 영문 명칭 수록
- N단계
  - 시도등록문화유산 포함

## 데이터 활용

[/data 디렉토리](./data/) 확인

## 직접 데이터 다운로드

1. deno 설치
2. builder 디렉토리의 main.ts 실행

  ```sh
  > cd builder
  > deno run --allow-write --allow-read --allow-net main.ts

  # 도움말 (옵션 확인)
  # deno run main.ts --help
  ```

## 저작권

- 국가유산청 OpenAPI를 통해 수집한 메타데이터는 공공데이터 1유형을 따르며, 그 외 링크로 포함된 이미지의 경우 공공누리 1~4 유형을 따름 (민원 확인)
- 이미지에 대한 저작권 정책은 개별 항목 별로 [국가유산포털](https://www.heritage.go.kr/)에서 직접 확인
- [국가유산청 저작권 정책](https://www.khs.go.kr/html/HtmlPage.do?pg=/guide/copyright.jsp&mn=NS_08_03)
