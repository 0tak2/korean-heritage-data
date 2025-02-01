import ky, { SearchParamsOption } from 'https://esm.sh/ky@1.7.4';
import { parse as parseXml } from "jsr:@libs/xml";
import { HeritageDetailResponse, HeritageItem, HeritageItemResponse, HeritageKindCode, HeritageSearchListResponse, HeritageSearchRequestOptions } from "./types.ts";
import { parseKSTDate } from "../util/data.ts";
import { HeritageDetailItem } from "./types.ts";

const BASE_PATH = 'http://www.khs.go.kr/cha'

async function getList(options: HeritageSearchRequestOptions): Promise<HeritageItem[]> {
  const {pageSize, pageNumber, kindCode} = options

  const searchParams: SearchParamsOption = {
    pageUnit: pageSize,
    pageIndex: pageNumber,
  }

  if (kindCode !== undefined) {
    searchParams.ccbaKdcd = kindCode
  }

  const response = await ky.get(`${BASE_PATH}/SearchKindOpenapiList.do`, { searchParams }).text()

  const obj = parseXml(response) as HeritageSearchListResponse

  const itemRaw: [HeritageItemResponse] | undefined = obj.result.item

  if (itemRaw === undefined) {
    return []
  }

  return itemRaw.map((i: HeritageItemResponse) => {
    return {
      ...i,
      sn: parseInt(i.sn),
      no: parseInt(i.no),
      ccbaCncl: i.ccbaCncl === 'Y',
      longitude: parseFloat(i.longitude),
      latitude: parseFloat(i.latitude),
      regDt: parseKSTDate(i.regDt),
    }
  })
}

async function getDetail(kindCode: HeritageKindCode, assetNumber: string, cityCode: string): Promise<HeritageDetailItem> {
  const response = await ky.get(`${BASE_PATH}/SearchKindOpenapiDt.do`, {
    searchParams: {
      ccbaKdcd: kindCode,
      ccbaAsno: assetNumber,
      ccbaCtcd: cityCode,
    }
  }).text()

  const obj = parseXml(response) as HeritageDetailResponse

  return obj.result.item
}

export { getList, getDetail }
