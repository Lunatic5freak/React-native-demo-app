import React, { useEffect, useState } from 'react';
import { FlatList, Text, View,StyleSheet } from 'react-native';
import axios from 'axios'

const Content=({navigation})=>{

    const [data,setData]=useState([])
    async function loadDetails(){
        console.log(navigation.state.params.params.questionid);
        const res=await axios.get(`https://api.stackexchange.com/2.3/questions/${navigation.state.params.params.questionid}/answers?&order=desc&sort=activity&site=stackoverflow&filter=withbody`)
        //console.log(res.data.items.map(item=>{console.log(item);}));

        setData(res.data.items)
    }

    useEffect(()=>{
       loadDetails()
    },[])

    const showData=(answer)=>{
        //console.log(answer);
        return(
           <View style={styles.answer}>
                <Text>{answer.item.body}</Text>
           </View>
        )
    }

    if(data.length!==0){
        //console.log(data);
        return(
            <View>
                <Text style={styles.heading}>Question</Text>
                <Text style={styles.question}>{navigation.state.params.params.question}</Text>
                <Text style={styles.heading}>Answers</Text>
                <FlatList
                    data={data}
                    renderItem={showData}
                    keyExtractor={(item)=>item.answer_id.toString()}
                ></FlatList>
            </View>
        )
    }else{
        return (
            <View>
            <Text>Loading</Text>
        </View>
        )
    }
}

const styles=StyleSheet.create({
    heading:{
        color:'black',
        fontSize:25,
        fontWeight:'bold'
    },
    question:{
        color:'blue',
        fontSize:20,
        margin:2,
        padding:2
    },
    answer:{
        flex:1,
        flexDirection:'row',
        borderStyle:'solid',
        borderWidth:2,
        borderColor:'black',
        margin:5
    }
})

export default Content;
