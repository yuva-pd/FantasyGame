import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  // ... other styles remain unchanged
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
    flexDirection: 'row',
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
  },
});
