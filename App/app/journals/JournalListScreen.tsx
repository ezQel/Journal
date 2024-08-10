import { FontAwesome6 } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { Alert, Fab, FlatList, HStack, Icon, Spinner, Text, VStack } from "native-base";
import { useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import { JournalItem } from "../../components/JournalItem";
import useJournals from "../../hooks/useJournals";

export default function JournalListScreen() {
  const { journals, fetchJournals, isLoading, error } = useJournals();
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchJournals();
    }, [fetchJournals]),
  );

  function addJournal() {
    router.navigate("/journals/JournalAddScreen");
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchJournals();
    setRefreshing(false);
  }, [fetchJournals]);

  if (isLoading && !refreshing) {
    return (
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Text color="primary.600">Loading</Text>
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
          <Icon color="gray.400" as={FontAwesome6} name="folder-open" size="6xl" />
          <Text color="gray.500" mt="2">
            No journals
          </Text>
        </VStack>
      )}
      <FlatList
        data={journals}
        renderItem={JournalItem}
        keyExtractor={(item) => `${item?.id}`}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <Fab
        onPress={addJournal}
        renderInPortal={false}
        shadow={2}
        size="sm"
        label="Add Entry"
        icon={<Icon color="white" as={FontAwesome6} name="plus" size="sm" />}
      />
    </>
  );
}
