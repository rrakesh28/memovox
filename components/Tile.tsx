import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  icon: ReactNode;
  title: string;
  onPress: () => void;
}

const Tile: React.FC<Props> = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row gap-10 items-center"
    >
      <View>{icon}</View>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default Tile;
