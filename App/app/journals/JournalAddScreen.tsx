import { FontAwesome6 } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { format, formatDate } from "date-fns";
import { router, Stack, useNavigation } from "expo-router";
import { Alert, Box, Button, Flex, HStack, Icon, Input, Text, TextArea, useToast } from "native-base";
import { useEffect, useState } from "react";
import useJournals from "../../hooks/useJournals";
import { Journal } from "../../interfaces/journal.interface";

export default function JournalAddScreen() {
  const initialFormValue: Partial<Journal> = {
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

  function pickDate() {
    DateTimePickerAndroid.open({
      value: new Date(formData.date!),
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          const date = formatDate(selectedDate, "yyyy-MM-dd");
          setFormData({ ...formData, date });
        }
      },
      mode: "date",
      is24Hour: true,
    });
  }

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
      {error && (
        <Alert w="100%" mb="4" status="error">
          <HStack space="2">
            <Alert.Icon mt="1" />
            <Text flex="1">{error.message}</Text>
          </HStack>
        </Alert>
      )}
      <Box>
        <HStack alignItems="center">
          <Button onPress={pickDate} variant="ghost" alignSelf="flex-start" fontWeight="bold">
            <Flex direction="row" align="center">
              <Text fontWeight="bold" mr="2">
                {formatDate(formData.date!, "eee, d LLL yyyy")}
              </Text>
              <Icon as={FontAwesome6} name="caret-down" size="sm" color="black" />
            </Flex>
          </Button>
          <Button variant="subtle" colorScheme="secondary" size="sm" p="1" ml="2">
            Uncategorized
          </Button>
        </HStack>
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
          onChangeText={(value) => setFormData({ ...formData, content: value })}
          placeholder="Write your thoughts here..."
          borderWidth="0"
          fontSize="md"
          backgroundColor="none"
          autoCompleteType="none"
          selectionColor="primary.500"
          w="100%"
          h="100%"
        />
      </Box>
    </>
  );
}
