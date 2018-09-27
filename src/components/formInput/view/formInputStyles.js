import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  wrapper: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginHorizontal: 30,
    marginVertical: 20,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    height: 60,
    borderBottomWidth: 2,
  },
  firstImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    top: 15,
    marginLeft: 12,
  },
  textInput: {
    height: 60,
    flex: 0.7,
  },
  icon: {
    flex: 0.15,
    fontSize: 25,
    top: 18,
    left: 8,
    color: "#c1c5c7",
  },
});
