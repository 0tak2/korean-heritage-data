import ky from 'https://esm.sh/ky@1.7.4';
import { getDetail, getList } from "./cha-api/index.ts";
import { HeritageItem, HeritageKindCode } from "./cha-api/types.ts";
import { saveToJson, saveToBuffer, checkDirectory } from "./output/index.ts";
import { sleep } from "./util/sleep.ts";
import { getOptions, showPrompt } from "./args/index.ts";
import { Options } from "./args/types.ts";

async function main() {
  const options = getOptions(Deno.args)
  const errorItems: HeritageItem[] = [] // 실패한 항목들을 보관

  const couldStart = await showPrompt(options)
  if (!couldStart) {
    Deno.exit(1)
  }
  
  try {
    await checkDirectory(options.outputDir)
  } catch (e) {
    console.error(`아웃풋 디렉토리를 검사하는 중 예외가 발생했습니다. ${e}`)
  }

  let pageNumber = 1
  
  while(true) {
    console.log(`[pageNumber=${pageNumber} start]`)

    const list = await getList({
      pageNumber: pageNumber,
      pageSize: 10,
      kindCode: options.kindCode
    })

    if (list.length === 0) {
      break
    }

    for (const item of list) {
      await handleItem({ item, options, errorItems })
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

async function handleItem({ item, options, errorItems }: {
  item: HeritageItem,
  options: Options,
  errorItems: HeritageItem[],
}) {
  try {
    const detail = await getDetail(item.ccbaKdcd, item.ccbaAsno, item.ccbaCtcd)
    
    console.log(`${item.ccbaMnm1} (${item.ccbaAsno}) 항목의 세부 데이터를 서버로부터 잘 조회했습니다.`)

    await saveToJson({
      ...item,
      imageUrl: detail.imageUrl,
      content: detail.content,
    }, `${options.outputDir}/${options.outputJsonFilename}`)

    console.log(`${item.ccbaMnm1} (${item.ccbaAsno}) 항목의 데이터를 JSON에 잘 추가했습니다.`)
    
    if (!options.shouldSaveImage) {
      return
    }

    if (detail.imageUrl !== null) {
      const imageBuffer = await ky.get(detail.imageUrl).arrayBuffer()
      const ext = detail.imageUrl.split('.')[detail.imageUrl.split('.').length - 1]
      await saveToBuffer(imageBuffer, `${options.outputDir}/${item.ccbaAsno}.${ext}`)
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
