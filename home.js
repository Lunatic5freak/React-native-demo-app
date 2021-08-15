import React,{useState} from 'react'
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios'

const Home=({navigation})=>{
    const [query,setQuery]=useState('')
    const [data,setData]=useState([])
    const [page,setPage]=useState(1)
    const handleSearch=async ()=>{
      console.log(query);
      const res=await axios.get( `https://api.stackexchange.com/2.3/search?page=${page}&pagesize=10&order=desc&sort=activity&intitle=${query}&site=stackoverflow&run=true`)
      setPage(page+1);
      setData(res.data.items)
    }

    const loadMore=async()=>{
        console.log('loadmore'+page);
        const res=await axios.get( `https://api.stackexchange.com/2.3/search?page=${page}&pagesize=10&order=desc&sort=activity&intitle=${query}&site=stackoverflow&run=true`)
        console.log(res.data);
        if(res.data.items.length!==0){
        data.push(...res.data.items)
        setPage(page+1);
        setData(data)
        }
    }

    const handleClick=(question_id,question)=>{
        navigation.navigate('Content',{params:{questionid:question_id,question:question}})
    }
  
    const showData=(question)=>{
      var t1=new Date().getTime()
      var t2=t1-question.item.creation_date;
      return (<TouchableOpacity onPress={()=>{handleClick(question.item.question_id,question.item.title)}}>
      <View style={styles.text} key={question.item.question_id.toString()}>
        <Text>{question.item.title}</Text>
        {question.item.tags.map(tag=>{
            return(
                <Text style={styles.tags} key={tag}>{tag}</Text>
            )
        })}
        <Text>Creation Date:{new Date(question.item.creation_date*1000).toDateString()}</Text>
        </View>
      </TouchableOpacity>)
    }
  
    if(data.length!==0){
      console.log(data.length);
      //console.log(data[0]);
      return (
      <View style={styles.container}>
          <TextInput 
            placeholder="Search here"
            onChangeText={setQuery}
            value={query}
          ></TextInput>
          <Button title="Search" onPress={handleSearch}></Button>
          <FlatList 
            data={data}
            renderItem={showData}
            keyExtractor={item=>item.question_id.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
          ></FlatList>
        </View>)
    }else{
      return (
        <View style={styles.container}>
          <TextInput 
            placeholder="Search here"
            onChangeText={setQuery}
            value={query}
          ></TextInput>
          <Button title="Search" onPress={handleSearch}></Button>
          <Text>Your search result will be displayed here.</Text>
        </View>
      );
    }
   
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
        flex:1,
        color:'blue',
        borderRadius:2,
        borderStyle:'solid',
        borderColor:'black',
        borderWidth:2,
        margin:10
    },
    tags:{
      flex:1,
      flexDirection:'row',
      color:'blue',
      backgroundColor:'grey'
    }
  });
export default Home;