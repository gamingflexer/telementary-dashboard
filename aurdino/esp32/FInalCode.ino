//Cloud
SoftwareSerial gprsSerial(2, 3);
#include <String.h>
//#include <DHT.h>
//#define DHTPIN 7
//DHT dht(DHTPIN, DHT11);

// ESP to Arduino
#define RXp2 17
#define TXp2 16

// GPS
#include <DFRobot_SIM808.h>
#include <sim808.h>
#include <SoftwareSerial.h>
#include <HTTPClient.h>


#define PIN_TX 10
#define PIN_RX 11
SoftwareSerial mySerial(PIN_TX, PIN_RX);
//DFRobot_SIM808 sim808(&Serial);//Connect RX,TX,PWR,

DFRobot_SIM808 sim808(&mySerial);

//Temperature
//hese values are in the datasheet
#define RT0 10000   // Ω
#define B 3977      // K
//--------------------------------------
#define VCC 5    //Supply voltage
#define R 10000  //R=10KΩ

//Variables
float RT, VR, ln, TX, T0, VRT;

void setup() {

  //Cloud
  gprsSerial.begin(9600); // the GPRS baud rate
  Serial.begin(9600);    // the GPRS baud rate
  //  dht.begin();

  delay(1000);


  //  Serial.begin(9600);
  Serial.begin(115200);

  // ESP to Arduino
  Serial2.begin(115200);

  // GPS
  mySerial.begin(9600);
  //  Serial.begin(115200);

  //******** Initialize sim808 module *************
  while (!sim808.init()) {
    delay(1000);
    Serial.print("Sim808 init error\r\n");
  }

  //************* Turn on the GPS power************
  if (sim808.attachGPS())
    Serial.println("Open the GPS power success");
  else
    Serial.println("Open the GPS power failure");

  //   Temperature
  pinMode(0, INPUT) ;
  pinMode(1, INPUT) ;
  //  Serial.begin(9600);
  T0 = 25 + 273.15;

}

