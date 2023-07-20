const videoElement = document.getElementById("video");
const button = document.getElementById("button");
const sourceButton = document.getElementById("source-button");
const finalContent = document.getElementById("final-content");
// promp to select media stream, pass to video element then play

async function selectMediaStream() {
  const controller = new CaptureController();
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
      controller,
    });
    controller.setFocusBehavior("no-focus-change");

    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
    finalContent.style.display = "block";
  } catch (e) {
    //catch error
    console.log("Error: ", e);
  }
}
sourceButton.addEventListener("click", () => {
  selectMediaStream();
  //   console.log("dwd");
});
button.addEventListener("click", async () => {
  // disablebutton
  button.disabled = true;
  // start pip
  await videoElement.requestPictureInPicture();
  button.disabled = false;
});
