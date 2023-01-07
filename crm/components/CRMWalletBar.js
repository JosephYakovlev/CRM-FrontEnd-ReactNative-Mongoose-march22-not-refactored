import { StyleSheet, Text, View, Image, TouchableOpacity,ImageBackground, Modal, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import React, {useState, useContext} from 'react';
import {Context as AuthContext} from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NormalizeNumHook } from '../../hooks/NormalizeNumHook';


    const windowWidth = Dimensions.get('window').width;
   



    const CRMWalletBar = () => {

        const state1 = useContext(AuthContext)
        const contextUser = state1.state.user.user.userDump

        const navigation = useNavigation();

        const routeAddMoneyPage = () =>{
            navigation.navigate('WalletPage')
        }

         const [showAddPhotoModal, setShowAddPhotoModal] = useState(false)

        const showModalOne = () =>{
            setShowAddPhotoModal(true)
        }
  
        const hideModalOne = () => {
            setShowAddPhotoModal(false)
        }

       


  return (
    <TouchableOpacity onPress={routeAddMoneyPage} style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between',marginHorizontal: 5}}>
    
        <View style={{ justifyContent: 'center',  alignItems:'center', flexDirection: 'row'}}>

            <Image source ={require('../../../assets/crm/wallet.jpg')} style={{
                height: 40,
                width: 50,
                marginBottom: 3,
            }} />

            <Text style={{fontSize: 17, fontWeight: '600',color: 'black' }}>
                Кошелек:
            </Text>

        </View>
        
        
        <View style={{justifyContent: 'center', alignItems:'center', flexDirection: 'row'}}>

            

            <Text style={{fontSize: 20, fontWeight: '600', color: 'green', marginLeft: 5 }}>
                {NormalizeNumHook(contextUser.wallet)}.00
            </Text>

            <Text style={{fontSize: 17, fontWeight: '600', marginLeft: 5, color: 'black' }}>
                Руб.
            </Text>
        </View>

</TouchableOpacity>

    );
};


export default CRMWalletBar;

const styles = StyleSheet.create({
    addButtonLeft:{
        alignItems: 'center', 
        justifyContent: 'center', 
        width:'50%',
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        minHeight: 50,
        backgroundColor: 'lightgrey',
    },
    addButtonRight:{
      alignItems: 'center', 
      justifyContent: 'center', 
      width:'50%',
      borderWidth: 1,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      minHeight: 50,
      backgroundColor: 'lightgrey',
  }
}) 
