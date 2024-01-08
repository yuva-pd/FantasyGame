import {StyleSheet} from 'react-native';
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
