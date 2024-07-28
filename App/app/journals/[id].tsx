import { useLocalSearchParams } from "expo-router";
import { Text } from "native-base";

export default function JournalViewScreen() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <Text>{id}</Text>
    </>
  );
}
