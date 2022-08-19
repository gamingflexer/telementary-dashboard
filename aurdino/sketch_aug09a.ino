/*  PulseSensor Starter Project and Signal Tester
    The Best Way to Get Started  With, or See the Raw Signal of, your PulseSensor.com™ & Arduino.

    Here is a link to the tutorial
    https://pulsesensor.com/pages/code-and-guide

    WATCH ME (Tutorial Video):
    https://www.youtube.com/watch?v=RbB8NSRa5X4


  -------------------------------------------------------------
  1) This shows a live human Heartbeat Pulse.
  2) Live visualization in Arduino's Cool "Serial Plotter".
  3) Blink an LED on each Heartbeat.
  4) This is the direct Pulse Sensor's Signal.
  5) A great first-step in troubleshooting your circuit and connections.
  6) "Human-readable" code that is newbie friendly."

*/


//  Variables
#include <WiFi.h>
#include <HTTPClient.h>


const char* ssid = "AndroidAP0511";
const char* password =  "123456789";

int PulseSensorPurplePin = 36;        // Pulse Sensor PURPLE WIRE connected to ANALOG PIN 0
int LED13 = 2;   //  The on-board Arduion LED


int Signal;                // holds the incoming raw data. Signal value can range from 0-1024
int Threshold = 2000;            // Determine which Signal to "count as a beat", and which to ingore.


// The SetUp Function:
void setup() {
  Serial.begin(115200);
  delay(4000);   //Delay needed before calling the WiFi.begin

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) { //Check for the connection
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println("Connected to the WiFi network");

  pinMode(LED13, OUTPUT);        // pin that will blink to your heartbeat!
  //Serial.begin(9600);         // Set's up Serial Communication at certain speed.

}

// The Main Loop Function
void loop() {
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    Signal = analogRead(PulseSensorPurplePin);  // Read the PulseSensor's value.

    HTTPClient http;

    http.begin("http://jsonplaceholder.typicode.com/posts");  //Specify destination for HTTP request
    http.addHeader("Content-Type", "text/plain");             //Specify content-type header

    int httpResponseCode = http.POST(String(Signal));   //Send the actual POST request

    if (httpResponseCode > 0) {

      String response = http.getString();                       //Get the response to the request

      Serial.println(httpResponseCode);   //Print return code
      Serial.println(response);           //Print request answer

    } else {

      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);

    }

    http.end();  //Free resources

  } else {

    Serial.println("Error in WiFi connection");

  }

  delay(10000);  //Send a request every 10 seconds


  // Assign this value to the "Signal" variable.

  Serial.println(Signal);                    // Send the Signal value to Serial Plotter.


  if (Signal > Threshold) {                        // If the signal is above "550", then "turn-on" Arduino's on-Board LED.
    digitalWrite(LED13, HIGH);
  } else {
    digitalWrite(LED13, LOW);               //  Else, the sigal must be below "550", so "turn-off" this LED.
  }


  delay(10);


}
