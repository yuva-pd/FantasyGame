import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
const index = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [totalCredits, setTotalCredits] = useState(100);
  const [mplayersData, setmPlayersData] = useState([]);
  const [playersData, setPlayersData] = useState([]);

  useEffect(() => {
    const fetchPlayersData = async () => {
      try {
        const response = await axios.get(
          'https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_Players_of_match.json',
        );

        setmPlayersData(response.data);
      } catch (error) {
        console.error('Error fetching players data:', error);
      }
    };

    fetchPlayersData();
  }, []);
  const Dashboardm = ({playersData}) => {
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [totalCredits, setTotalCredits] = useState(100);
    const [disabledTeams, setDisabledTeams] = useState({});
    const [playerresetbutton, setPlayerresetbutton] = useState(false);
    const isTeamLimitReached = teamName => {
      const countPlayersFromTeam = selectedPlayers.filter(
        selectedPlayer => selectedPlayer.team_name === teamName,
      ).length;
      return countPlayersFromTeam >= 7; // Modify the limit as needed
    };
    const filterPlayersByRole = role =>
      playersData.filter(player => player.role === role);

    const handlePlayerSelection = player => {
      const isPlayerSelected = selectedPlayers.some(
        selectedPlayer => selectedPlayer.id === player.id,
      );
      const newTotalCredits = isPlayerSelected
        ? totalCredits + player.event_player_credit
        : totalCredits - player.event_player_credit;

      if (isPlayerSelected) {
        const newSelectedPlayers = selectedPlayers.filter(
          selectedPlayer => selectedPlayer.id !== player.id,
        );
        setSelectedPlayers(newSelectedPlayers);
        setTotalCredits(newTotalCredits);
        setDisabledTeams(prevDisabledTeams => ({
          ...prevDisabledTeams,
          [player.team_name]: false,
        }));
      } else {
        if (totalCredits > 7) {
          if (player.role === 'Bowler') {
            const countBowlers = countSelectedPlayersByRole('Bowler');

            if (countBowlers >= 7) {
              Toast.show({
                type: 'error',
                text1: 'Role Limit Exceeded',
                text2: 'You can be select only 7 Bowlers MAX!',
              });
              return;
            }
            const newSelectedPlayers = [...selectedPlayers, player];
            setSelectedPlayers(newSelectedPlayers);
            setTotalCredits(newTotalCredits);
          } else if (player.role === 'Batsman') {
            const countBatsman = countSelectedPlayersByRole('Batsman');

            if (countBatsman >= 7) {
              Toast.show({
                type: 'error',
                text1: 'Role Limit Exceeded',
                text2: 'You can be select only 7 Batsmens MAX!',
              });
              return;
            }
            const newSelectedPlayers = [...selectedPlayers, player];
            setSelectedPlayers(newSelectedPlayers);
            setTotalCredits(newTotalCredits);
          } else if (player.role === 'Wicket-Keeper') {
            const countwk = countSelectedPlayersByRole('Wicket-Keeper');

            if (countwk >= 5) {
              Toast.show({
                type: 'error',
                text1: 'Role Limit Exceeded',
                text2: 'You can be select only 5 Wicket Keepers MAX!',
              });
              return;
            }
            const newSelectedPlayers = [...selectedPlayers, player];
            setSelectedPlayers(newSelectedPlayers);
            setTotalCredits(newTotalCredits);
          } else if (player.role === 'All-Rounder') {
            const countal = countSelectedPlayersByRole('All-Rounder');

            if (countal >= 4) {
              Toast.show({
                type: 'error',
                text1: 'Role Limit Exceeded',
                text2: 'You can be select only 4 All Rounders MAX!',
              });
              return;
            }
            const newSelectedPlayers = [...selectedPlayers, player];
            setSelectedPlayers(newSelectedPlayers);
            setTotalCredits(newTotalCredits);
          } else {
            const newSelectedPlayers = [...selectedPlayers, player];
            setSelectedPlayers(newSelectedPlayers);
            setTotalCredits(newTotalCredits);
          }
          if (isTeamLimitReached(player.team_name)) {
            setDisabledTeams(prevDisabledTeams => ({
              ...prevDisabledTeams,
              [player.team_name]: true,
            }));
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'Exceeded',
            text2: 'Credits are not enough to select !',
          });
          return;
        }
        // if (teamLimitReached) {
        //   setDisabledTeams(prevDisabledTeams => ({
        //     ...prevDisabledTeams,
        //     [player.team_name]: true,
        //   }));
        // }
      }
    };

    const countSelectedPlayersByRole = role => {
      return selectedPlayers.filter(
        selectedPlayer => selectedPlayer.role === role,
      ).length;
    };
    const renderPlayersByRole = role => {
      const players = filterPlayersByRole(role);
      const countSelectedPlayersByRole = () => {
        return selectedPlayers.filter(
          selectedPlayer => selectedPlayer.role === role,
        ).length;
      };

      const renderItem = ({item}) => {
        const isSelected = selectedPlayers.some(
          selectedPlayer => selectedPlayer.id === item.id,
        );
        const teamLimitReached =
          selectedPlayers.filter(
            selectedPlayer => selectedPlayer.team_name === item.team_name,
          ).length >= 7;
        const roleLimitReached =
          (role === 'Batsman' && countSelectedPlayersByRole('Batsman') >= 7) ||
          (role === 'Bowler' && countSelectedPlayersByRole('Bowler') >= 7) ||
          (role === 'Wicket-Keeper' &&
            countSelectedPlayersByRole('Wicket-Keeper') >= 5) ||
          (role === 'All-Rounder' &&
            countSelectedPlayersByRole('All-Rounder') >= 4);
        {
          teamLimitReached || roleLimitReached
            ? setPlayerresetbutton(teamLimitReached || roleLimitReached)
            : null;
        }
        // const bowlers =
        //   role === 'Batsman' && countSelectedPlayersByRole('Batsman') >= 7;
        return (
          <TouchableOpacity
            onPress={() => {
              if (!roleLimitReached) {
                handlePlayerSelection(item);
              }
            }}
            disabled={roleLimitReached || teamLimitReached}
            style={[
              styles.playerItem,
              isSelected && {backgroundColor: '#D5E9FF'},
              (roleLimitReached || teamLimitReached) && {opacity: 0.5}, // Change background color for selected players
            ]}>
            <View style={styles.playerInfo}>
              <View style={styles.playerNameContainer}>
                <Text style={{color: 'gray', fontSize: 25, fontWeight: 'bold'}}>
                  {item.name}
                </Text>
                <Text
                  style={(styles.playerDetails, {marginBottom: 13, top: 20})}>
                  Credits:
                  <Text
                    style={
                      item.team_name == 'Melbourne Stars'
                        ? {color: '#47A23F'}
                        : {color: '#FB9B2A'}
                    }>
                    {item.event_player_credit}
                  </Text>
                </Text>
              </View>
              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>{item.team}</Text>
                <Image source={{uri: item.team_logo}} style={styles.teamLogo} />
                <Text
                  style={
                    (styles.playerRole,
                    item.team_name == 'Melbourne Stars'
                      ? {color: '#47A23F'}
                      : {color: '#FB9B2A'})
                  }>
                  {item.team_name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      };

      return (
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={
                (styles.roleName,
                {fontSize: 25, color: 'white', marginBottom: 5})
              }>
              {role}{' '}
            </Text>

            <Text style={(styles.roleName, {color: 'lightgray'})}>
              | Selected:{' '}
              <Text style={{color: 'lightpink'}}>
                {countSelectedPlayersByRole()}
              </Text>{' '}
              | Remaining:{' '}
              <Text style={{color: 'lightpink'}}>
                {players.length - countSelectedPlayersByRole()}
              </Text>
            </Text>
          </View>
          {role == 'Bowler' && (
            <Text style={{color: 'white', marginBottom: 5}}>
              (Select the bowlers of Min:3 and Max:7)
            </Text>
          )}
          {role == 'Batsman' && (
            <Text style={{color: 'white', marginBottom: 5}}>
              (Select the bowlers of Min:3 and Max:7)
            </Text>
          )}
          {role == 'Wicket-Keeper' && (
            <Text style={{color: 'white', marginBottom: 5}}>
              (Select the bowlers of Min:1 and Max:5)
            </Text>
          )}
          {role == 'All-Rounder' && (
            <Text style={{color: 'white', marginBottom: 5}}>
              (Select the bowlers of Min:0 and Max:4)
            </Text>
          )}
          <FlatList
            data={players}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
      );
    };
    const navigation = useNavigation();
    const countSelectedMelbournePlayers = () => {
      return selectedPlayers.filter(
        selectedPlayer => selectedPlayer.team_name === 'Melbourne Stars',
      ).length;
    };
    const countSelectedPerthPlayers = () => {
      return selectedPlayers.filter(
        selectedPlayer => selectedPlayer.team_name === 'Perth Scorchers',
      ).length;
    };
    const handleSave = () => {
      // Reset selected players
      setSelectedPlayers([]);
      setTotalCredits(100);
      setPlayerresetbutton(false);

      // Disable previously selected teams
      const disabledTeamsCopy = {...disabledTeams};
      Object.keys(disabledTeamsCopy).forEach(team => {
        disabledTeamsCopy[team] = true;
      });
      setDisabledTeams(disabledTeamsCopy);
    };
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#3F79BA',
            width: '120%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: '#3F79BA',
              padding: 13,
              bottom: 20,
            }}>
            <Text style={{color: 'white', fontSize: 20}}>
              Melbourne: {'  '}
              {countSelectedMelbournePlayers()}
            </Text>
            <Text style={{color: 'white', fontSize: 20}}>
              Perth Scorchers: {'  '}
              {countSelectedPerthPlayers()}
            </Text>
          </View>
          {playerresetbutton ? (
            <TouchableOpacity onPress={handleSave}>
              <Text style={{color: 'white', fontSize: 20, left: 143}}>
                Reset the Players click here
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          {renderPlayersByRole('Batsman')}
          {renderPlayersByRole('Wicket-Keeper')}
          {renderPlayersByRole('All-Rounder')}
          {renderPlayersByRole('Bowler')}
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.totalCredits}>Total Credits: {totalCredits}</Text>

          <Text style={styles.totalCredits}>
            Players Selected: {selectedPlayers.length}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: '120%',
            backgroundColor: '#3F79BA',
            paddingBottom: 15,
            paddingTop: 15,
            top: 15,
          }}
          onPress={() => {
            const countBatsmen = countSelectedPlayersByRole('Batsman');
            const countBowlers = countSelectedPlayersByRole('Bowler');
            const countwk = countSelectedPlayersByRole('Wicket-Keeper');
            const countal = countSelectedPlayersByRole('All-Rounder');
            if (countBatsmen < 3 || countBatsmen > 7) {
              Toast.show({
                type: 'error',
                text1: 'Role Limit Exceeded',
                text2: 'Please select the Batsmen of MAX-7 & MIN-3',
              });
            } else if (countBowlers < 3 || countBowlers > 7) {
              Toast.show({
                type: 'error',
                text1: 'Role Limit Exceeded',
                text2: 'Please select the Bowlers of MAX-7 & MIN-3',
              });
            } else if (countwk < 1 || countwk > 5) {
              Toast.show({
                type: 'error',
                text1: 'Role Limit Exceeded',
                text2: 'Please select the Wicke Keepers of MAX-5 & MIN-1',
              });
            } else if (countal < 0 || countal > 4) {
              Toast.show({
                type: 'error',
                text1: 'Role Limit Exceeded',
                text2: 'Please select the All Rounders of MAX-4 & MIN-0',
              });
            } else if (
              countSelectedPlayersByRole('Batsman') +
                countSelectedPlayersByRole('Wicket-Keeper') +
                countSelectedPlayersByRole('All-Rounder') +
                countSelectedPlayersByRole('Bowler') <=
                10 ||
              countSelectedPlayersByRole('Batsman') +
                countSelectedPlayersByRole('Wicket-Keeper') +
                countSelectedPlayersByRole('All-Rounder') +
                countSelectedPlayersByRole('Bowler') >=
                12
            ) {
              Toast.show({
                type: 'error',
                text1: 'Role Limit Exceeded',
                text2: 'Please select the Team Members of 11',
              });
            } else
              navigation.navigate('DisplayScreen', {
                selectedPlayers: selectedPlayers,
              });
          }}>
          <Text style={{fontSize: 20, color: 'white', marginLeft: 173}}>
            Proceed
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#2C358A'}}>
      <Dashboardm playersData={mplayersData} />
      {/* <Dashboardm playersData={playersData} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
    width: '100%',
    marginBottom: 60, // Adjust this value based on your button and text height
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 60,
  },
  totalCredits: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  roleName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  playerItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  playerName: {
    fontSize: 33,
    fontWeight: 'bold',
  },
  playerDetails: {
    fontSize: 14,
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerNameContainer: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerRole: {
    fontSize: 14,
    color: '#666',
  },
  teamInfo: {
    alignItems: 'center',
  },
  teamName: {
    fontSize: 14,
    marginRight: 5,
  },
  teamLogo: {
    width: 20, // Adjust the width as needed
    height: 20, // Adjust the height as needed
    resizeMode: 'contain',
    marginBottom: 13,
  },
});

export default index;
