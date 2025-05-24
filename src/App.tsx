declare global {
  interface Window {
    chrome?: any;
  }
}

function App() {
  const handleStart = () => {
    if (window.chrome && window.chrome.scripting) {
      window.chrome.tabs.query(
        { active: true, currentWindow: true },
        (tabs: any[]) => {
          if (!tabs[0]?.id) return;

          window.chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
              if ((window as any).__vipInterval) return;
              (window as any).__vipInterval = setInterval(() => {
                const gradientGroups =
                  document.querySelectorAll(".gradient-border");

                gradientGroups.forEach((group) => {
                  group.classList.toggle("gradient-border");
                });

                const elementsToRemove = document.querySelectorAll(".gozNHh");
                elementsToRemove.forEach((el) => el.remove());

                const vipElements = document.querySelectorAll(".gEjMuC");

                vipElements.forEach((el) => {
                  el.remove();
                });
              }, 1000);
            },
          });
        }
      );
    } else {
      console.warn("Chrome scripting API not available");
    }
  };

  const handleStop = () => {
    if (window.chrome && window.chrome.scripting) {
      window.chrome.tabs.query(
        { active: true, currentWindow: true },
        (tabs: any[]) => {
          if (!tabs[0]?.id) return;

          window.chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
              if ((window as any).__vipInterval) {
                clearInterval((window as any).__vipInterval);
                delete (window as any).__vipInterval;
              }
            },
          });
        }
      );
    } else {
      console.warn("Chrome scripting API not available");
    }
  };

  return (
    <div className="p-5 h-96 w-96 shadow-lg rounded-xl bg-white flex flex-col justify-center items-center gap-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">VIP Hider</h2>
      <button
        onClick={handleStart}
        className="w-40 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 rounded-lg shadow transition duration-200"
      >
        Hide Vips
      </button>
      <button
        onClick={handleStop}
        className="w-40 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-2 rounded-lg shadow transition duration-200"
      >
        Stop
      </button>
      <p className="text-gray-500 text-sm mt-4 text-center">
        Click "Hide Vips" to remove VIP elements.
        <br />
        Click "Stop" to restore them.
      </p>
    </div>
  );
}

export default App;
