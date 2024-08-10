import { FontAwesome6 } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { formatDate } from "date-fns";
import { Button, Flex, Icon, Text } from "native-base";

interface DatePickerProps {
  currentDate: string;
  onChange: (date: string) => void;
}

export function DatePicker({ currentDate, onChange }: DatePickerProps) {
  function pickDate(): void {
    DateTimePickerAndroid.open({
      value: new Date(currentDate),
      onChange: (event, date) => {
        if (date) {
          onChange(formatDate(date, "yyyy-MM-dd"));
        }
      },
      mode: "date",
    });
  }

  return (
    <Button onPress={pickDate} variant="ghost" alignSelf="flex-start" fontWeight="bold">
      <Flex direction="row" align="center">
        <Text fontWeight="bold" mr="2">
          {formatDate(currentDate, "eee, d LLL yyyy")}
        </Text>
        <Icon as={FontAwesome6} name="caret-down" size="sm" color="black" />
      </Flex>
    </Button>
  );
}
