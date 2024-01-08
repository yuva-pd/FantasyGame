import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {styles} from './styles.js'
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
        style={styles.subcontainer}
        onPress={() => {
          handleCardPress(index), setEnable(!enable);
        }}>
        <Image source={{uri: urii}} style={styles.image} />
        
        <View>
          <Text
            style={styles.texthead}>
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
            style={styles.clickbutton}>
            Open Now Click onto Start
          </Text>
        </View>
        <Image source={{uri: uri}} style={styles.image} />
        
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Text
        style={styles.container}>
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
                    style={styles.textbutton}>
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
