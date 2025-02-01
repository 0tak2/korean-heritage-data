import { HeritageKindCode } from "../cha-api/types.ts";

interface Options {
  outputDir: string,
  outputJsonFilename: string,
  shouldSaveImage: boolean,
  kindCode: HeritageKindCode | undefined,
  shouldShowHelp: boolean,
}

type CouldStartTasks = boolean

export type { Options, CouldStartTasks }
