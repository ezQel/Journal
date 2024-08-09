import { useFocusEffect } from "expo-router";
import { useDisclose, VStack } from "native-base";
import { useCallback } from "react";
import { ErrorAlert } from "../../components/ErrorAlert";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import ProfileItem from "../../components/ProfileItem";
import { UsernameUpdate } from "../../components/UsernameUpdate";
import { useProfile } from "../../hooks/useProfile";
import { PasswordChange } from "../../components/passwordChange";

export default function ProfileScreen() {
  const { fetchProfile, logout, isLoading, profile, error } = useProfile();
  const { isOpen, onClose, onOpen } = useDisclose();
  const { isOpen: isPasswordChangeOpen, onClose: onPasswordChangeClose, onOpen: onPasswordChangeOpen } = useDisclose();

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile]),
  );

  if (isLoading || !profile) return <LoadingSpinner />;

  return (
    <>
      {error && <ErrorAlert message={error.message} />}
      <VStack flex="1">
        <ProfileItem onPress={onOpen} iconName="user-pen" title="Username" content={profile?.username} />
        <ProfileItem onPress={onPasswordChangeOpen} iconName="lock" title="Change Password" />
        <ProfileItem onPress={logout} iconName="arrow-right-from-bracket" title="Logout" />
      </VStack>
      <UsernameUpdate username={profile.username} isOpen={isOpen} onClose={onClose} />
      <PasswordChange isOpen={isPasswordChangeOpen} onClose={onPasswordChangeClose} />
    </>
  );
}
