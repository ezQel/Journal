import { FontAwesome6 } from "@expo/vector-icons";
import { Badge, Box, Flex, HStack, Icon, Pressable, Spacer, Text, VStack } from "native-base";

interface ProfileItemProps {
  title: string;
  content?: string;
  iconName: string;
  onPress?: () => void;
}
export default function ProfileItem({ title, content, iconName, onPress }: ProfileItemProps) {
  return (
    <>
      <Pressable onPress={onPress}>
        {({ isPressed }) => {
          return (
            <HStack
              bg={isPressed ? "coolGray.200" : "transparent"}
              alignItems="center"
              p="6"
              borderBottomWidth="1"
              borderBottomColor="gray.200"
            >
              <Icon as={FontAwesome6} name={iconName} size="md" />
              <VStack flex="1" ml="4">
                <Text fontWeight="bold" fontSize="md" color="gray.700">
                  {title}
                </Text>
                {content && <Text color="gray.500">{content}</Text>}
              </VStack>
              <Icon as={FontAwesome6} name="angle-right" />
            </HStack>
          );
        }}
      </Pressable>
    </>
  );
}
