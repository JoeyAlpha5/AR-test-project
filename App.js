import React, {useState} from 'react';
import {StyleSheet, View,TouchableOpacity, Touchable,Text} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroMaterials,
  ViroAnimations,
  ViroBox
} from '@viro-community/react-viro';


const CarSceneAR = (props)=>{
  let data = props.sceneNavigator.viroAppProps;
  const [text, setText] = useState('Initializing AR...');
  const [position,setPosition] = useState([0, 0, -5]);
  const [Scale,setScale] = useState([0.05, 0.05, 0.05]);
  const [Rotation,setRotation] = useState([0, 0, 0]);
  function onInitialized(state, reason) {
    console.log(props.sceneNavigator.viroAppProps)
  }


  // on object drag
  const onObjectDrag = (dragToPos)=>{
    // console.log(dragToPos);
    setPosition(dragToPos);
  }

  const onObjectPinch = (pinchState, scaleFactor, source) =>{
    if(pinchState == 3) {
      let scale_size = Scale[0] * scaleFactor;
      // console.log(scale_size);
      setScale([scale_size,scale_size,scale_size]);
    }
  }

  
  const onObjectRotation = (rotateState, rotationFactor, source)=>{
    if (rotateState == 3) {
      let rotation = Rotation[0]-rotationFactor;
      console.log(rotationFactor);
      setRotation([rotation,rotation,rotation]);
    }

  }


  ViroMaterials.createMaterials({
    /**
     * We can also diffuse a texture here.
     */
    wood: {
      diffuseTexture: require('./assets/tv/Old_Tv/TV_Body_material_Base_Color.png'),
    }
  });

  ViroAnimations.registerAnimations({
    /** To begin with we have added simple rotation animation */
    rotate: {
      properties: {
      rotateY: '+=90',
      },
      duration: 2500, //.25 seconds
    },
  });
  

  return(
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* Objects need lights to be visible! */}
      <ViroAmbientLight color="#ffffff" />

      {data.type !== "text"?
              <Viro3DObject
                source={require('./assets/tv/Old_Tv/Old_Tv.obj')}
                position={position}
                scale={Scale}
                type="OBJ"
                rotation={Rotation}
                // dragType="FixedDistance" 
                onDrag={onObjectDrag} 
                onPinch={onObjectPinch}
                onRotate={onObjectRotation}
                materials={['wood']}
                animation={{name: 'rotate', run: true, loop: true}}


            />
            :
            <ViroText
              text={text}
              scale={[0.5, 0.5, 0.5]}
              position={[0, 0, -1]}
              style={styles.helloWorldTextStyle}
          />
      }

    </ViroARScene>
  )
}


// 3d box 
const BoxScene = (props)=>{

    ViroAnimations.registerAnimations({
      /** To begin with we have added simple rotation animation */
      rotate: {
        properties: {
        rotateY: '+=90',
        },
        duration: 2500, //.25 seconds
      },
    });


    ViroMaterials.createMaterials({
      /**
       * Material in its simplest form is just diffused color
       */
      white: {
        diffuseColor: 'rgba(255,255,255,1)',
      },
      /**
       * We can also diffuse a texture here.
       */
      wood: {
        diffuseTexture: require('./assets/textures/wood.jpeg'),
      }
    });

    return(
      <ViroARScene>
        <ViroAmbientLight color="#ffffff" intensity={200}/>

          <ViroBox
            height={2}
            length={2}
            width={2}
            scale={[0.2, 0.2, 0.2]}
            position={[0, -1, -1]}
            animation={{name: 'rotate', run: true, loop: true}}
            materials={['wood']}
          />
      </ViroARScene>
    )
}

export default () => {
  const [Scene,setScene] = useState('text');
  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene:BoxScene,
        }}
        viroAppProps={{"type":Scene}}
        style={styles.f1}
      />
      <View style={styles.controls}>
          <TouchableOpacity onPress={()=>setScene('object')}>
            <Text>Image</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>setScene('text')}>
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
