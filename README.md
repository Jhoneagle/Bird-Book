# Bird book

## Description

A cross platform application that allows storing observation data about species into the local memory.

### Features

Application consist of two views. First one is the main view where all observations are listed showing species' name, observations record time, rarity of species, notes about the observation and geolocation of the record. Also main view has possibility to sort list by either time, species' name or rarity.

The other view instead is form to add new observations. It takes input of species' name and notes about the observation, gives chance to choose rarity from predefined options and allows user to either automatically fetch device current geolocation or to manually input the geolocation of the observation. 

## Set up

Project/application doesn't require much of preparation. Depending on if development is done with Android or IOS you need a proper device or emulator to run the application on. Also having Android studio, IntelliJ or Xcode is recommended but not necessary as all commands can be executed from command line too.

Physical device and environment specific preparation steps that needs to be taken before running the project can be found [here](https://facebook.github.io/react-native/docs/running-on-device)

## Running

To run project from terminal with Android use `react-native run-android` and with IOS use `react-native run-ios` in project root. Alternatively open project in IDE of choice and press "run project" button assuming IDE is able to configure it automatically.

## This was done as an assignment

### My experience about the project

Assignments Acceptance Criteria's itself weren't that exiting as I have actually done this exactly same assignment once before and the result of that can be found [here](https://github.com/Jhoneagle/Bird-Observations).

So as of a challenge I this time made myself to implement the bird observation application using React Native instead of Java. Also unlike last time, this time I decided to put more effort into the UX-design as the Android application wasn't that "pretty".

However I still got to learn a lot during the project as I faced couple of major problems while implementing the features of the application. From which one was that how in earth can you make a selector to choose how list of observations is shorted. Without making it either ugly or clumsy. 

Also tried to make the application in away that it's expandable and the code is as readable as possible. But it's not that easy to evaluate your own creation, so I can mainly just hope I succeed in it. All in all I totally enjoyed doing this project :D
