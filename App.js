/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  DeviceEventEmitter
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { showFloatingBubble, hideFloatingBubble, requestPermission, initialize } from "react-native-floating-bubble"
class App extends React.Component {
  state={
    play:true
  }
  quick=true;
  constructor(){
    super()
  }
  toggleBubble(){
    console.log('toggle bubble');
    hideFloatingBubble()
    .then(() => {console.log("Floating Bubble Removed"); this.setState({play:!this.state.play});console.log(this.state.play)});
   
  }
  render(){
    
         requestPermission()
        .then(() => {
           console.log("Permission Granted")
           initialize()
           .then(() => 
           {
             console.log("Initialized the bubble mange")
             if(this.state.play){
             showFloatingBubble(10, 10,1)
             .then(() => console.log("Floating Bubble Added"));
             }else{
              showFloatingBubble(10, 10,2)
              .then(() => console.log("Floating Bubble Added"));
             }
           })
        })
        .catch(() => console.log("Permission is not granted"))
          DeviceEventEmitter.addListener("floating-bubble-press", (e) => 
          {
            // What to do when user press the bubble
            console.log("Press Bubble")
            console.log(this.quick)
            if(this.quick)
              this.toggleBubble()
            this.quick=false
            setTimeout(()=>{this.quick=true},500)//it is not working in background as we have to run it as service 
    
          });
          DeviceEventEmitter.addListener("floating-bubble-remove", (e) => 
          {
            // What to do when user removes the bubble
            console.log("Remove Bubble")
          });
  
  return (
   <View><Text>cool </Text></View>
  );
}
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
