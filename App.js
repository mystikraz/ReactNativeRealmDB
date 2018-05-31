/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet, Platform, View, Image, Text, TextInput, TouchableOpacity, Alert
} from 'react-native';
var Realm=require('realm');
let realm;

type Props = {};
export default class App extends Component<Props> {
  
  constructor(){
    super();
    this.state={
      Student_Name:'',
      Student_Class:'',
      Student_Subject:'',
      Student_Interest:'',
    }

    realm=new Realm({
      schema:[{name:'Student_Info',
      properties:{
        student_id:{type:'int',default:0},
        student_name:'string',
        student_class:'string',
        student_subject:'string',
        student_interest:'string',
        student_test:'string',
      }}], schemaVersion:3
    });
    // const Student_Info={
    //   name:'Student_Info',
    //   properties:{
    //        student_id:{type:'int',default:0},
    //     student_name:'string',
    //     student_class:'string',
    //     student_subject:'string',
    //   }
    // };



    // let realmSchema=new Realm({schema:[Student_Info], schemaVersion:1});
  }
  

  add_Student=()=>{
    realm.write(()=>{
      var ID=realm.objects('Student_Info').length+1;

      realm.create('Student_Info',{
        student_id:ID,
        student_name:this.state.Student_Name,
        student_class:this.state.Student_Class,
        student_subject:this.state.Student_Subject,
        student_interest:this.state.Student_Interest,
      });
    });
    Alert.alert("Student details added sucessfully.");
  }
  render() {

    var A=realm.objects('Student_Info');
    var myJSON=JSON.stringify(A);

    return (
     <View style={styles.MainContainer}>
          
          <TextInput 
                placeholder="Enter Student Name"
                style = { styles.TextInputStyle } 
                underlineColorAndroid = "transparent" 
                onChangeText = { ( text ) => { this.setState({ Student_Name: text })} } 
              />
 
          <TextInput  
                placeholder="Enter Student Class"
                style = { styles.TextInputStyle } 
                underlineColorAndroid = "transparent" 
                onChangeText = { ( text ) => { this.setState({ Student_Class: text })} } 
              />
 
          <TextInput 
                placeholder="Enter Student Subject"
                style = { styles.TextInputStyle } 
                underlineColorAndroid = "transparent" 
                onChangeText = { ( text ) => { this.setState({ Student_Subject: text })} } 
              />
          <TextInput 
                placeholder="Enter Student Interest"
                style = { styles.TextInputStyle } 
                underlineColorAndroid = "transparent" 
                onChangeText = { ( text ) => { this.setState({ Student_Interest: text })} } 
              />
 
 
          <TouchableOpacity onPress={this.add_Student} activeOpacity={0.7} style={styles.button} >
 
            <Text style={styles.TextStyle}> CLICK HERE TO ADD STUDENT DETAILS </Text>
 
          </TouchableOpacity>
 
 
          <Text style={{marginTop: 10}}>{myJSON}</Text>
 
             
        </View>
    );
  }
}

const styles = StyleSheet.create({
  
MainContainer :
{

  flex:1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
  margin: 10
  
},

TextInputStyle:
  {
    borderWidth: 1,
    borderColor: '#009688',
    width: '100%',
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
  },

button: {
  
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius:7,
    marginTop: 12
  },
   
TextStyle:{
    color:'#fff',
    textAlign:'center',
  }
  
});