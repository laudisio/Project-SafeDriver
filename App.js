import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal} from 'react-native';

import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import carro from './assets/carro.png'
import moto from './assets/moto.png'


export default function App() {

  const [location, setLocation] = useState(null);
  const [erroMsg, setErroMsg] = useState(null);
  const [show, setShow] = useState(false);
  const [corFurto, setCorFurto] = useState('gray');
  const [corAssalto, setCorAssalto] = useState('gray');


  //pede a localização ao entrar no app
  useEffect(() =>{
    (async () => {
        let{status} = await Location.requestPermissionsAsync();
        if(status !== 'granted'){
         setErroMsg('Permission to access location was danied');
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    })();
  }, []);

  let textLatitude = 'Waiting...';
  let textLongitude = 'Waiting...';
  let lat = 0;
  let lon = 0;
  if(erroMsg){
  textLatitude = erroMsg
  textLongitude = erroMsg
  }else if (location){
    lat = (location.coords.latitude);
    lon = (location.coords.longitude);
  }


  return (
    <View style={styles.container}>

      
      <View style={styles.cabecalho}>
        <Image />
        <Text>Perfil do Usuario</Text>
      </View>
      
      <MapView style={styles.map}
      initialRegion={{
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.0092,
        longitudeDelta: 0.0091,
      }}
      >
        

      </MapView>

        <Modal
        animationType='slide'
        transparent={true}
        visible={show}
        >
          <View style={styles.viewBotoesGeral}>
            <View style={styles.viewBotoesGeral2}>
              <TouchableOpacity 
              style={styles.bntClose}
              onPress={() => {setShow(false); setCorFurto('gray'); setCorAssalto('gray');}}
              >
                <Text>X</Text>
              </TouchableOpacity>
              <Text style={{color:'black', fontSize: 30}}>O que aconteceu?</Text>
              <View style={styles.viewCarroEMoto}>
              <TouchableOpacity style={styles.btnCarro}>
              <Image 
              resizeMode={"stretch"}
              style={styles.imgCarro}
              source={carro}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnMoto}>
              <Image 
              resizeMode={"stretch"}
              style={styles.imgMoto}
              source={moto}/>
              </TouchableOpacity>
              </View>

              <View style={styles.btnFurtoOuAssalto}>
              <TouchableOpacity 
              style={{right: 2, backgroundColor: corFurto, width: 140, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 30,}}
              onPress={() => {
                setCorFurto(
                  corFurto === 'gray'
                  ? 'blue'
                  : 'gray'
                );
                setCorAssalto('gray');
              }}
              >
                <Text style={{color:'white', fontSize: 24,}}>Furto</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              style={{left: 2, backgroundColor: corAssalto, width: 140, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 30,}}
              onPress={() => {
                setCorAssalto(
                  corAssalto === 'gray'
                  ? 'blue'
                  : 'gray'
                );
                setCorFurto('gray')
              }}
              >
                <Text style={{color:'white', fontSize: 24,}}>Assalto</Text>
              </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{right: 2, backgroundColor: 'gray', width: 140, height: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 30,}}>
                <Text style={{color:'white', fontSize: 20, textAlign: 'center'}}>Eu sofri furto/assalto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{left: 2, backgroundColor: 'gray', width: 140, height: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 30,}}>
                <Text style={{color:'white', fontSize: 20, textAlign: 'center'}}>Eu vi algúem sofrendo furto/assalto</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      <View style={styles.rodape}>
        <TouchableOpacity 
        style={styles.button}
        onPress={() => {setShow(true)}}
        >
          <Text style={styles.textButton}>Realizar Ocorrência</Text>
        </TouchableOpacity>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 25,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    padding: 1,
    width: '100%',
    height: '75%',
  },
  cabecalho:{
    padding: 1,
    backgroundColor: 'gray',
    width: '100%',
    height: '12%',
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  rodape:{
    backgroundColor: 'black',
    width: '100%',
    height: '12%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton:{
    color: '#FFF',
    fontSize: 20,
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 20,
    height: 60,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 5,
  },
  viewBotoesGeral: {
    backgroundColor: '#000000aa', 
    flex: 1,
  },
  viewBotoesGeral2: {
    backgroundColor: '#FFF', 
    width: 300, 
    height: 550, 
    margin: 35, 
    padding: 40, 
    alignItems: 'center', 
    borderRadius: 10,
  },
  bntClose: {
    justifyContent: 'center', 
    backgroundColor: 'white', 
    bottom: 25, 
    left: 120, 
    width: 20, 
    height: 20,
  },
  viewCarroEMoto:{
    flexDirection: 'row', 
    padding: 40,
  },
  btnCarro:{
    right: 10, 
    width: 120, 
    height: 120, 
    backgroundColor: 'gray', 
    borderRadius: 50, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  imgCarro:{
    padding: 10, 
    height: 100, 
    width: 100, 
    bottom: 20,
  },
  btnMoto:{
    left: 10, 
    padding: 10, 
    width: 120, 
    height:120, 
    backgroundColor: 'gray', 
    borderRadius: 50, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  imgMoto:{
    padding: 10, 
    height: 100, 
    width: 100,
  },
  btnFurtoOuAssalto:{
    flexDirection: 'row', 
    padding: 20,
  },
  


});
