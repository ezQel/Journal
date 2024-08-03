import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { Alert, Fab, HStack, Icon, ScrollView, Spinner, Text, VStack } from "native-base";
import { useCallback } from "react";
import { JournalItem } from "../../components/JournalItem";
import useJournals from "../../hooks/useJournals";

export default function JournalListScreen() {
  const router = useRouter();
  const { journals, fetchJournals, loading, error } = useJournals();

  useFocusEffect(
    useCallback(() => {
      fetchJournals();
      console.log("Loaded successfully");
    }, [fetchJournals]),
  );

  function addJournal() {
    router.navigate("/journals/JournalAddScreen");
  }

  if (loading) {
    return (
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Text color="primary.500">Loading</Text>
      </HStack>
    );
  }

  if (error) {
    return (
      <Alert mx="3" status="error">
        <Text>{error.message}</Text>
      </Alert>
    );
  }

  return (
    <>
      {journals.length === 0 && (
        <VStack h="100%" justifyContent="center" alignItems="center">
          <Icon color="gray.400" as={AntDesign} name="folderopen" size="6xl" />
          <Text color="gray.500" mt="2">
            No journals
          </Text>
        </VStack>
      )}
      <ScrollView height="100%">
        {journals.map((journal) => (
          <JournalItem journal={journal} />
        ))}
      </ScrollView>
      <Fab
        onPress={addJournal}
        renderInPortal={false}
        shadow={2}
        size="sm"
        label="Add Entry"
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
      />
    </>
  );
}
