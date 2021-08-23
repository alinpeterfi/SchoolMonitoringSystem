//Libraries list
#include <SPI.h>
#include <MFRC522.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <Ethernet.h>
#include <TextFinder.h>
#include <Servo.h>
#include <String.h>
#include <ArduinoJson.h>
#include <EthernetUdp.h>
// Declare the Servo pin
#define servoPin 8
//Declare pins for rfid
#define SS_PIN 7
#define RST_PIN 9
//Declare pins for motion sensor
#define pirPin 2
#define ledPin 4
//declare buzzerpin
#define buzzerPin A0
//LCD initialization
LiquidCrystal_I2C lcd(0x27, 16, 2);
//Ethernet client intitialization
EthernetClient client;
//Json initialization
StaticJsonBuffer<150> jsonBuffer;
//TextFinder initialization
TextFinder finder( client );


// A UDP instance to let us send and receive packets over UDP
const char timeServer[] = "pool.ntp.org"; // time.nist.gov NTP server
const int NTP_PACKET_SIZE = 48; // NTP time stamp is in the first 48 bytes of the message
byte packetBuffer[NTP_PACKET_SIZE]; //buffer to hold incoming and outgoing packets
EthernetUDP Udp; //UDP intialization

String result;//String used for storing the json
String content;//String used for storing the rfid
//ethernet parameters
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
int    HTTP_PORT   = 80;
char   HOST_NAME[] = "192.168.0.192"; //localhost

//Initialization of the rfid
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.

int pos = 0;    // variable to store the servo position
Servo myservo;  //Servo object to control a servo


void setup()
{
  //Pins initialization
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(pirPin, INPUT);
  // initialization of the Ethernet shield using DHCP:
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed obtaining an IP address");
    while (true);
  }
  //attaching the servo to the used pin number
  myservo.attach(servoPin);
  lcd.init(); // LCD init

  // Print a message to the LCD.
  lcd.backlight();
  lcd.setCursor(1, 0);
  lcd.print("Ready");

  Serial.begin(9600);   // Initiate a serial communication
  SPI.begin();      // Initiate  SPI bus
  mfrc522.PCD_Init();   // Initiate MFRC522

  Udp.begin(8888);  // local port to listen for UDP packets

  Serial.println(" reader...");
  Serial.println();
}//setup


void loop()
{
  // variables for storing the time
  int timeHour;
  int timeMin;
  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent())
  {
    return;
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial())
  {
    return;
  }
  //Show UID on serial monitor
  tone(buzzerPin, 2000); //2KHz sound signal...
  delay(500);        // 0.5 sec
  noTone(buzzerPin);     //stopping the sound
  Serial.print("UID tag :");
  content = ""; //clearing the rfid variable

  for (byte i = 0; i < mfrc522.uid.size; i++)
  {
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));//concatenation for leading zero 
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  content.toUpperCase();//upper case rfid
  content.trim();//deleting the spaces
  Serial.print(content);

  sendNTPpacket(timeServer); // send an NTP packet to a time server

  // wait to see if a reply is available
  delay(500);
  if (Udp.parsePacket()) {
    // We've received a packet, read the data from it
    Udp.read(packetBuffer, NTP_PACKET_SIZE); // read the packet into the buffer
    
    // the timestamp starts at byte 40 of the received packet and is four bytes,
    // or two words, long. First, extract the two words:

    unsigned long highWord = word(packetBuffer[40], packetBuffer[41]);
    unsigned long lowWord = word(packetBuffer[42], packetBuffer[43]);
    // combine the four bytes (two words) into a long integer
    // this is NTP time (seconds since Jan 1 1900):

    // now convert NTP time into everyday time:
    unsigned long secsSince1900 = highWord << 16 | lowWord;
    // Unix time starts on Jan 1 1970. In seconds, that's 2208988800:
    const unsigned long seventyYears = 2208988800UL;
    // subtract seventy years:
    unsigned long epoch = secsSince1900 - seventyYears;
    // print Unix time:



    // print the hour and minute
    Serial.println("The UTC time is ");       // UTC is the time at Greenwich Meridian (GMT)
    timeHour = (epoch  % 86400L) / 3600;
    timeHour += 3; //offset for our time
    Serial.print(timeHour); // print the hour (86400 equals secs per day)
    Serial.print(':');
    timeMin = (epoch  % 3600) / 60;
    Serial.print(timeMin); // print the minute (3600 equals secs per minute)
  }

  Ethernet.maintain();//dhcp renewal

  // connect to web server on port 80:
  if (client.connect(HOST_NAME, HTTP_PORT))
  {
    // if connected:
    Serial.println("Connected to server");
    // make a HTTP request:
    // send HTTP header
    client.println("GET /rfidData.php?rfid=" + content + "&hour=" + timeHour + "&min=" + timeMin + " HTTP/1.1");
    client.println("Host: " + String(HOST_NAME));
    client.println("Connection: close");
    client.println(); // end HTTP header
  } 
  else 
  {// if not connected:
    Serial.println("connection failed");
  }

