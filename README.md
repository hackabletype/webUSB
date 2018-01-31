webUSB API
==========

Exposing non-standardized USB devices to the web. 

[WebUSB API](https://wicg.github.io/webusb/) available from Chrome 61.

Some important links
--------------------

* [Access USB Devices on the Web](https://developers.google.com/web/updates/2016/03/access-usb-devices-on-the-web)
* [WebUSB API](https://wicg.github.io/webusb/)
* [WebUSB Arduino](https://github.com/webusb/arduino)

### Chrome usb related stuff
* [Chrome device-log](chrome://device-log/)
* [Chrome usb-internals](chrome://usb-internals/)

What could webUSB buy us?
-------------------------

Let's see what you could expect with the WebUSB API:

1. Buy a USB device.
1. Plug it into your computer.
1. A notification appears right away, with the right website to go to for this device.
1. Simply click on it. Website is there and ready to use!
1. Click to connect and a USB device chooser shows up in Chrome, where you can pick your device.
1. Tada!

What would this procedure be like without the WebUSB API?

* Read a box, label, or search on line and possibly end up on the wrong website.
* Have to install a native application.
* Is it supported on my operating system? Make sure you download the "right" thing.
* Scary OS prompts popup and warn you about installing drivers/applications from the Internet.
* Malfunctioning code harms the whole computer. The Web is built to contain malfunctioning websites.
* Only use the USB device once? On the Web, the website is gone once you closed tab. On a computer the code sticks around.