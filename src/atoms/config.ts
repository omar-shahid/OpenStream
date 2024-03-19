import { atomWithStorage } from 'jotai/utils'

export enum RecordingType {
  CAM = 0,
  SCREEN,
  BOTH
}

type initalConfigType = typeof initalConfig
const initalConfig = {
  recordingType: RecordingType.CAM,
  windowId: 0
}

const prevConf = JSON.parse(
  localStorage.getItem('config') ?? '{}'
) as initalConfigType

export const configAtom = atomWithStorage(
  'config',
  Object.keys(prevConf).length !== 0 ? prevConf : initalConfig
)
