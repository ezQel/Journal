import { FontAwesome6 } from "@expo/vector-icons";
import { format } from "date-fns";
import { router, Stack, useNavigation } from "expo-router";
import { Button, HStack, Icon, Input, TextArea, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { DatePicker } from "../../components/DatePicker";
import { ErrorAlert } from "../../components/ErrorAlert";
import useJournals from "../../hooks/useJournals";
import { CategoryPicker } from "../../components/categories/CategoryPicker";
import { Journal } from "../../interfaces/journal.interface";

interface JournalAddScreenProps {
  journal?: Journal;
}

export default function JournalAddScreen({ journal }: JournalAddScreenProps) {
  const initialFormValue: Pick<Journal, "id" | "date" | "title" | "content" | "categoryId"> = journal
    ? {
        ...journal,
        categoryId: journal?.category?.id,
      }
    : {
        id: null,
        date: format(new Date(), "yyyy-MM-dd"),
        title: "",
        content: "",
        categoryId: null,
      };

  const [formData, setFormData] = useState(initialFormValue);
  const [isValid, setIsValid] = useState(false);
  const { isSaving, error, saveJournal, updateJournal } = useJournals();
  const navigation = useNavigation();
  const toast = useToast();

  useEffect(() => {
    if (formData.title || formData.content) {
      setIsValid(true);
      return;
    }

    setIsValid(false);
  }, [formData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", async (e) => {
      if (isValid) {
        e.preventDefault();

        if (formData.id) {
          await updateJournal(formData.id, formData);
        } else {
          await saveJournal(formData);
        }

        navigation.dispatch(e.data.action);
      }
    });

    return unsubscribe;
  }, [navigation, isValid, formData, toast, saveJournal, updateJournal]);

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
          <CategoryPicker
            onChange={(categoryId) => setFormData({ ...formData, categoryId })}
            categoryId={formData.categoryId}
          />
        </HStack>
        <VStack flex="1">
          <Input
            value={formData.title}
            onChangeText={(value) => setFormData({ ...formData, title: value })}
            placeholder="Title"
            borderWidth="0"
            fontWeight="extrabold"
            fontSize="lg"
            backgroundColor="none"
            w="100%"
          />
          <TextArea
            value={formData.content}
            flexGrow="1"
            onChangeText={(value) => setFormData({ ...formData, content: value })}
            placeholder="Write your thoughts here..."
            borderWidth="0"
            fontSize="md"
            backgroundColor="none"
            autoCompleteType="none"
            w="100%"
          />
        </VStack>
      </VStack>
    </>
  );
}
