import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useRef } from "react";
import {
  Animated,
  Button,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

function NarcanScreen() {
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const { width, height } = useWindowDimensions();

  let flipRotation = 0;

  flipAnimation.addListener(({ value }) => (flipRotation = value));

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };

  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const flipToFront = useCallback(() => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const fliptoBack = useCallback(() => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPress = useCallback(() => {
    !!flipRotation ? fliptoBack() : flipToFront();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          borderColor: "red",
          borderWidth: 1,
          marginHorizontal: 16,
        }}
      >
        <NarcanImage
          style={[
            {
              width: width,
              height: height / 2,
              borderRadius: 16,
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
            },
            flipToBackStyle,
          ]}
        />
        <Directions
          style={[
            {
              width,
              height: height / 2,
              backgroundColor: "#FF8787",
              borderRadius: 16,
              backfaceVisibility: "hidden",
              alignItems: "center",
              justifyContent: "center",
            },
            flipToFrontStyle,
          ]}
        />
      </View>
      <View style={[{ width: "100%", paddingTop: 30 }, flipToFrontStyle]}>
        <Button title="Flip" onPress={onPress} />
      </View>
    </View>
  );
}

function Directions(p) {
  const { style, ...props } = p;
  return (
    <Animated.View style={[style]} {...props}>
      <Text style={{ fontSize: 40, fontweight: "700" }}>Directions:</Text>
      <View
        style={{
          borderColor: "red",
          borderWidth: 1,
          width: "100%",
        }}
      >
        Gently insert the Narcan spray into one nostril, positioning your
        pointer and middle finger on either side of the nose leaving your thumb
        avaliable to push the nasal spray. Using your thumb push the spray into
        the nostril and wait 2 minutes. If the patient does not respond in 2
        minutes open a pack and repeat the steps in the other nostril.
      </View>

      <Overdose />
    </Animated.View>
  );
}
function NarcanImage(p) {
  const { style, ...props } = p;
  const img = {
    uri: "https://cdn.shopify.com/s/files/1/0996/0350/products/narcan_overdose_nasal_spray_1800x1800.jpg?v=1661946912",
  };
  return (
    <Animated.View style={[style]} {...props}>
      <Image style={styles.image} source={img} />
    </Animated.View>
  );
}
function Overdose() {
  return (
    <View style={{ width: "100%", marginTop: 40 }}>
      <Text style={{ alignSelf: "center", fontSize: 40, fontweight: "700" }}>
        Signs of Overdose:
      </Text>
      <View
        style={{
          borderColor: "red",
          borderWidth: 1,
          width: "100%",
        }}
      >
        <Text>
          Blue/Grey Lips Uncouncious person that is unable to be woken up
          Breathing very slow or not at avaliable Make sure to call 911 if you
          suspect that it is an overdose
        </Text>
      </View>
    </View>
  );
}
function Help() {
  return (
    <View>
      <Text>Help line: 1-800-662-HELP</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NarcanScreen"
          component={NarcanScreen}
          options={{
            title: "Narcan (Narcan)",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 400,
    width: 400,
  },
});
