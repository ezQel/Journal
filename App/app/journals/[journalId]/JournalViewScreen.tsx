import { FontAwesome6 } from "@expo/vector-icons";
import { router, Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Box, Button, HStack, Icon, ScrollView, Text, useToast } from "native-base";
import { useCallback } from "react";
import { Alert } from "react-native";
import { ErrorAlert } from "../../../components/misc/ErrorAlert";
import { LoadingSpinner } from "../../../components/misc/LoadingSpinner";
import useJournals from "../../../hooks/useJournals";

export default function JournalViewScreen() {
  const { journalId } = useLocalSearchParams<{ journalId: string }>();
  const { isLoading, isDeleting, error, journal, fetchJournal, removeJournal } = useJournals();
  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      fetchJournal(journalId);
    }, [fetchJournal, journalId]),
  );

  function edit() {
    router.navigate(`/journals/${journalId}/JournalEditScreen`);
  }

  function deleteJournal() {
    Alert.alert("Delete Journal Entry?", "This action cannot be undone.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        style: "destructive",
        onPress: async () => {
          await removeJournal(journalId!);
          router.navigate("/(tabs)");
          toast.show({ title: "Entry deleted successfully" });
        },
      },
    ]);
  }

  if (isLoading) return <LoadingSpinner />;

  if (error) return <ErrorAlert message={error.message} />;

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#f2f2f2" },
          headerRight: () => (
            <>
              <Button onPress={edit} variant="ghost" mr="4">
                <Icon as={FontAwesome6} name="pencil" />
              </Button>
              <Button onPress={deleteJournal} variant="ghost" disabled={isDeleting}>
                <Icon as={FontAwesome6} name="trash" />
              </Button>
            </>
          ),
        }}
      />
      <ScrollView px="4">
        <HStack alignItems="center">
          <Text fontWeight="medium" fontSize="lg" mb="2" selectable={true}>
            {journal?.title}
          </Text>
          {journal?.category && (
            <Box rounded="lg" ml="3" px="2" backgroundColor="blue.100">
              <Text fontSize="xs" color="blue.800">
                {journal.category.name}
              </Text>
            </Box>
          )}
        </HStack>
        <Text pb="3" selectable={true}>
          {journal?.content}
        </Text>
      </ScrollView>
    </>
  );
}
