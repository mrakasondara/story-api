export default class Camera {
  #currentStream;
  #streaming = false;
  #width = 640;
  #height = 0;

  #videoElement;
  #selectCameraElement;
  #canvasElement;

  #takePictureButton;

  static addNewStream(stream) {
    if (!Array.isArray(window.currentStream)) {
      window.currentStream = [stream];
      return;
    }
    window.currentStream = [...window.currentStream, stream];
  }

  static stopAllStream() {
    if (!Array.isArray(window.currentStream)) {
      window.currentStream = [];
      return;
    }

    window.currentStream.forEach((stream) => {
      if (stream.active) {
        stream.getTracks().forEach((track) => track.stop());
      }
    });
  }

  constructor({ video, cameraSelect, canvas, options = {} }) {
    this.#videoElement = video;
    this.#selectCameraElement = cameraSelect;
    this.#canvasElement = canvas;

    this.#initialListener();
  }

  #initialListener() {
    this.#videoElement.oncanplay = () => {
      if (this.#streaming) {
        return;
      }

      this.#height =
        (this.#videoElement.videoHeight * this.#width) /
        this.#videoElement.videoWidth;

      this.#canvasElement.setAttribute("width", this.#width);
      this.#canvasElement.setAttribute("height", this.#height);

      this.#streaming = true;
    };
  }
}
