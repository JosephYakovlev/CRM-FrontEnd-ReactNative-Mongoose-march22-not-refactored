import { StyleSheet, Text, View, Image, TouchableOpacity,ImageBackground, Modal, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import React, {useState, useContext} from 'react';
import {Context as AuthContext} from '../../../context/AuthContext';


    const windowWidth = Dimensions.get('window').width;
    



    const CRMContractTypesBar = ({navigation}) => {

        const state1 = useContext(AuthContext)
        const contextUser = state1.state.user.user.userDump

        


        const routeRegister = () =>{
            navigation.navigate('Registration')
        }

        const routeUserPage = () =>{
            navigation.navigate('UserPage')
        }

         const [showAddPhotoModal, setShowAddPhotoModal] = useState(false)

        const showModalOne = () =>{
            setShowAddPhotoModal(true)
        }
  
        const hideModalOne = () => {
            setShowAddPhotoModal(false)
        }

   


  return (
    <View style={styles.ProfileBar}>
        <ScrollView  horizontal={true}  style={{flexDirection: 'row', width:'100%'}}>

            <TouchableOpacity style={{width: 170, backgroundColor: 'lightgreen', borderLeftWidth:0, borderRightWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 18}}>
                    Ваши 
                </Text>
                <Text style={{fontSize: 18}}>
                    объявления
                </Text>

                <View style={{position:'absolute',height: 25, width: 25, borderRadius: 13, backgroundColor: 'red', borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center', top: 1, right: 5}}>
                                <Text style={{color: 'white', fontSize: 14}}>
                                    1
                                </Text>
                            </View>

            </TouchableOpacity>

            <TouchableOpacity style={{width: 170, backgroundColor: 'lightgrey', borderLeftWidth:0, borderRightWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 18}}>
                    Активные
                </Text>

                <View style={{position:'absolute',height: 25, width: 25, borderRadius: 13, backgroundColor: 'red', borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center', top: 1, right: 5}}>
                                <Text style={{color: 'white', fontSize: 14}}>
                                    1
                                </Text>
                            </View>
            </TouchableOpacity>

            <TouchableOpacity style={{width: 170, backgroundColor: 'lightgrey', borderLeftWidth:0, borderRightWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>
                    В процессе
                </Text>
                <Text style={{fontSize: 16}}>
                    заключения
                </Text>

                <View style={{position:'absolute',height: 25, width: 25, borderRadius: 13, backgroundColor: 'red', borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center', top: 1, right: 5}}>
                                <Text style={{color: 'white', fontSize: 14}}>
                                  1  
                                </Text>
                            </View>
            </TouchableOpacity>

            <TouchableOpacity style={{width: 170, backgroundColor: 'lightgrey', borderLeftWidth:0, borderRightWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 18}}>
                    Исходящие
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width: 170, backgroundColor: 'lightgrey', borderLeftWidth:0, borderRightWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 18}}>
                    Завершенные
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width: 170, backgroundColor: 'lightgrey', borderLeftWidth:0, borderRightWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 18}}>
                    Будущие
                </Text>
            </TouchableOpacity>
        </ScrollView>
      
    </View>
  );
};

export default CRMContractTypesBar;

const styles = StyleSheet.create({
    ProfileBar:{
        backgroundColor: 'white',
        height: 50,
        width: windowWidth,
        borderColor: '#31383e',
        borderTopWidth: 2,
        borderBottomWidth: 2
        
    },
});
