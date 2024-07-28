import { AntDesign } from "@expo/vector-icons";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { Alert, Box, Fab, Icon, ScrollView, Text } from "native-base";
import { useEffect, useState } from "react";
import { Journal } from "../../interfaces/journal.interface";
import { useAuthAxois } from "../../hooks/useAuthAxios";

export default function JournalListScreen() {
  const router = useRouter();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined | null>(undefined);
  const axios = useAuthAxois();

  useEffect(() => {
    async function getJournals() {
      try {
        const response = await axios.get<Journal[]>("/journals");
        setJournals(response.data);
        console.log(response);
        setErrorMessage(null);
      } catch (e) {
        const error = e as AxiosError<Error>;
        const message = error?.response?.data?.message;
        setErrorMessage(message);
        console.error("Error getting journals:", error);
      }
    }

    getJournals();
  }, []);

  function viewJournal(journalId: number) {
    router.navigate(`/journals/${journalId}`);
  }

  function addJournal() {
    router.navigate("/journals/JournalAddScreen");
  }

  return (
    <>
      {errorMessage && (
        <Alert mx="3" status="error">
          <Text>{errorMessage}</Text>
        </Alert>
      )}
      <ScrollView height="100%">
        {journals.map((journal) => (
          <Box
            onTouchEnd={() => viewJournal(journal.id)}
            background="white"
            mx="3"
            my="1"
            p="4"
            rounded="lg"
            key={journal.id}
          >
            <Text fontSize="md" fontWeight="semibold">
              {journal.title}
            </Text>
            <Text>{journal.content.slice(0, 50)}... </Text>
            <Text color="gray.300" fontSize="xs">
              {journal.date}
            </Text>
          </Box>
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
