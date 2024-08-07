import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { Button, Divider, HStack, Icon, Menu, Modal, Spinner, Text, useDisclose, VStack } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { CategoryManagement } from "./CategoryManagement";

interface CategoryPickerProps {
  categoryId: number | null;
  onChange: (categoryId: number | null) => void;
}

export function CategoryPicker({ categoryId, onChange }: CategoryPickerProps) {
  const { categories, fetchCategories, addCategory, isLoading, error } = useCategories();
  const [category, setCategory] = useState<string>();
  const { isOpen, onOpen, onClose } = useDisclose();

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [fetchCategories]),
  );

  useEffect(() => {
    if (categoryId) {
      const category = categories?.find((c) => c.id === categoryId);
      if (category) {
        setCategory(category.name);
        return;
      }
    }

    setCategory("uncategorized");
  }, [categoryId, categories]);

  if (isLoading) {
    return (
      <Button variant="subtle" colorScheme="secondary" size="sm" p="1" ml="2">
        <Spinner accessibilityLabel="Loading categories" size="sm" />
      </Button>
    );
  }

  return (
    <>
      <Menu
        w="190"
        trigger={(triggerProps) => {
          return (
            <Button variant="subtle" colorScheme="secondary" size="sm" p="1" ml="2" {...triggerProps}>
              {error ? <Icon as={FontAwesome6} name="circle-exclamation" /> : category}
            </Button>
          );
        }}
      >
        {error && (
          <Menu.Item isDisabled>
            <VStack>
              <Text fontSize="xs" color="red.500">
                Failed to load Categories
              </Text>
              <Text fontSize="xs" color="gray.500">
                {error.message}
              </Text>
            </VStack>
          </Menu.Item>
        )}
        {categories?.map((category) => (
          <Menu.Item key={category.id} onPress={() => onChange(category.id)}>
            <HStack alignItems="center">
              <Text flex="1">{category.name}</Text>
              <Text>{category.id === categoryId && <Icon as={FontAwesome} name="check" mr="2" />}</Text>
            </HStack>
          </Menu.Item>
        ))}
        <Divider mt="3" w="100%" />
        <Menu.Item onPress={() => onChange(null)} my="2">
          <HStack alignItems="center">
            <Icon as={FontAwesome} name="close" mr="2" />
            <Text fontSize="xs" fontWeight="medium">
              Remove category
            </Text>
          </HStack>
        </Menu.Item>
        <Menu.Item onPress={onOpen}>
          <HStack alignItems="center">
            <Icon as={FontAwesome} name="cog" mr="2" />
            <Text fontSize="xs" fontWeight="medium">
              Manage Categories
            </Text>
          </HStack>
        </Menu.Item>
      </Menu>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <Modal.Content>
          {/* <Modal.CloseButton /> */}
          <Modal.Header borderBottomWidth="0" pb="0">
            Categories
          </Modal.Header>
          <Modal.Body>
            <CategoryManagement isLoading={isLoading} error={error} categories={categories} onAdd={addCategory} />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
