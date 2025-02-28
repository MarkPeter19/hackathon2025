// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { HeaderButton, Text } from "@react-navigation/elements";
// import {
//   createStaticNavigation,
//   StaticParamList,
// } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Image } from "react-native";
// import newspaper from "../assets/newspaper.png";
// import HomeScreen from "./screens/Home";



// const HomeTabs = createBottomTabNavigator({
//   screens: {
//     Home: {
//       screen: HomeScreen,
//       options: {
//         title: "Feed",
//         tabBarIcon: ({ color, size }) => (
//           <Image
//             source={newspaper}
//             tintColor={color}
//             style={{
//               width: size,
//               height: size,
//             }}
//           />
//         ),
//       },
//     },
//   },
// });

// const RootStack = createNativeStackNavigator({
//   screens: {
//     HomeTabs: {
//       screen: HomeTabs,
//       options: {
//         title: "Home",
//         headerShown: false,
//       },
//     },
//   },
// });

// export const Navigation = createStaticNavigation(RootStack);

// type RootStackParamList = StaticParamList<typeof RootStack>;

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }
