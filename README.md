## RFID Reader Server for Raspberry Pi

A websocket server working along with rfid-reader, sending event to the webapp
frontend once a card is detected and the connection is active.

### Usage

Clone the repo and run the following commands on your rpi

```
yarn install
node server.js
```

### Python Dependencies

You need the following python3 packages to make the python script work.

```
- lthiery/SPI-Py
- NTUgEEk/pi-rc522
```
