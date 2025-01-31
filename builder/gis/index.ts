import { parse as parseXml } from "jsr:@libs/xml";
import { SpcaItem } from "./types.ts";

const GIS_DATA_FILE_PATH = '../raw/gukbo-gis.xml'

export async function loadGisData(filePath: string = GIS_DATA_FILE_PATH): Promise<[SpcaItem]> {
  const xml = await Deno.readTextFile(filePath)
  const obj: Record<string, any> = parseXml(xml)
  return obj['ns2:response'].spca as [SpcaItem]
}
