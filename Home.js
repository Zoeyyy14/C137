import React ,{Component}from 'react';
import { StyleSheet, Text, View, FlatList, Alert, SafeAreaView } from 'react-native';
import {ListItem} from "react-native-elements"
import axios from "axios"
export default class HomeScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            listData:[],
            url:"http://localhost:19006/"
        }
    }
    getPlanets=()=>{
        const{url}=this.state 
        axios.get(url).then(response=>{
            return this.setState({
                listData:response.data.data
            })
        })
        .catch(e=>{
            Alert.alert(e.message)
        })
    }
    componentDidMount(){
        this.getPlanets()
    }
    renderItem=({item,index})=>{
        <ListItem key={index}
        title={`Planet : ${item.name}`}
        subtitle={`Distance from earth:${item.distance_from_earth}`}
        titleStyle={{formSize:18, fontWeight:"bold", color:"purple"}}
        containerStyle={{backgroundColor:"white"}}
        bottomDivider
        chevron
        ></ListItem>
    }
    keyExtractor=(item,index)=>index.toString()
    render(){
        const{listData}=this.state
        return(
            <View style={{flex:1, background:"blue"}}>
                <SafeAreaView/>
                <View style={{flex:0.1, justifyContent:"center", alignItem:"center"}}>
                    <Text style={{fontSize:30, fontWeight:"bold",color:"black"}}>
                        Planet World</Text>
                        </View>
                        <FlatList keyExtractor={this.keyExtractor}
                        data={this.state.listData}
                        renderItem={this.render}/>
            </View>
        )

    }
}