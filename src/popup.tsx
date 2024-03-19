import React, { useEffect } from 'react'

import './popup.css'

import { useAtom } from 'jotai'

import { configAtom } from './atoms/config'
import { Recorder } from './components/recorder'
import Example from './components/select'

function IndexPopup(): React.ReactElement {
  const [config, setConfig] = useAtom(configAtom)
  useEffect(() => {
    setConfig({ ...config, windowId: 0 })
  }, [])
  function captureSS(): void {
    if (config.windowId !== 0) {
      void chrome.windows.update(config.windowId, { focused: true })
    } else {
      void chrome.windows
        .create({
          url: `${chrome.runtime.getURL('popup.html')}?page=recorder`,
          type: 'popup',
          focused: true,
          height: 600,
          width: 800,
          left: 20,
          top: window.innerHeight * 0.8
        })
        .then((s) => {
          setConfig({ ...config, windowId: s.id ?? 0 })
        })
    }
  }
  if (window.location.search.length > 0) {
    return <Recorder />
  } else {
    return (
      <main className='w-[600px] h-[600px]'>
        <h1 className='text-2xl text-blue-800'>OpenStream</h1>
        <Example />

        <button className='p-3 mt-4 bg-gray-600' onClick={captureSS}>
          Open Recorder
        </button>
      </main>
    )
  }
}

export default IndexPopup
