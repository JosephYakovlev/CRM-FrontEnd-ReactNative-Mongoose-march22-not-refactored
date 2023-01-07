import { StyleSheet, Text, View, Image, TouchableOpacity,ImageBackground, Modal, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import React, {useState} from 'react';


    const windowWidth = Dimensions.get('window').width;




    const BuilderDefenseBar = ({navigation}) => {

        const routeYourRunningContractsPage = () =>{
            navigation.navigate('YourRunningContractsPage')
        }
    
    
        const routeBuildingObjectsPage = () =>{
            navigation.navigate('BuildingObjectsPage')
        }
    
        const routeYourBrigadesPeoplePage = () =>{
            navigation.navigate('YourBrigadesPeoplePage')
        }

         const [showAddPhotoModal, setShowAddPhotoModal] = useState(false)

        const showModalOne = () =>{
            setShowAddPhotoModal(true)
        }
  
        const hideModalOne = () => {
            setShowAddPhotoModal(false)
        }

    


  return (
    <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', width: '96%', alignSelf: 'center'}}>
        <View style={{justifyContent: 'center', alignItems:'center', width: '43%'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold' }}>
            З А Щ И Щ Е Н О
            </Text>
        </View>

        <View style={{ alignItems: 'center', width: '14%'}}>
            <Image source ={require('../../../assets/crm/logo.png')} style={{
                height: 50,
                width: 38,
                marginBottom: 3,
            }} />
        </View>

        <View style={{ justifyContent: 'center',  alignItems:'center', width: '43%'}}>
            <Text style={{fontSize: 23, fontWeight: 'bold' }}>
            B U I L D E R
            </Text>
        </View>
    </View>
    );
};


export default BuilderDefenseBar;

const styles = StyleSheet.create({
    categoryBarPart:{
        width:'33%', 
        alignItems:'center', 
        justifyContent: 'center', 
        backgroundColor: 'lightblue', 
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1
    }
}) 
