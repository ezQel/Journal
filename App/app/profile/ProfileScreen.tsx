import { Button, Flex, HStack, Icon, Spinner, Text, useDisclose, VStack } from "native-base";
import { useProfile } from "../../hooks/useProfile";
import ProfileItem from "../../components/ProfileItem";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Collapsible } from "../../components/Collapsible";
import { UsernameUpdate } from "../../components/UsernameUpdate";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ErrorAlert } from "../../components/ErrorAlert";

export default function ProfileScreen() {
  const { fetchProfile, updateUsername, changePassword, logout, isLoading, isUpdating, profile, error, updatingError } =
    useProfile();
  const { isOpen, onClose, onOpen } = useDisclose();

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
        <ProfileItem iconName="lock" title="Change Password" />
        <ProfileItem onPress={logout} iconName="arrow-right-from-bracket" title="Logout" />
      </VStack>
      <UsernameUpdate username={profile.username} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
