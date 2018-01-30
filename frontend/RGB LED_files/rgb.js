(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    const connectButton = document.querySelector('#connect');
    const statusDisplay = document.querySelector('#status');
    const picker = document.querySelector('#picker');
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

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function onUpdate() {
      if (!port) {
        return;
      }

      const rgb = hexToRgb(picker.value)
      const view = new Uint8Array(3);
      view[0] = 255 - rgb['r'];
      view[1] = 255 - rgb['g'];
      view[2] = 255 - rgb['b'];
      port.send(view);
    }

    picker.addEventListener('input', onUpdate);

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
