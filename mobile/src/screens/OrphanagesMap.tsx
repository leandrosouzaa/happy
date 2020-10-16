import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import {Feather} from '@expo/vector-icons';

import mapMarker from '../images/map-marker.png';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface OrphanageProps {
   name: string;
   id: number,
   latitude: number,
   longitude: number
}

const OrphanagesMap: React.FC = () => {
   const navigation = useNavigation();
   const [orphanages, setOrphanages] = useState<OrphanageProps[]>([])

   useEffect(() => {
      api.get('/orphanages').then(res => {
         setOrphanages(res.data)
      }).catch(err => {
         alert("Erro durante a listagem.")
      })
   }, [])
   
   function handleNavigateToOrphanageDetails(id: number) {
      navigation.navigate('OrphanageDetails', {id});
   }

   function handleNavigateToCreateOrphanage() {
      navigation.navigate('SelectMapPosition');
   }

   
   return (
      <View style={styles.container}>
         <MapView
            provider='google'  
            style={styles.map} 
            initialRegion={{latitude: -21.8813806, longitude:-51.8389792, latitudeDelta: 0.008, longitudeDelta: 0.008}}
         >
            {orphanages.map(item => {
               return (
                  <Marker
                  key={item.id}
                  icon={mapMarker}
                  calloutAnchor={{
                     x: 2.7,
                     y: 0.8
                  }}
                  coordinate={{
                     latitude: item.latitude, 
                     longitude: item.longitude
                  }}
                  >
                     <Callout tooltip onPress={() => {handleNavigateToOrphanageDetails(item.id)}}>
                        <View style={styles.calloutContainer}>
                           <Text style={styles.calloutText}>{item.name}</Text>
                        </View>
                     </Callout>
                  </Marker>
               )
            })}
         </MapView>
         <View style={styles.footer}>
            <Text style={styles.footerText}> {orphanages.length} orfanatos encontrados</Text>
            <RectButton
               style={styles.createOrphanageButton}
               onPress={() => {handleNavigateToCreateOrphanage()}}
            >
               <Feather name="plus" size={20} color="#FFF"/>
            </RectButton>
         </View>
      </View>
      );
   }
   
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
   },
   calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 14,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 16,
      justifyContent: 'center',
   },
   calloutText: {
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold'
      
   },
   footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
      
      backgroundColor: '#fff',
      borderRadius: 28,
      height: 56,
      paddingLeft: 24,
      
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      
      elevation: 3,
   },
   footerText: {
      color: '#8fa7b3',
      fontFamily: 'Nunito_700Bold'
   },
   createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 28,
      
      justifyContent: 'center',
      alignItems: 'center'
   }
});

export default OrphanagesMap