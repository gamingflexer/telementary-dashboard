int led = 13;

int received = 0;

int i;

void setup() {

  Serial.begin(9600); 

  pinMode(led, OUTPUT);

}

 

void loop() {

  if (Serial.available() > 0) {

received = Serial.read();

  

    if (received == 'a'){

    digitalWrite(led, HIGH);

    delay(2000);

    digitalWrite(led, LOW);

    }

     else if (received == 'b'){

      for(i=0;i<5;i++){

    digitalWrite(led, HIGH);

    delay(1000);

    digitalWrite(led, LOW);

    delay(1000);

    }

  } 

}

}


 