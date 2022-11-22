# Telementary Dashboard

We are building a dashboard for F1 telemetry data. The dashboard is built using sensor data from the F1 car and the data is streamed to the dashboard using a MQTT broker. The dashboard is built using JAM stack and Flask.

## Getting Started

Clone the repository and install the dependencies.

```
pip install -r requirments.txt
```

```
pip install -r requirments_mac.txt
```
```
flask\Scripts\activate
cd backend
python app.py
```

### Aurdino Code

We are using esp32 to stream the data to the dashboard. The code for the esp32 is in the arduino folder.

- Use the arduino IDE to upload the code to the esp32.

## Project Architecture

Coming soon