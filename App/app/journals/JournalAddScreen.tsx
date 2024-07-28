import { Box, TextArea } from "native-base";
import { useState } from "react";

export default function JournalAddScreen() {
  const [formData, setFormData] = useState({});

  function saveJournal() {
    // TODO: Save the journal entry to the API
  }

  return (
    <>
      <Box alignItems="center" w="100%">
        <TextArea
          autoCompleteType="none"
          h="100%"
          placeholder="Type in your thoughts..."
          w="100%"
          backgroundColor="none"
          outlineColor="none"
          focusOutlineColor="none"
        />
      </Box>
    </>
  );
}
