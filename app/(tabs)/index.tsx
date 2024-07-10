import { Image, StyleSheet,View } from 'react-native';
import React, {useState,useEffect} from 'react';

import {BlitzballSpin} from '@/components/BlitzballSpin'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from 'react-native-paper';
import BaseballDiamond from '@/components/BaseballDiamond';

export default function HomeScreen() {
  type Pitches = {
    strike:number;
    ball: number;
    total: number;
  }
  
  const emptyCount:Pitches = {
    strike:0,
    ball:0,
    total:0
  }
  const [pitches,setPitches] = useState(emptyCount)
  const [outs,setOuts] = useState(0)
  const [score,setScore] = useState(0)
  const [runners,setRunners] = useState<number[]>([])



  function isOut(strikes:number){
    return (strikes >= 3) ?  true :  false
  }

  function isWalk(balls:number){
    return (balls >= 5) ?  true :  false
  }

  function shouldRetireSide(outs:number){
    return (outs >= 3) ? true : false;
    
  }

  function nextBatter(){
    setPitches({
      ...pitches,
      ball:0,
      strike:0
    })
  }

  function walkBatter(){
    const array = runners;
    //Add walk
    array.push(1)
    // Loop through runners
    // if runner1 = runner 2, they share a base so add 1 base to runner2
    for(let i =runners.length - 1; i >=0;i--){
      let runner1 = array[i];
      let runner2 = array[i-1]
      if(runner1 === runner2){
        array[i-1] = runner2+1
      }
    }
    calculateRuns(array)
    setRunners(array)
    nextBatter();
  }

  function addRunner(n:number){
    setRunners([...runners,n])
  }

  function advRunners(bases:number){
    setPitches({...pitches, total: pitches.total+1})
    const copyArray = runners
    if(runners.length === 0){
      addRunner(bases)
      return
    }
    copyArray.push(bases)
    for(let i = 0; i < copyArray.length-1;i++){
      copyArray[i]= copyArray[i]+bases
      
    }
    calculateRuns(copyArray)
    setRunners([...copyArray])
  
  }

  /**
   * If any runner in runner array is greater than 4, add to score and remove from array.
   * @param runnerArray 
   */
  function calculateRuns(runnerArray:number[]){
    let addedScore = 0
    while(runnerArray[0]>=4){
      runnerArray.splice(0,1)
      addedScore++
    }
    setScore(score+addedScore)
  }

  function batterOut(){
    nextBatter();
    setOuts(outs+1)
  }

  function addStrike(){
    setPitches({...pitches,
      strike:pitches.strike+1,
      total:pitches.total+1})
  }

  function addPitch(type:string){
    switch(type){
      case 'strike':
        addStrike();
        break;
      case 'ball':
        console.log(pitches)
        setPitches({...pitches,
                    ball:pitches.ball+1,
                    total:pitches.total+1})
      
        break;
        case 'foul':
          if(pitches.strike < 2){
            setPitches({...pitches, strike: pitches.strike+1, total:pitches.total+1})
          }else{
            setPitches({...pitches,total:pitches.total+1})

          }
          break;

      default:
        setPitches({...pitches,total:pitches.total+1})
    }
  }

  function clearRunners(){
    while(runners.length > 0){
      runners.pop();
    }
  }

  if(isWalk(pitches.ball)){
    walkBatter()
  }

  if(isOut(pitches.strike)){
    batterOut();
  }

  if(shouldRetireSide(outs)){
    alert("Change places!")
    setOuts(0)
    setPitches(emptyCount)
    clearRunners()
  }




  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Blitzball Tracker</ThemedText>
        <BlitzballSpin />
      </ThemedView>
      <ThemedView style={styles.row}>
        <ThemedView style={styles.pitchingButtons}>
          <Button mode="contained" onPress={()=>{addPitch('strike')}}> Strike</Button>
          <Button mode="contained" onPress={()=>{addPitch('ball')}}> Ball</Button>
          <Button mode="contained" onPress={()=>{addPitch('foul')}}> Foul</Button>
        </ThemedView>
  
      </ThemedView>
      <ThemedView style={styles.container}>
        <ThemedText type='default'> Outs: {outs} </ThemedText>
        <ThemedText type='default'> Pitch-Count: {pitches.total}</ThemedText>
        <ThemedText type='default'> Strikes: {pitches.strike}</ThemedText>
        <ThemedText type='default'> Ball: {pitches.ball}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.container}>
        <ThemedText type='default'> Score: {score}</ThemedText>
        <Button mode="contained" onPress={() => advRunners(1)}> Single</Button>
        <Button mode="contained" onPress={() => advRunners(2)}> Double</Button>
        <Button mode="contained" onPress={() => advRunners(4)}> Homerun</Button>

      </ThemedView>
      
      <BaseballDiamond runners={runners}/>

     
      
    </ParallaxScrollView>
    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  container: {
    gap: 8,
    marginBottom: 8,
    display:'flex'
  },
  row:{
    gap: 8,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
  },
  pitchingButtons:{
    gap: 8,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'column'
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
 
});

