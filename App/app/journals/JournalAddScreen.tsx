import { FontAwesome6 } from "@expo/vector-icons";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { format, formatDate } from "date-fns";
import { router, Stack, useNavigation } from "expo-router";
import { Alert, Button, HStack, Icon, Input, Text, TextArea, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { DatePicker } from "../../components/DatePicker";
import useJournals from "../../hooks/useJournals";
import { ErrorAlert } from "../../components/ErrorAlert";

export default function JournalAddScreen() {
  const initialFormValue = {
    date: format(new Date(), "yyyy-MM-dd"),
    title: "",
    content: "",
  };

  const [formData, setFormData] = useState(initialFormValue);
  const [isValid, setIsValid] = useState(false);
  const { isSaving, error, saveJournal } = useJournals();
  const navigation = useNavigation();
  const toast = useToast();

  useEffect(() => {
    if (formData?.title || formData?.content) {
      setIsValid(true);
      return;
    }

    setIsValid(false);
  }, [formData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", async (e) => {
      if (isValid) {
        e.preventDefault();

        try {
          await saveJournal(formData);
          navigation.dispatch(e.data.action);
        } catch (e) {
          console.error((e as Error)?.message);
        }
      }
    });

    return unsubscribe;
  }, [navigation, isValid, formData, toast, saveJournal]);

  async function handleSave() {
    router.back();
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#f2f2f2",
          },
          headerRight: () => (
            <Button onPress={handleSave} variant="ghost" colorScheme="primary" disabled={!isValid || isSaving}>
              <Icon as={FontAwesome6} name="check" size="lg" color="black" />
            </Button>
          ),
        }}
      />
      <VStack h="100%">
        {error && <ErrorAlert message={error.message} />}
        <HStack alignItems="center">
          <DatePicker currentDate={formData.date} onChange={(date) => setFormData({ ...formData, date })} />
          <Button variant="subtle" colorScheme="secondary" size="sm" p="1" ml="2">
            Uncategorized
          </Button>
        </HStack>
        <VStack flex="1">
          <Input
            onChangeText={(value) => setFormData({ ...formData, title: value })}
            placeholder="Title"
            borderWidth="0"
            fontWeight="extrabold"
            fontSize="lg"
            backgroundColor="none"
            w="100%"
          />
          <TextArea
            flexGrow="1"
            onChangeText={(value) => setFormData({ ...formData, content: value })}
            placeholder="Write your thoughts here..."
            borderWidth="0"
            fontSize="md"
            backgroundColor="none"
            autoCompleteType="none"
            selectionColor="primary.500"
            w="100%"
          />
        </VStack>
      </VStack>
    </>
  );
}