void loop() {

  //Cloud
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  delay(100);


  if (gprsSerial.available())
    Serial.write(gprsSerial.read());
  
  //checking stat

  gprsSerial.println("AT");
  delay(1000);

  gprsSerial.println("AT+CPIN?");
  delay(1000);

  gprsSerial.println("AT+CREG?");
  delay(1000);

  gprsSerial.println("AT+CGATT?");
  delay(1000);

  gprsSerial.println("AT+CIPSHUT");
  delay(1000);

  gprsSerial.println("AT+CIPSTATUS");
  delay(2000);

  gprsSerial.println("AT+CIPMUX=0");
  delay(2000);

  ShowSerialData();

  gprsSerial.println("AT+CSTT=\"airtelgprs.com\"");//start task and setting the APN,
  delay(1000);

  ShowSerialData();

  gprsSerial.println("AT+CIICR");//bring up wireless connection
  delay(3000);

  ShowSerialData();

  gprsSerial.println("AT+CIFSR");//get local IP adress
  delay(2000);

  ShowSerialData();

  gprsSerial.println("AT+CIPSPRT=0");
  delay(3000);

  ShowSerialData();

  gprsSerial.println("AT+CIPSTART=\"TCP\",\"api.thingspeak.com\",\"80\"");//start up the connection
  delay(6000);

  ShowSerialData();

  gprsSerial.println("AT+CIPSEND");//begin send data to remote server
  delay(4000);
  ShowSerialData();

  String str = "GET https://api.thingspeak.com/update?api_key=QA4ILP6WYW5M7CAZ&field1=" + String(t) + "&field2=" + String(h);
  Serial.println(str);
  gprsSerial.println(str);//begin send data to remote server

  delay(4000);
  ShowSerialData();

  gprsSerial.println((char)26);//sending
  delay(5000);//waitting for reply, important! the time is base on the condition of internet
  gprsSerial.println();

  ShowSerialData();

  gprsSerial.println("AT+CIPSHUT");//close the connection
  delay(100);
  ShowSerialData();

  // GPS sending data
  if (sim808.getGPS()) {
    // Serial.print(sim808.GPSdata.year);
    // Serial.print("/");
    // Serial.print(sim808.GPSdata.month);
    // Serial.print("/");
    // Serial.print(sim808.GPSdata.day);
    // Serial.print(" ");
    // Serial.print(sim808.GPSdata.hour);
    // Serial.print(":");
    // Serial.print(sim808.GPSdata.minute);
    // Serial.print(":");
    // Serial.print(sim808.GPSdata.second);
    // Serial.print(":");
    // Serial.println(sim808.GPSdata.centisecond);

    // Serial.print("latitude :");
    // Serial.println(sim808.GPSdata.lat, 6);
    sim808.latitudeConverToDMS();
    // Serial.print("latitude :");
    // Serial.print(sim808.latDMS.degrees);
    // Serial.print("\^");
    // Serial.print(sim808.latDMS.minutes);
    // Serial.print("\'");
    // Serial.print(sim808.latDMS.seconeds, 6);
    // Serial.println("\"");

    // Serial.print("longitude :");
    // Serial.println(sim808.GPSdata.lon, 6);
    sim808.LongitudeConverToDMS();
    // Serial.print("longitude :");
    // Serial.print(sim808.longDMS.degrees);
    // Serial.print("\^");
    // Serial.print(sim808.longDMS.minutes);
    // Serial.print("\'");
    // Serial.print(sim808.longDMS.seconeds, 6);
    // Serial.println("\"");

    // Serial.print("speed_kph :");
    // Serial.println(sim808.GPSdata.speed_kph);
    // Serial.print("heading :");
    // Serial.println(sim808.GPSdata.heading);
    Serial.println(String(sim808.GPSdata.year+","+sim808.GPSdata.month+","+sim808.GPSdata.day+","+sim808.GPSdata.hour+","+sim808.GPSdata.minute+","+sim808.GPSdata.second+","+sim808.GPSdata.centisecond+","+sim808.latDMS.degrees+","+sim808.latDMS.minutes+","+sim808.latDMS.seconeds+","+sim808.longDMS.degrees+","+sim808.longDMS.minutes+","+sim808.longDMS.seconeds+","+sim808.GPSdata.speed_kph+","+sim808.GPSdata.heading));

    // Send POST request to save data of GPS

    HTTPClient http;

    http.begin("http://13.233.70.187:8000/aurdino/api/location");  
    http.addHeader("Content-Type", "text/plain");             

    int httpResponseCode = http.POST(String(sim808.GPSdata.year+","+sim808.GPSdata.month+","+sim808.GPSdata.day+","+sim808.GPSdata.hour+","+sim808.GPSdata.minute+","+sim808.GPSdata.second+","+sim808.GPSdata.centisecond+","+sim808.latDMS.degrees+","+sim808.latDMS.minutes+","+sim808.latDMS.seconeds+","+sim808.longDMS.degrees+","+sim808.longDMS.minutes+","+sim808.longDMS.seconeds+","+sim808.GPSdata.speed_kph+","+sim808.GPSdata.heading));    //add data here

    if (httpResponseCode > 0) {

      String response = http.getString();                       

      Serial.println(httpResponseCode);   
      Serial.println(response);           //Print request answer //if this comes as SUCESS, then the data is saved in the server //OM

    } else {

      Serial.print("Error on sending POST: FAILED");
      Serial.println(httpResponseCode);

    }

    http.end();  
    // Send POST request to save data of GPS

    // ESP to Arduino
    char data[100] = {0};
    if (Serial2.available())
    {
      Serial2.readBytesUntil('\n', data, 50);
      Serial.print(" Heart Rate Received at mega: ");
      Serial.println(data);
    }

    // Send POST request to save data of HeartBeat

    HTTPClient http;

    http.begin("http://13.233.70.187:8000/aurdino/api/heartbeat");  
    http.addHeader("Content-Type", "text/plain");             

    int httpResponseCode = http.POST(String(data));    //add data here

    if (httpResponseCode > 0) {

      String response = http.getString();                       

      Serial.println(httpResponseCode);   
      Serial.println(response);           //Print request answer //if this comes as SUCESS, then the data is saved in the server //OM

    } else {

      Serial.print("Error on sending POST: FAILED");
      Serial.println(httpResponseCode);

    }

    http.end();  
    // Send POST request to save data of HeartBeat


    // Temperature
    char cellTemp[100] = {0};
    for (int i = 0; i <= 0; i++)
    { VRT = analogRead(i);              //Acquisition analog value of VRT
      VRT = (5.00 / 1023.00) * VRT;      //Conversion to voltage
      VR = VCC - VRT;
      RT = VRT / (VR / R);               //Resistance of RT

      ln = log(RT / RT0);
      TX = (1 / ((ln / B) + (1 / T0))); //Temperature from thermistor

      TX = TX - 273.15;                 //Conversion to Celsius


      Serial.print("Temp");
      Serial.print(i);
      Serial.print(": ");
      Serial.println(TX);

    }
    Serial.println("...");
  }
      // Send POST request to save data of GPS

    // HTTPClient http;

    // http.begin("http://13.233.70.187:8000/aurdino/api/cell");  
    // http.addHeader("Content-Type", "text/plain");             

    // int httpResponseCode = http.POST(String());    //add data here

    // if (httpResponseCode > 0) {

    //   String response = http.getString();                       

    //   Serial.println(httpResponseCode);   
    //   Serial.println(response);           //Print request answer //if this comes as SUCESS, then the data is saved in the server //OM

    // } else {

    //   Serial.print("Error on sending POST: FAILED");
    //   Serial.println(httpResponseCode);

    // }

    // http.end();  
    // // Send POST request to save data of GPS


}

//Cloud
void ShowSerialData()
{
  while (gprsSerial.available() != 0)
    Serial.write(gprsSerial.read());
  delay(5000);

}
