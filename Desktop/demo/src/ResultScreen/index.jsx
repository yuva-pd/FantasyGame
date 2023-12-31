import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

const index = ({route}) => {
  const {selectedPlayers} = route.params;

  console.log(selectedPlayers);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          padding: 10,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#D5E9FF',
          marginBottom: 5,
          width: '95%',
          marginLeft: 9,
        }}>
        <View>
          <Text style={{fontSize: 20, marginRight: 5}}>{item.name}</Text>
          <Text style={{marginTop: 10}}>{item.role}</Text>
        </View>
        <View>
          <Image
            source={{uri: item.team_logo}}
            style={{height: 25, width: 25}}
          />
          <Text style={{marginTop: 13}}>{item.team_name}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#2C358A',
          width: '120%',
          height: 50,
          // padding: 25,

        }}>
        <Text style={{color: 'white',fontSize:20,top:11,left:95}}>Selected Players List</Text>
      </View>
      <ScrollView>
        <FlatList
          data={selectedPlayers}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default index;
