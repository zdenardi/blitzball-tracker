import React, {useEffect} from 'react';

import { Image, StyleSheet,View } from 'react-native';

interface RunnerProps {
    runners:number[]
}
/**
 * Creates the baseball diamond and deals with changing if the base is populated or not
 * @param props 
 * @returns 
 */
export default function BaseballDiamond(props:RunnerProps){
    const {runners} = props
    useEffect(()=>{
    },[runners])
    
    function shouldPopulate(baseNumber :number){
        if(runners.includes(baseNumber)){
            return{
                backgroundColor:'yellow'
            }
        }
    }

    
    const styles=StyleSheet.create({
        field:{
            marginTop:50,
            marginBottom:50,
            margin:'auto',
            width: 250,
            height: 250,
            backgroundColor: "white",
            borderBlockColor:"black",
            borderWidth: 2,
            transform: [{rotate:'45deg'}],
            position:"relative",
          },
          firstBase:{
            width: 50,
            height: 50,
            borderBlockColor:"black",
            borderWidth: 2,
            position:"absolute",
            top:0,
            bottom:0,
            right:0
          },
          secondBase:{
            width: 50,
            height: 50,
            borderBlockColor:"black",
            borderWidth: 2,
            position:"absolute",
            top:0,
            bottom:0,
          },
          thirdBase:{
            width: 50,
            height: 50,
            borderBlockColor:"black",
            borderWidth: 2,
            position:"absolute",
            bottom:0,
          },
    })
    return(
    <View style={styles.field}>
        <View style={[styles.firstBase, shouldPopulate(1)]}/>
        <View style={[styles.secondBase,shouldPopulate(2)]}/>
        <View style={[styles.thirdBase,shouldPopulate(3)]}/>
    </View>
    )
}