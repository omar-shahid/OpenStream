import { useAtom } from "jotai"
import { atomWithStorage, createJSONStorage } from "jotai/utils"

import "./popup.css"

const strAtom = atomWithStorage("count", 0)

function IndexPopup() {
  const [count, setCount] = useAtom(strAtom)

  function captureSS() {
    chrome.windows.create({
      url: `${chrome.runtime.getURL("popup.html")}?page=recorder`,
      type: "popup",
      focused: true,
      height: 200,
      width: 400,
      left: 20,
      top: window.innerHeight * 0.8

      /* can also set width/height here, see docs */
    })
  }
  // useEffect(() => {
  //   function resetStorage() {
  //     if (window.location.search) return
  //     alert("Going to close now!")
  //   }
  //   document.addEventListener("visibilitychange", resetStorage)
  //   return () => document.removeEventListener("visibilitychange", resetStorage)
  // }, [])
  if (window.location.search)
    return (
      <>
        <h1 className="text-xl">Recorder Controls Page</h1>
        <button className="p-3 bg-gray-600" onClick={() => setCount(count + 1)}>
          Trigger state change
        </button>
      </>
    )
  else
    return (
      <>
        <h1 className="text-2xl text-blue-800">
          Main Extension Page, Counter: {count}
        </h1>
        <button onClick={captureSS} className="p-3 bg-gray-600">
          Open Recorder UI
        </button>
      </>
    )
}

export default IndexPopup
