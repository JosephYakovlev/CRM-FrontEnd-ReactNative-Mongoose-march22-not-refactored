import { StyleSheet, Text, View, Image, TouchableOpacity,ImageBackground, Modal, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';


    


    const windowWidth = Dimensions.get('window').width;
   



    const CRMCategoriesBar = () => {

        const navigation = useNavigation();

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
        <View style={{width:'100%', flexDirection: 'row', marginBottom: 5}}>
            <TouchableOpacity onPress={routeBuildingObjectsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey'}}>
                <Text>
                    Ваши
                </Text>
    
                <Text>
                    Объекты
                </Text>
            </TouchableOpacity> 

            <TouchableOpacity onPress={routeYourBrigadesPeoplePage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey'}}>
                <Text>
                    Ваши
                </Text>
                <Text>
                    Бригады
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={routeYourRunningContractsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightblue', width: '34%', borderLeftWidth: 0}}>
                <Text>
                    Ваши
                </Text>
                <Text>
                    Контракты
                </Text>
            </TouchableOpacity>

        </View>

    );
};


export default CRMCategoriesBar;

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
