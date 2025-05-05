import {StyleSheet} from 'react-native';

const st = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 10,
    paddingLeft: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 10,
  },
  // Info
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 80,
  },
  // Text
  troubleContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  troubleText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'gray',
  },
  termsWrapper: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  termsText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1D1D1D',
    marginTop: 30,
    fontSize: 14,
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'bold',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
    color: 'gray',
  },
  benefitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },

  // trouble modal
  troubleSubtitle: {
    fontSize: 14,
    color: '#1E1E1E',
    marginHorizontal: 10,
    marginBottom: 10,
    fontWeight: '700',
  },
  resetButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    marginTop: 10,
  },
  resetText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
  closeText: {
    color: 'blue',
    fontSize: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Căn trái - giữa - phải
    paddingHorizontal: 16,
    paddingBottom: 6,
  },
  troubleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    width: '100%',
  },
  closeIcon1: {
    width: 18,
    height: 18,
  },
  input: {
    width: 56,
    height: 56,
    textAlign: 'center',
    borderWidth: 0.6,
    borderColor: '#BBBBBB',
    borderRadius: 5,
    fontSize: 18,
    marginHorizontal: 5,
  },
  passwordQuality: {
    fontSize: 13,
    color: '#737373',
    marginBottom: 20,
    fontWeight: '800',
  },
  modalDone: {
    alignItems: 'center',
    marginTop: 50,
    padding: 10,
  },
  doneIcon: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  doneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  doneText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  doneEmail: {
    color: '#FE7018',
    fontWeight: '600',
  },
  text: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 5,
  },
  verifyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  verifyText: {
    flex: 1, // Chiếm hết không gian trừ icon
  },
  verifyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  verifySubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default st;
