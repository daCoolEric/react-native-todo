import { TouchableOpacity } from "react-native/types";
import { ACTIONS } from "./App";

// export default function DigitButton({ dispatch, digit }) {
//   return (
//     <button
//       onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
//     >
//       {digit}
//     </button>
//   );
// }

export default DigitButton = ({ dispatch, digit }) => (
  <TouchableOpacity
    onPress={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
  >
    <View style={styles.Box}>
      <View style={styles.TextContainer}>
        <Text style={{ fontSize: 25, color: "white" }}>{props.text}</Text>
      </View>
    </View>
  </TouchableOpacity>
);
