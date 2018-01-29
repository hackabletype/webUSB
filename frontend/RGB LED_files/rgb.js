(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    const connectButton = document.querySelector('#connect');
    const statusDisplay = document.querySelector('#status');
    const redSlider = document.querySelector('#red');
    const greenSlider = document.querySelector('#green');
    const blueSlider = document.querySelector('#blue');
    let port;

    function connect() {
      port.connect().then(() => {
        statusDisplay.textContent = '';
        connectButton.textContent = 'Disconnect';

        port.onReceive = (data) => {
          const textDecoder = new TextDecoder();
          console.log(textDecoder.decode(data));
        };
        port.onReceiveError = (error) => {
          console.error(error);
        };
      }, (error) => {
        statusDisplay.textContent = error;
      });
    }

    function onUpdate() {
      if (!port) {
        return;
      }

      const view = new Uint8Array(3);
      view[0] = parseInt(redSlider.value);
      view[1] = parseInt(greenSlider.value);
      view[2] = parseInt(blueSlider.value);
      port.send(view);
    }

    redSlider.addEventListener('input', onUpdate);
    greenSlider.addEventListener('input', onUpdate);
    blueSlider.addEventListener('input', onUpdate);

    connectButton.addEventListener('click', () => {
      if (port) {
        port.disconnect();
        connectButton.textContent = 'Connect';
        statusDisplay.textContent = '';
        port = null;
      } else {
        serial.requestPort().then((selectedPort) => {
          port = selectedPort;
          connect();
        }).catch((error) => {
          statusDisplay.textContent = error;
        });
      }
    });

    serial.getPorts().then((ports) => {
      if (ports.length === 0) {
        statusDisplay.textContent = 'No device found.';
      } else {
        statusDisplay.textContent = 'Connecting...';
        port = ports[0];
        connect();
      }
    });
  });
}());
