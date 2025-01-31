import ky from 'https://esm.sh/ky@1.7.4';
import { getDetail, getList } from "./cha-api/index.ts";
import { HeritageItem, HeritageKindCode } from "./cha-api/types.ts";
import { saveToJson, saveToBuffer } from "./output/index.ts";
import { sleep } from "./util/sleep.ts";

const TARGET_KIND_CODE: HeritageKindCode | undefined = HeritageKindCode.Bomul
const OUTPUT_DIR = 'result'
const OUTPUT_DATASET_FILE_NAME = 'dataset.json'
const errorItems: HeritageItem[] = []

async function main() {
  let pageNumber = 1
  
  while(true) {
    console.log(`[pageNumber=${pageNumber} start]`)

    const list = await getList({
      pageNumber: pageNumber,
      pageSize: 10,
      kindCode: TARGET_KIND_CODE
    })

    if (list.length === 0) {
      break
    }

    for (const item of list) {
      await handleItem(item)
    }

    console.log(`[pageNumber=${pageNumber} finished]`)

    await sleep(1000)
    pageNumber++
  }

  console.info('\n모든 작업을 완료했습니다.')
  console.info('실패한 항목:')
  errorItems.forEach((i) => {
    console.log(i)
  })
}

async function handleItem(item: HeritageItem) {
  try {
    const detail = await getDetail(item.ccbaKdcd, item.ccbaAsno, item.ccbaCtcd)
    
    console.log(`${item.ccbaMnm1} (${item.ccbaAsno}) 항목의 세부 데이터를 서버로부터 잘 조회했습니다.`)

    await saveToJson({
      ...item,
      imageUrl: detail.imageUrl,
      content: detail.content,
    }, `${OUTPUT_DIR}/${OUTPUT_DATASET_FILE_NAME}`)

    console.log(`${item.ccbaMnm1} (${item.ccbaAsno}) 항목의 데이터를 JSON에 잘 추가했습니다.`)
    
    if (detail.imageUrl !== null) {
      const imageBuffer = await ky.get(detail.imageUrl).arrayBuffer()
      const ext = detail.imageUrl.split('.')[detail.imageUrl.split('.').length - 1]
      await saveToBuffer(imageBuffer, `${OUTPUT_DIR}/${item.ccbaAsno}.${ext}`)
      console.log(`${item.ccbaMnm1} (${item.ccbaAsno}) 항목의 이미지를 잘 저장했습니다.`)
    } else {
      console.log(`${item.ccbaMnm1} (${item.ccbaAsno}) 항목에는 이미지가 존재하지 않아 건너뜁니다`)
    }

  } catch(e) {
    console.error(`error... title=${item.ccbaMnm1} ccbaAsno=${item.ccbaAsno} ${e}`)
    errorItems.push(item)
  }
}

main()