//if connected to the client
  while (client.connected()) {
    if (client.available()) {
      // read an incoming byte from the server and print it to serial monitor:
      finder.find("[");//we look for the beginning of the json obejct
      char c = client.read();
      while (c != ']') { //we stop at the end
        result += c;
        c = client.read();
      }
      Serial.print(result);
      //creating the json object
      JsonObject& jsonObj = jsonBuffer.parseObject(result);
      //if the rfid is not recognized, we have no json object
      if (!jsonObj.success()) {
        Serial.println("parseObject() failed");
        //print fail message
        lcd.setCursor(1, 0);
        lcd.print("The student was ");
        lcd.setCursor(1, 1);
        lcd.print("not found    ");
        delay(2000);//wait 2 seconds
        lcd.clear();
        lcd.setCursor(1, 0);
        lcd.print("Ready for the ");
        lcd.setCursor(1, 1);
        lcd.print("next validation");
        jsonBuffer.clear();
        return false;
      }
      //if the student was recognized, the led turns on 
      digitalWrite(ledPin, HIGH);  // turn LED ON
      Serial.println();
      //store variables from the json object 
      String lastName = jsonObj["lastName"];
      String firstName = jsonObj["firstName"];
      String entranceStatus = jsonObj["entranceStatus"];
      lcd.clear();
      lcd.setCursor(1, 0);
      //printing conditions
      if (entranceStatus == "1")
      {
        lcd.print("Welcome,");
      }
      if (entranceStatus == "0") 
      {
        lcd.print("See you later,");
      }
      delay(400);
      lcd.setCursor(1, 1);
      lcd.print(lastName + " " + firstName);
    }//client available
  }//client connected
  
  if (!client.connected()) {
    Serial.println("Stopping connection...");
    client.stop();
  }//stopping connection
  delay(2000);//wait 2 secs

  //servo movement
  for (pos = 90; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
   // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);
  }

  do {
    digitalWrite(ledPin, HIGH); // turn LED ON until the person passes the motion sensor

  } while (digitalRead(pirPin) == LOW);
  for (int i = 0; i < 3; i++) {
    //if movement detected, sound the buzzer
    tone(buzzerPin, 2000); // Send 1KHz sound signal...
    delay(300);        // ...for 1 sec
    noTone(buzzerPin);
  }
  // and close the gate
  digitalWrite(ledPin, LOW);
  delay(500);
  for (pos = 180; pos >= 90; pos -= 1) { // goes from 180 degrees to 0 degrees
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);
  }
  //LCD display
  lcd.clear();
  lcd.setCursor(1, 0);
  lcd.print("Ready for the ");
  lcd.setCursor(1, 1);
  lcd.print("next validation");
  //clearing the variables
  jsonBuffer.clear();
  result = "";
  content = "";
  Serial.println("next read");
}//loop



// send an NTP request to the time server at the given address
void sendNTPpacket(const char * address) {
  // set all bytes in the buffer to 0
  memset(packetBuffer, 0, NTP_PACKET_SIZE);
  // Initialize values needed to form NTP request
  // (see URL above for details on the packets)
  packetBuffer[0] = 0b11100011;   // LI, Version, Mode
  packetBuffer[1] = 0;     // Stratum, or type of clock
  packetBuffer[2] = 6;     // Polling Interval
  packetBuffer[3] = 0xEC;  // Peer Clock Precision
  // 8 bytes of zero for Root Delay & Root Dispersion
  packetBuffer[12]  = 49;
  packetBuffer[13]  = 0x4E;
  packetBuffer[14]  = 49;
  packetBuffer[15]  = 52;

  // all NTP fields have been given values, now
  // you can send a packet requesting a timestamp:
  Udp.beginPacket(address, 123); // NTP requests are to port 123
  Udp.write(packetBuffer, NTP_PACKET_SIZE);
  Udp.endPacket();
}
