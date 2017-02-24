## RFID Reader Server for Raspberry Pi

A websocket server working along with rfid-reader, sending event to the webapp
frontend once a card is detected and the connection is active.

### Dependencies

#### NodeJS

Since the default nodejs on raspberry pi is v0.10.29, you might need to install
newer version of nodejs with the following command:

```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

sudo apt install nodejs
```

To use yarn, run `sudo npm i -g yarn`.
#### Python Dependencies

You need the following python3 packages to make the python script work.

```
- lthiery/SPI-Py
- NTUgEEk/pi-rc522
```

To install them, run the following commands:

```
git clone https://github.com/lthiery/SPI-Py
git clone https://github.com/NTUgEEk/pi-rc522
sudo pip3 install ./SPI-Py
sudo pip3 install ./pi-rc522
```

### Usage

Clone the repo and run the following commands on your rpi

```
yarn
node server.js
```

The websocket server will be started on port 8080.
