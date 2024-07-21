import { Link } from "expo-router";
import { Box, ScrollView, Text } from "native-base";

export default function SummaryScreen() {
  return (
    <ScrollView>
      <Box background="white" m="2" p="4" rounded="lg">
        <Text>This app includes example code to help you get started.</Text>
        <Link href="/auth/LoginScreen">Login</Link>
      </Box>
    </ScrollView>
  );
}
