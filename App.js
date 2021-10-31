import React, {useState} from 'react';
import {StyleSheet, View,TouchableOpacity, Touchable,Text} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight
} from '@viro-community/react-viro';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroConstants.TRACKING_NORMAL) {
      setText('Testing AR');
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
      {/* <View style={styles.controls}>

      </View> */}
    </ViroARScene>
  );
};

const CarSceneAR = ()=>{

  function onInitialized(state, reason) {
    console.log(state);
    console.log(reason);
  }

  return(
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* Objects need lights to be visible! */}
      <ViroAmbientLight color="#ffffff" />
      <Viro3DObject
        source={require('./assets/model2.obj')}
        // resources={[require('./assets/materials.mtl')]}
        position={[0, -2, -5]}
        scale={[5, 5, 5]}
        type="OBJ"
        rotation={[0, 0, 0]}
        dragType="FixedDistance" onDrag={()=>{}} 

      />
    </ViroARScene>
  )
}

export default () => {
  const [Scene,setScene] = useState('CarSceneAR');
  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: Scene === 'CarSceneAR'? CarSceneAR: HelloWorldSceneAR,
        }}
        style={styles.f1}
      />
      <View style={styles.controls}>
          <TouchableOpacity onPress={()=>setScene('CarSceneAR')}>
            <Text>Image</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>setScene('HelloWorldSceneAR')}>
            <Text>Text</Text>
          </TouchableOpacity>

      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  mainView:{
    flex:1,
  },
  controls:{
    width:'100%',
    height:100,
    backgroundColor:'#fff',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  }
});
