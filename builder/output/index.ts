import { HeritageDataEntity } from "./types.ts";

async function saveToJson(item: HeritageDataEntity, filePath: string) {
  try {
    const obj = await getJson(filePath)
    if (Array.isArray(obj)) {
      const copied = [...obj]
      copied.push(item)
      await writeJson(filePath, copied)
    }
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      await writeJson(filePath, [])
      saveToJson(item, filePath)
    } else {
      console.error('unexpected error. ' + e)
    }
  }
}

async function getJson(filePath: string) {
  try {
    return JSON.parse(await Deno.readTextFile(filePath))
  } catch(e) {
    if (e instanceof Error) {
      console.error(filePath + ': '+ e.message)
    } else {
      console.error('unexpected error. ' + e)
    }

    throw e
  }
}

async function writeJson(filePath: string, obj: any) {
  try {
    await Deno.writeTextFile(filePath, JSON.stringify(obj, null, 2))
  } catch(e) {
    if (e instanceof Error) {
      console.error(filePath + ': '+ e.message)
    } else {
      console.error('unexpected error. ' + e)
    }

    throw e
  }
}

async function saveToBuffer(buffer: ArrayBuffer, filePath: string) {
  // ref: https://github.com/denoland/deno/issues/5626#issuecomment-1073197998
  try {
    await Deno.writeFile(filePath, new Uint8Array(buffer))
  } catch(e) {
    if (e instanceof Error) {
      console.error(`failed to save file... saveTo=${filePath} error=${e.message}`)
    } else {
      console.error('unexpected error. ' + e)
    }

    throw e
  }
}

export { saveToJson, saveToBuffer }
