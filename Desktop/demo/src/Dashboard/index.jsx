import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
const index = () => {
  //state variables
  const [playerdata, setPlayersData] = useState([]);
  const [teamLogos, setTeamLogos] = useState([]);
  const [enablee, setEnablee] = useState([false, false, false]);
  const [enable, setEnable] = useState(false);

//useeffect hook
  useEffect(() => {
    const fetchPlayersData = async () => {
      try {
        const response = await axios.get(
          'https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_Players_of_match.json',
        );
        setPlayersData(response.data);
        setUri(playerdata[1].team_logo);
        setUrii(playerdata[3].team_logo);
      } catch (error) {
        console.error('Error fetching players data:', error);
      }
    };

    fetchPlayersData();
  }, []);
  //navigation 
  const navigation = useNavigation();
  //functions
  const handleCardPress = index => {
    const updatedEnable = [...enablee]; // Create a copy of enable state
    updatedEnable[index] = !updatedEnable[index]; // Toggle the clicked card's state
    setEnablee(updatedEnable); // Update the state
  };

  const renderCard = index => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#FFFFFFE8',
          borderRadius: 6,
          width: '90%',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row',
          paddingHorizontal: 15,
          paddingVertical: 10,
          paddingTop: 20,
          paddingLeft: 23,
          shadowColor: '#DCDCDC',
          shadowOffset: {
            width: 3,
            height: 3,
          },
          shadowOpacity: 2,
          shadowRadius: 5,
          elevation: 30,
          backgroundColor: 'white',
          marginLeft: 18,
          marginTop: 13,
        }}
        onPress={() => {
          handleCardPress(index), setEnable(!enable);
        }}>
        <Image source={{uri: urii}} style={{height: 33, width: 33}} />
        
        <View>
          <Text
            style={{
              alignSelf: 'center',
              marginBottom: 13,
              fontSize: 15,
              fontWeight: '600',
            }}>
            T20 League{' '}
          </Text>
          <Text style={{alignSelf: 'center', marginBottom: 13, color: 'black'}}>
            Melbourne Stars
            <Text style={{color: 'gray'}}>
              {'  '}vs{'  '}
            </Text>
            Perth Scorchers
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              marginBottom: 13,
              color: 'lightpink',
              fontSize: 15,
            }}>
            Open Now Click onto Start
          </Text>
        </View>
        <Image source={{uri: uri}} style={{height: 33, width: 33}} />
        
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          padding: 5,
          backgroundColor: '#3F79BA',
          paddingTop: 27,
          color: 'white',
          paddingBottom: 27,
          paddingLeft: 70,
          fontSize: 20,
          fontWeight: '600',
        }}>
        CRICKET FANTASY MATCHES
      </Text>

      {Array.from({length: 3}, (_, index) => (
        <View key={index}>
          {renderCard(index)}
          {enablee[index] && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MainScreen');
              }}>
              {enablee && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MainScreen');
                  }}>
                  <Text
                    style={{
                      width: '90%',
                      backgroundColor: '#3F79BA',
                      marginLeft: 20,
                      padding: 13,
                      color: 'white',
                      fontSize: 20,
                      paddingLeft: 130,
                      borderRadius: 25,
                      marginTop: 25,
                    }}>
                    Pick Squad
                  </Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

export default index;
