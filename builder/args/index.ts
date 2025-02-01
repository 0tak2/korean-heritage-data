import { parseArgs } from "jsr:@std/cli/parse-args";
import { CouldStartTasks, Options } from "./types.ts";
import { getHeritageKindCodeFromRawValue, HeritageKindCode } from "../cha-api/types.ts";

const defaultOptions: Options = {
  outputDir: 'result',
  outputJsonFilename: 'dataset.json',
  shouldSaveImage: false,
  kindCode: undefined,
  shouldShowHelp: false,
}

function getOptions(args: string[]): Options {
  const flags = parseArgs(args, {
    boolean: ['save-image', 'help'],
    string: ['output-dir', 'output-json-filename', 'kind-code'],
  })

  if (args.length === 0) {
    console.log("🧐 아무 옵션도 지정하지 않으셨습니다. 기본 설정이 적용됩니댜.")
    console.log("help 옵션을 추가하면 도움말을 볼 수 있습니다.")
    console.log("> deno run main.ts --help")
    console.log()
  }

  return {
    outputDir: flags['output-dir'] ?? defaultOptions.outputDir,
    outputJsonFilename: flags['output-json-filename'] ?? defaultOptions.outputJsonFilename,
    shouldSaveImage: flags['save-image'],
    kindCode: getHeritageKindCodeFromRawValue(flags['kind-code']),
    shouldShowHelp: flags['help'],
  }
}

function showHelp() {
  const displayMessage = `✅ 패러미터 설명
--output-dir
아웃풋 디렉토리를 지정한다. 상대경로와 절대경로 모두 가능.
기본값: 'result' (현재 위치의 result 디렉토리에 아웃풋을 저장)
예시: --output-dir='/home/user/workspace/heritage-data'

--output-json-filename
데이터셋 파일 이름을 정한다. --output-dir로 지정한 경로 아래에 해당 이름으로 파일을 생성한다. 확장자를 따로 입력해줘야 한다. \`.json\`
기본값: 'dataset.json'
예시: --output-json-filename='heritage-dataset.json'

--kind-code
대상 지정 종목 코드를 지정한다. 지정하지 않으면 모두 조회한다.
11=국보, 12=보물, 13=사적, 14=사적및명승, 15=명승, 16=천연기념물, 17=국가무형유산, 18=국가민속문화유산, 21=시도유형문화유산,
22=시도무형유산, 23=시도기념물, 24=시도민속문화유산, 25=시도등록유산, 31=문화유산자료, 79=국가등록유산, 80=이북5도 무형유산
예시: --kind-code=11

--save-image
특정 항목에 대해 다운로드 가능한 이미지가 있다면 아웃풋 디렉토리에 다운로드 한다.
\`관리번호.확장자\` 형태로 이름을 부여한다.
기본값: false


✅ 실행 예시
deno run --allow-write --allow-read --allow-net main.ts --output-dir='../data/new' --output-json-filename='sajeok.json' --kind-code=13 --save-image

deno run --allow-write --allow-read --allow-net main.ts --output-dir='/home/user/data/11' --kind-code=11
`
  console.log(displayMessage)
}

async function showPrompt(options: Options): Promise<CouldStartTasks> {
  if (options.shouldShowHelp) {
    showHelp()
    return false
  }

  console.log('💬 입력 옵션 확인')
  console.log(`아웃풋 디렉토리: ${options.outputDir}`)
  console.log(`아웃풋 디렉토리 내 데이터셋 파일명: ${options.outputJsonFilename}`)
  console.log(`이미지 다운로드 여부: ${options.shouldSaveImage}`)
  console.log(`대상 지정 종목 코드: ${options.kindCode ?? '미지정'}`)
  console.log('\n진행하려면 y를 입력하세요: ')

  const decoder = new TextDecoder()
  for await (const chunk of Deno.stdin.readable) {
    const text = decoder.decode(chunk)
    if (text.trim().toLowerCase() === 'y') {
      return true
    }

    return false
  }

  return false
}

export { getOptions, showPrompt }
