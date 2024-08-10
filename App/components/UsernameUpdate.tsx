import { Button, HStack, Input, Modal, useToast } from "native-base";
import { useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { ErrorAlert } from "./ErrorAlert";

interface UsernameUpdateProps {
  username: string;
  isOpen: boolean;
  onClose: () => void;
}

export function UsernameUpdate({ username, isOpen, onClose }: UsernameUpdateProps) {
  const [newUsername, setNewUsername] = useState(username);
  const { updateUsername, isUpdating, updatingError } = useProfile();
  const toast = useToast();

  async function update() {
    updateUsername(newUsername);

    if (updatingError) return;

    toast.show({ title: "Username updated" });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <Modal.Content>
        <Modal.Header borderBottomWidth="0">Update Username</Modal.Header>
        <Modal.Body>
          {updatingError && <ErrorAlert message={updatingError.message} />}
          <Input value={newUsername} onChangeText={(v) => setNewUsername(v)} />
          <HStack mt="6" justifyContent="flex-end">
            <Button onPress={onClose} variant="ghost" mr="3">
              Cancel
            </Button>
            <Button onPress={update} disabled={!newUsername || isUpdating}>
              Update
            </Button>
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
