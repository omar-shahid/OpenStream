import { useAtom } from 'jotai'
import React, { useEffect, useRef } from 'react'

import { configAtom, RecordingType } from '~src/atoms/config'

export function Recorder(): React.ReactElement {
  const [config] = useAtom(configAtom)
  const vidRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (
      config.recordingType === RecordingType.BOTH ||
      config.recordingType === RecordingType.SCREEN
    ) {
      void navigator.mediaDevices.getDisplayMedia()
    }
  }, [config.recordingType])

  useEffect(() => {
    if (
      config.recordingType === RecordingType.BOTH ||
      config.recordingType === RecordingType.CAM
    ) {
      void navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          if (vidRef.current == null) return
          vidRef.current.srcObject = stream
          vidRef.current.muted = true
          void vidRef.current.play()
        })
    }
  }, [config.recordingType])

  return (
    <>
      <video
        ref={vidRef}
        className='h-svh w-svw bg-black object-contain '
      ></video>
      <div className='bottom-0 absolute px-11 z-20 h-12 w-svw  bg-black bg-opacity-80 flex items-center justify-between'>
        <span className='text-white text-lg'>00:00</span>
        <div>
          <button className='text-white'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z'
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
