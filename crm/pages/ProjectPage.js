import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground, Modal,TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { BrigadeCard } from '../fetchedcards/BrigadeCard';
import { ProcessConractorsFetch } from '../components/ProcessContractorsFetch';

const windowWidth = Dimensions.get('window').width;

export default function ProjectPage(workflow) {

    
    

    const currentWorkFlow = workflow.route.params.workflow

    const currentObject = workflow.route.params.object


    
      
    const navigation = useNavigation();

    const routeWorkersSchedule = () =>{
        navigation.navigate('WorkersSchedule')
    }

    const routeMaterialsSchedule = () =>{
        navigation.navigate('MaterialsSchedule')
    }

    const routeRequestBrigadePage = () =>{
        navigation.navigate('RequestBrigadePage')
    }

    const [showModalAddWorkers, setShowModalAddWorkers] = useState(false)
    const [showModalAddMaterials, setShowModalAddMaterials] = useState(false)
    const [showModalRedactMaterials, setShowModalRedactMaterials] = useState(false)

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

    const showModRedactMaterials = () =>{
        setShowModalRedactMaterials(true)
    }
  
    const hideModRedactMAterials= () => {
        setShowModalRedactMaterials(false)
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
          <View style={styles.modalInnerAddWorkers}>
          <View style={{alignItems: 'center', justifyContent: 'center', padding: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 25}}>
              Добавить бригаду
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

            <TouchableOpacity onPress={routeRequestBrigadePage} style={{alignSelf: 'center', backgroundColor: 'lightgrey', height: 40, width: '80%', borderWidth: 1, borderRadius: 5, alignItems:'center', justifyContent: 'center'}}>
                <View>
                    <Text style={{fontSize: 20}}>
                        Отправить приглашение
                    </Text>
                </View>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
    </Modal>

    



























    <Modal 
        visible={showModalRedactMaterials}  
        transparent
        onRequestClose = {()=>
          setShowModalRedactMaterials(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideModRedactMAterials}>
            <View style={styles.modalInnerRedactMaterials}>
                <View style={{alignItems: 'center', justifyContent: 'center', padding: 5}}>
                    <Text style={{fontWeight: 'bold', fontSize: 25}}>
                        Редактировать 
                    </Text>
                    <Text style={{fontWeight: '500', fontSize: 18}}>
                        список материалов
                    </Text>
                </View>
                <View style={{width:'90%',margin:'5%',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{flexDirection: 'column', width: '95%'}}>
                        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                            <Text style={{ fontSize: 18,left: 5 }}>
                                Газоблок:
                            </Text>

                            <Text style={{color: 'green', fontSize: 18, left: 10}}>
                                (2147/3000)
                            </Text> 
                        </View>

                        <Text>
                             Израсходовано:
                        </Text>

                        <TextInput
                            
                            placeholder="2157"
                            iconType="user"
                            autoCapitalize="none"
                            autoCorrect={false} 
                            style={styles.input}
                        />

                        <Text>
                             Кем:
                        </Text>

                        <TextInput
                            
                            placeholder="Бригада 1"
                            iconType="user"
                            autoCapitalize="none"
                            autoCorrect={false} 
                            style={styles.input}
                        />

                        <Text>
                            План на процесс
                        </Text>

                        <TextInput
                            
                            placeholder="3000"
                            iconType="user"
                            autoCapitalize="none"
                            autoCorrect={false} 
                            style={styles.input}
                        />

                        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                            <Text style={{ fontSize: 18,left: 5 }}>
                                Клей:
                            </Text>

                            <Text style={{color: 'orange', fontSize: 18, left: 10}}>
                                (1200/1300)
                            </Text> 
                        </View>

                        <Text>
                             Израсходовано:
                        </Text>

                        <TextInput
                            
                            placeholder="1200"
                            iconType="user"
                            autoCapitalize="none"
                            autoCorrect={false} 
                            style={styles.input}
                        />
                        <Text>
                             Кем:
                        </Text>

                        <TextInput
                            placeholder="Бригада 1"
                            iconType="user"
                            autoCapitalize="none"
                            autoCorrect={false} 
                            style={styles.input}
                        />

                        <Text>
                            План на процесс
                        </Text>

                        <TextInput
                            
                            placeholder="1300"
                            iconType="user"
                            autoCapitalize="none"
                            autoCorrect={false} 
                            style={styles.input}
                        />

                        <TouchableOpacity onPress={routeMaterialsSchedule} style={{alignSelf: 'center'}}>   
                            <Text style={{color: 'blue', left: 5,fontSize: 18}}>
                                Журнал Расхода
                            </Text>
                        </TouchableOpacity>
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
          <View style={styles.modalInnerAddMaterials}>
          <View style={{alignItems: 'center', justifyContent: 'center', padding: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 25}}>
                Поставить материалы
            </Text>
            <Text style={{fontWeight: '500', fontSize: 18}}>
                на площадку
            </Text>
          </View>

            <Text style={{fontSize: 17, left: 10}}>
                        Факт:
            </Text>

            <View style={{ flexDirection:'row', left: 10}}>
                <Text style={{color: 'grey',fontSize:17}}>
                    (израсходовано
                </Text>
                <Text style={{color: 'green',fontSize:17}}>
                    /на площадке
                </Text>
                <Text style={{color: 'blue',fontSize:17}}>
                    /план)
                </Text>
            </View> 
          
            <View style={{width:'90%',margin:'5%',justifyContent:'space-between',alignItems:'center'}}>
                    
                    
                    
                    <View style={{flexDirection: 'column', width: '95%'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ fontSize: 16,left: 5 }}>
                                Газоблок:
                            </Text>

                            <View style={{alignSelf: 'center', flexDirection:'row', left: 10}}>
                                <Text style={{color: 'grey',fontSize:17}}>
                                    (2147
                                </Text>
                                <Text style={{color: 'green',fontSize:17}}>
                                    /2500
                                </Text>
                                <Text style={{color: 'blue',fontSize:17}}>
                                    /3000)
                                </Text>
                            </View> 
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ fontSize: 16,left: 5 }}>
                                Клей:
                            </Text>

                            <View style={{alignSelf: 'center', flexDirection:'row', left: 10}}>
                                <Text style={{color: 'grey',fontSize:17}}>
                                    (1200
                                </Text>
                                <Text style={{color: 'green',fontSize:17}}>
                                    /1300
                                </Text>
                                <Text style={{color: 'blue',fontSize:17}}>
                                    /1300)
                                </Text>
                            </View> 
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ fontSize: 16,left: 5 }}>
                                Шпателя:
                            </Text>

                            <View style={{alignSelf: 'center', flexDirection:'row', left: 10}}>
                                <Text style={{color: 'grey',fontSize:17}}>
                                    (150
                                </Text>
                                <Text style={{color: 'green',fontSize:17}}>
                                    /200
                                </Text>
                                <Text style={{color: 'blue',fontSize:17}}>
                                    /300)
                                </Text>
                            </View> 
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ fontSize: 16,left: 5 }}>
                                Уровни:
                            </Text>

                            <View style={{alignSelf: 'center', flexDirection:'row', left: 10}}>
                                <Text style={{color: 'grey',fontSize:17}}>
                                    (20
                                </Text>
                                <Text style={{color: 'green',fontSize:17}}>
                                    /1300
                                </Text>
                                <Text style={{color: 'blue',fontSize:17}}>
                                    /30)
                                </Text>
                            </View> 
                        </View>

                        <TouchableOpacity onPress={routeMaterialsSchedule}>   
                            <Text style={{color: 'blue', left: 5}}>
                                Журнал Расхода
                            </Text>
                        </TouchableOpacity>
                    </View>
            
            
            
            
            <View style={{width:'90%',margin:'5%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <View style={{flexDirection:'column',width:'50%', alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'500'}}>
                        Штат
                    </Text>
                    <Image source ={require('../../../assets/crm/icons/sklad.png')} style={{
                                        width: '67%',
                                        height: 113,
                                        borderRadius: 5,         
                }}/>
                </View>
                <View style={{flexDirection:'column',width:'50%', alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'500'}}>
                        Поиск ~15км
                    </Text>
                    <Image source ={require('../../../assets/crm/icons/marketplace.jpg')} style={{
                                        width: '70%',
                                        height: 113,
                                        borderRadius: 5,         
                    }}/>
                </View>
            </View>

            <TouchableOpacity style={{alignSelf: 'center', backgroundColor: 'lightgrey', height: 40, width: '80%', borderWidth: 1, borderRadius: 5, alignItems:'center', justifyContent: 'center'}}>
                <View>
                    <Text style={{fontSize: 20}}>
                        Выставить на торги
                    </Text>
                </View>
            </TouchableOpacity>

          </View>
         
           
          </View>
        </TouchableOpacity>
    </Modal>

























        <View style={{position: 'absolute', top: 0, width: '100%'}}>          
            <View style={styles.profilebar}>
                <View style={{flexDirection: 'row'}}>

                    <Text style={{fontSize: 16}}>
                        id процесса:
                    </Text>

                    <Text style={{fontSize: 16, color: 'blue', marginLeft: 5}}>
                        {currentWorkFlow._id}
                    </Text>

                </View>
            </View>

            <View style={styles.projectPlace}>
                <View style={{width: `${windowWidth}`/3,flexDirection: 'column'}}>
                    <Text style={{fontSize: 18, alignSelf: 'center'}}>
                        {currentObject.mainTitle}
                    </Text>
                
                    <Image source ={require('../../../assets/crm/icons/villa1.jpg')} style={{
                                            alignSelf: 'center',
                                            width: '100%',
                                            height: `${windowWidth}`/5,
                                            margin: 10
                    }}/>
                </View>

                <View style={{flexDirection: 'column', width: '15%', alignItems: 'center'}}>
                    <View style={{width: 5, backgroundColor: 'green',minHeight: 110, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{borderRadius: 11, minWidth: 22, minHeight: 22,backgroundColor: 'green' }}>
                            <Text style={{alignSelf: 'center', fontSize: 15, color: 'white'}}>
                                1
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{flexDirection: 'column', width: '50%', padding: 5}}>
                    <View style={{width: '100%', minHeight: 90, borderColor: 'grey',borderWidth: 1, borderRadius: 5}}>
                        <Text style={{alignSelf: 'center',fontSize: 16}}>
                            {currentWorkFlow.mainTitle}
                        </Text>

                        <View style={{flexDirection: 'row'}}>

                            <Text style={{fontSize: 17}}>
                                Статус:
                            </Text>

                            <Text style={{fontSize: 16, color: 'blue'}}>
                                В поиске подр.
                            </Text>

                        </View>

                        <View style={{flexDirection: 'row'}}>

                            <Text style={{fontSize: 16}}>
                                План:
                            </Text>

                            <Text style={{fontSize: 16, color: 'green'}}>
                                50 000 руб.
                            </Text>

                        </View>

                        <View style={{flexDirection: 'row'}}>

                            <Text style={{fontSize: 16}}>
                                Факт:
                            </Text>

                            <Text style={{fontSize: 16, color: 'green'}}>
                                0 руб.
                            </Text>

                        </View>
                    </View>
                </View>

            </View>

            <View style={{width: '100%',height: 32, backgroundColor: 'white',flexDirection: 'row',paddingHorizontal: '5%'}}>
                <View style={{width:'60%',flexDirection: 'column'}}>
                    <View style={{width:'100%',flexDirection: 'column',backgroundColor: 'orange', height: 8}}>
                        <View style={{ flexDirection: 'column',minHeight:40,top: -25,left: -3 }}>
                            <Text style={{left: -10}}>
                                {currentWorkFlow.start}
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
                            {/* <Text >
                                09.04.2022
                            </Text>
                            <View style={{borderRadius: 9, width: 18, height: 18,backgroundColor: 'orange'}}>
                                
                            </View>
                            <Text >
                                60% 
                            </Text> */}
                        </View>
                        <View style={{ flexDirection: 'column',minHeight:40, alignItems:'center',top: -25,right: -30 }}>
                            <Text style={{right: 10}} >
                                {currentWorkFlow.end}
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

            <View style={{height: 170, backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{ fontSize: 16,left: 5 }}>
                        Ответственный:
                    </Text>

                    {currentWorkFlow.leader ? <Text style={{color: 'blue', fontSize: 16, left: 10}}>
                        {currentWorkFlow.leader}
                    </Text> 
                        :
                    <Text style={{color: 'blue', fontSize: 16, left: 10}}>
                        НАЗНАЧИТЬ
                    </Text> }
                </View>
                
                <Text style={{alignSelf: 'center', fontSize: 18}}>
                    Сырье:
                </Text>

                <View style={{alignSelf: 'center', flexDirection:'row'}}>
                    <Text style={{color: 'grey',fontSize:17}}>
                        (израсходовано
                    </Text>
                    <Text style={{color: 'green',fontSize:17}}>
                        /на площадке
                    </Text>
                    <Text style={{color: 'blue',fontSize:17}}>
                        /план)
                    </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', width: '70%'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ fontSize: 16,left: 5 }}>
                                Бюджет:
                            </Text>

                            <View style={{alignSelf: 'center', flexDirection:'row'}}>
                                <Text style={{color: 'grey',fontSize:17}}>
                                    (0
                                </Text>
                                <Text style={{color: 'blue',fontSize:17}}>
                                    /50 000руб.)
                                </Text>
                            </View> 
                        </View>


                        <TouchableOpacity onPress={routeMaterialsSchedule}>   
                            <Text style={{color: 'blue', left: 5}}>
                                Журнал Расхода
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={showModRedactMaterials} style={{marginHorizontal: 5,marginVertical: 3,alignSelf: 'center',alignItems: 'center',justifyContent: 'center', backgroundColor: 'lightblue', borderWidth: 1,borderRadius: 5, width: '100%'}}>
                            <Text>
                                Редактировать
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showModAddMaterials} style={{marginHorizontal: 5,marginVertical: 3,alignSelf: 'center',alignItems: 'center',justifyContent: 'center', backgroundColor: 'lightblue', borderWidth: 1,borderRadius: 5, width: '100%'}}>
                            <Text>
                                Поставить 
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                
            </View>
            </View>

            <View style={{marginTop: 335, minHeight: 100}}>
                <ProcessConractorsFetch workflow = {currentWorkFlow} />

            </View>



        </View>
    );
}

const styles = StyleSheet.create({
   container: {
        height: '100%'
   },
   profilebar: {
        width: '100%',
        height: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    projectPlace: {
        width: '100%',
        height: 150,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    modalInnerRedactMaterials:{
        width: '80%',
        height: '80%',
        flexDirection: 'column',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10
     },
     modalInnerAddMaterials:{
        width: '90%',
        height: '70%',
        flexDirection: 'column',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10
     },
     modalInnerAddWorkers:{
        width: '90%',
        height: '45%',
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
    input: {
        width: '100%',
        margin: 5,
        padding: 2,
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        borderBottomWidth: 1
    },
});

