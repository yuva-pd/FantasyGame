import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {styles} from './styles';

const index = ({route}) => {
  const {selectedPlayers} = route.params;

  console.log(selectedPlayers);

  const renderItem = ({item}) => {
    return (
      <View
        style={styles.subcontainer}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={{marginTop: 10}}>{item.role}</Text>
        </View>
        <View>
          <Image
            source={{uri: item.team_logo}}
            style={styles.image}
          />
          <Text style={{marginTop: 13}}>{item.team_name}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={styles.container}>
        <Text style={styles.heading}>Selected Players List</Text>
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
