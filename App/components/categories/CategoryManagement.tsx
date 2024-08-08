import { FontAwesome6 } from "@expo/vector-icons";
import { Button, Center, HStack, Icon, Input, Spinner, Text, VStack } from "native-base";
import { Category } from "../../interfaces/category";
import { ErrorAlert } from "../ErrorAlert";
import { useState } from "react";

interface CategoryManagementProps {
  isLoading: boolean;
  error?: Error | null;
  categories?: Category[];
  onAdd: (categoryName: string) => void;
  onDelete: (categoryId: number) => void;
}

export function CategoryManagement({ categories, isLoading, error, onAdd, onDelete }: CategoryManagementProps) {
  const [categoryName, setCategoryName] = useState("");

  const categoryForm = (
    <HStack alignItems="flex-end" space="2" mb="3">
      <Input
        flex="1"
        placeholder="Enter a category name"
        backgroundColor="transparent"
        borderWidth="0"
        borderBottomWidth="1"
        onChangeText={setCategoryName}
        onSubmitEditing={() => onAdd(categoryName)}
        autoFocus={true}
      />
      <Button onPress={() => onAdd(categoryName)} disabled={isLoading || !categoryName}>
        Add
      </Button>
    </HStack>
  );

  if (error) {
    return (
      <>
        {categoryForm}
        <ErrorAlert message={error.message} />
      </>
    );
  }

  if (!categories?.length) {
    return (
      <>
        {categoryForm}
        <Center h="24">
          <Icon as={FontAwesome6} name="file-text" size="md" color="gray.300" />
          <Text color="gray.400" fontSize="xs">
            No categories
          </Text>
        </Center>
      </>
    );
  }

  return (
    <>
      {categoryForm}
      <VStack mt="4">
        {categories?.map((category) => (
          <HStack alignItems="center" key={category.name} mb="3">
            <Text flex="1">{category.name}</Text>
            <Button onPress={() => onDelete(category.id)} variant="ghost">
              <Icon as={FontAwesome6} name="trash" size="sm" />
            </Button>
          </HStack>
        ))}
      </VStack>
    </>
  );
}
