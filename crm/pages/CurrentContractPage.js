import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;


export default function CurrentContractPage() {
      
    const navigation = useNavigation();

    const routeWorkersSchedule = () =>{
        navigation.navigate('WorkersSchedule')
    }

    const routeMaterialsSchedule = () =>{
        navigation.navigate('MaterialsSchedule')
    }

    const [showModalAddWorkers, setShowModalAddWorkers] = useState(false)
    const [showModalAddMaterials, setShowModalAddMaterials] = useState(false)

    const showModAddWorkers = () =>{
        setShowModalAddWorkers(true)
      }
  
      const hideModAddWorkers = () => {
        setShowModalAddWorkers(false)
      }

      const showModAddMaterials = () =>{
        setShowModalAddMaterials(true)
      }
  
      const hideModAddMAterials= () => {
        setShowModalAddMaterials(false)
      }
    
    return (
        <View style={styles.container}>

        




































    <Modal 
        visible={showModalAddWorkers}  
        transparent
        onRequestClose = {()=>
          setShowModalAddWorkers(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideModAddWorkers}>
          <View style={styles.modalInner}>
          <View style={{alignItems: 'center', justifyContent: 'center', padding: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 25}}>
              Добавить людей
            </Text>
          </View>

          <View style={{width:'90%',margin:'5%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <View style={{flexDirection:'column',width:'50%', alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:18,fontWeight:'500'}}>
                    Штат
                </Text>
                <Image source ={require('../../../assets/crm/icons/shtat.jpg')} style={{
                                      width: '67%',
                                      height: 113,
                                      borderRadius: 5,         
            }}/>
            </View>
            <View style={{flexDirection:'column',width:'50%', alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:18,fontWeight:'500'}}>
                    Поиск ~15км
                </Text>
                <Image source ={require('../../../assets/crm/icons/map.jpg')} style={{
                                    width: '70%',
                                    height: 113,
                                    borderRadius: 5,         
                }}/>
            </View>
          </View>

          </View>
        </TouchableOpacity>
    </Modal>





























    <Modal 
        visible={showModalAddMaterials}  
        transparent
        onRequestClose = {()=>
          setShowModalAddMaterials(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideModAddMAterials}>
          <View style={styles.modalInner}>
          <View style={{alignItems: 'center', justifyContent: 'center', padding: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 25}}>
              Добавить материалы
            </Text>
          </View>
          <View style={{width:'90%',margin:'5%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <View style={{flexDirection:'column',width:'50%', alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:18,fontWeight:'500'}}>
                    Ваш склад
                </Text>
                <Image source ={require('../../../assets/crm/icons/sklad.png')} style={{
                                      width: '74%',
                                      height: 133,
                                      borderRadius: 5,         
            }}/>
            </View>
            <View style={{flexDirection:'column',width:'50%', alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:18,fontWeight:'500'}}>
                    Маркетплейс
                </Text>
                <Image source ={require('../../../assets/crm/icons/marketplace.jpg')} style={{
                                    width: '74%',
                                    height: 133,
                                    borderRadius: 5,         
                }}/>
            </View>
          </View>
         
           
          </View>
        </TouchableOpacity>
    </Modal>


























            <View style={styles.profilebar}>
                <View style={{left: 10, justifyContent: 'center'}}>
                   
                    <Text style={{fontSize: 18 }}>
                        Добро пожаловать,
                    </Text>

                    <Text style={{fontSize: 18, color: 'blue'}}>
                        Иосиф
                    </Text>

                </View>
            </View>

            <View style={styles.projectPlace}>
                <View style={{width: `${windowWidth}`/3,flexDirection: 'column'}}>
                    <Text style={{fontSize: 18, alignSelf: 'center'}}>
                        Villa 1
                    </Text>
                
                    <Image source ={require('../../../assets/crm/icons/villa1.jpg')} style={{
                                            alignSelf: 'center',
                                            width: '100%',
                                            height: `${windowWidth}`/5,
                                            margin: 10
                    }}/>
                </View>

                <View style={{flexDirection: 'column', width: '15%', alignItems: 'center'}}>
                    <View style={{width: 5, backgroundColor: 'orange',minHeight: 110, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{borderRadius: 11, minWidth: 22, minHeight: 22,backgroundColor: 'orange' }}>
                            <Text style={{alignSelf: 'center', fontSize: 15, color: 'white'}}>
                                3
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{flexDirection: 'column', width: '50%', padding: 5}}>
                    <View style={{width: '100%', minHeight: 90, borderColor: 'grey',borderWidth: 1, borderRadius: 5}}>
                        <Text style={{alignSelf: 'center',fontSize: 18}}>
                            Монтаж стен
                        </Text>

                        <View style={{flexDirection: 'row'}}>

                            <Text style={{fontSize: 16}}>
                                Статус:
                            </Text>

                            <Text style={{fontSize: 16, color: 'orange'}}>
                                В процессе
                            </Text>

                        </View>

                        <View style={{flexDirection: 'row'}}>

                            <Text style={{fontSize: 16}}>
                                План:
                            </Text>

                            <Text style={{fontSize: 16, color: 'orange'}}>
                                12 000 000 руб.
                            </Text>

                        </View>

                        <View style={{flexDirection: 'row'}}>

                            <Text style={{fontSize: 16}}>
                                Факт:
                            </Text>

                            <Text style={{fontSize: 16, color: 'green'}}>
                                6 000 000руб.
                            </Text>

                        </View>
                    </View>
                </View>

            </View>

            <View style={{width: '100%',minHeight: 50, backgroundColor: 'white',flexDirection: 'row',paddingHorizontal: '5%'}}>
                <View style={{width:'60%',flexDirection: 'column'}}>
                    <View style={{width:'100%',flexDirection: 'column',backgroundColor: 'green', height: 8}}>
                        <View style={{ flexDirection: 'column',minHeight:40,top: -25,left: -3 }}>
                            <Text style={{left: -10}}>
                                01.04.2022
                            </Text>
                            <View style={{borderRadius: 9, width: 18, height: 18,backgroundColor: 'green'}}>
                                
                            </View>
                            <Text style={{left: -10}}>
                               Старт
                            </Text>
                        </View>
                    </View>         
                </View>
                <View style={{width:'40%',flexDirection: 'column'}}>
                    <View style={{width:'100%',flexDirection: 'row',backgroundColor: 'orange', height: 8, justifyContent: 'space-between'}}>
                        <View style={{ flexDirection: 'column',minHeight:40, alignItems:'center',top: -25,left: -30 }}>
                            <Text >
                                09.04.2022
                            </Text>
                            <View style={{borderRadius: 9, width: 18, height: 18,backgroundColor: 'orange'}}>
                                
                            </View>
                            <Text >
                                60% 
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column',minHeight:40, alignItems:'center',top: -25,right: -30 }}>
                            <Text style={{right: 10}} >
                                14.04.2022
                            </Text>
                            <View style={{borderRadius: 9, width: 18, height: 18,backgroundColor: 'red'}}>
                                
                            </View>
                            <Text >
                                Финиш 
                            </Text>
                        </View>
                    </View>     
                </View>

            </View>

            <View style={{minHeight: 100, backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{ fontSize: 16,left: 5 }}>
                        Ответственный:
                    </Text>

                    <Text style={{color: 'blue', fontSize: 16, left: 10}}>
                        Калиниченко А.М.
                    </Text> 
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{ fontSize: 16,left: 5 }}>
                        Бригадир:
                    </Text>

                    <Text style={{color: 'green', fontSize: 16, left: 10}}>
                      Романенко С.М.
                    </Text> 
                </View>

                <Text style={{alignSelf: 'center', fontSize: 18}}>
                    Бригада:
                </Text>

                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', width: '70%'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ fontSize: 16,left: 5 }}>
                                Мастера:
                            </Text>

                            <Text style={{color: 'green', fontSize: 16, left: 10}}>
                                (10/10)
                            </Text> 
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ fontSize: 16,left: 5 }}>
                                Подсобные рабочие:
                            </Text>

                            <Text style={{color: 'red', fontSize: 16, left: 10}}>
                                (6/10)
                            </Text> 
                        </View>

                        <TouchableOpacity onPress={routeWorkersSchedule}>   
                            <Text style={{color: 'blue', left: 5}}>
                                Журнал посещений
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={showModAddWorkers} style={{margin: 10,alignItems: 'center',justifyContent: 'center', backgroundColor: 'lightblue', borderWidth: 1,borderRadius: 5, width: '25%'}}>
                        <Text>
                            Добавить 
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={{alignSelf: 'center', fontSize: 18}}>
                    Сырье:
                </Text>

                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', width: '70%'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ fontSize: 16,left: 5 }}>
                                Газоблок:
                            </Text>

                            <Text style={{color: 'green', fontSize: 16, left: 10}}>
                                (2147/3000)
                            </Text> 
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ fontSize: 16,left: 5 }}>
                                Клей:
                            </Text>

                            <Text style={{color: 'orange', fontSize: 16, left: 10}}>
                                (1200/1300)
                            </Text> 
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ fontSize: 16,left: 5 }}>
                                Шпателя:
                            </Text>

                            <Text style={{color: 'red', fontSize: 16, left: 10}}>
                                (290/300)
                            </Text> 
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ fontSize: 16,left: 5 }}>
                                Уровни:
                            </Text>

                            <Text style={{color: 'orange', fontSize: 16, left: 10}}>
                                (20/30)
                            </Text> 
                        </View>

                        <TouchableOpacity onPress={routeMaterialsSchedule}>   
                            <Text style={{color: 'blue', left: 5}}>
                                Журнал Расхода
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={showModAddMaterials} style={{marginHorizontal: 10,height: 40,alignSelf: 'center',alignItems: 'center',justifyContent: 'center', backgroundColor: 'lightblue', borderWidth: 1,borderRadius: 5, width: '25%'}}>
                        <Text>
                            Добавить 
                        </Text>
                    </TouchableOpacity>
                </View>
                

                
            </View>



            <ImageBackground source ={require('../../../assets/crm/backgroundlogo.png')} style={{
                                    position: 'absolute',
                                    width: 200,
                                    height: 270,
                                    top:'2%',
                                    right: -80
            }}>
                 
            </ImageBackground>


        </View>
    );
}

const styles = StyleSheet.create({
   container: {
        height: '100%'
   },
   profilebar: {
        width: '100%',
        minHeight: 120,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    projectPlace: {
        width: '100%',
        height: 150,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    modalInner:{
        height: '30%',
        flexDirection: 'column',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10
     },
     modalOne:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#00000099'
       },
});

