import { Button, FormControl, HStack, Input, Modal, useToast } from "native-base";
import { useEffect, useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { ErrorAlert } from "./ErrorAlert";

interface PasswordChangeProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PasswordChange({ isOpen, onClose }: PasswordChangeProps) {
  const [formData, setFormData] = useState({ currentPassword: "", newPassword: "" });
  const [isValid, setIsValid] = useState(false);
  const { changePassword, isUpdating, updatingError } = useProfile();
  const toast = useToast();

  useEffect(() => {
    setIsValid(Boolean(formData.currentPassword) && Boolean(formData.newPassword));
  }, [formData]);

  async function save() {
    await changePassword(formData.currentPassword, formData.newPassword);
    toast.show({ title: "Password changed successfully" });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <Modal.Content>
        <Modal.Header borderBottomWidth="0">Change Password</Modal.Header>
        <Modal.Body>
          {updatingError && <ErrorAlert message={updatingError.message} />}
          <FormControl>
            <FormControl.Label _text={{ bold: true }}>Current Password</FormControl.Label>
            <Input
              rounded="lg"
              placeholder="Enter current password"
              type="password"
              onChangeText={(currentPassword) => setFormData({ ...formData, currentPassword })}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label _text={{ bold: true }}>New Password</FormControl.Label>
            <Input
              rounded="lg"
              placeholder="Enter new password"
              type="password"
              onChangeText={(newPassword) => setFormData({ ...formData, newPassword })}
            />
          </FormControl>
          <HStack mt="6" justifyContent="flex-end">
            <Button onPress={onClose} variant="ghost" mr="3">
              Cancel
            </Button>
            <Button onPress={save} disabled={isUpdating || !isValid}>
              Save
            </Button>
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
