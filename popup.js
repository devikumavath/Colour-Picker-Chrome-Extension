const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue")

btn.addEventListener("click", async () => {
   chrome.storage.sync.get('color' , ({color})=>{
     console.log('color: ' , color);
  });
  //console.log("clicked");
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // console.log(tab);
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },

      function: pickColor,
    },
    async (injecttionResults) => {
      //   console.log(injecttionResults);

      const [data] = injecttionResults;
      if (data.result) {
        const color = data.result.sRGBHex;
        colorValue.innerText = color
        colorGrid.style.backgroundColor = color;
        try {
          await navigator.clipboard.writeText(color);
          
        } catch (error) {
          console.log(error);
        }

      }
    }
  );
});

async function pickColor() {
  // console.log("script working");

  try {
    //picker activate
    const eyeDropper = new EyeDropper();

    return await eyeDropper.open();

    //  const selectedColor = await eyeDropper.open();
    // console.log(selectedColor);
  } catch (error) {
    console.error(error);
  }
}
