// import { Text } from "native-base";

import { Text } from "react-native";

export default function ErrorMessage({ message: errorMessage }: { message?: string }) {
  return (
    <>
      <Text>{errorMessage} Errr</Text>;
    </>
  );
}
