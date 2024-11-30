import { Note } from "@/types/Note";
import { formatDate } from "@/utils/formatDate";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  note: Note;
}

const NoteCard: React.FC<Props> = ({ note }) => {
  return (
    <Link
      href={`/notes/${note.id}`}
      className="bg-soft-beige w-full my-2 p-4 rounded-md min-h-48"
    >
      <View>
        <Text
          className="text-lg"
          style={{ fontFamily: "ShipporiMincho_400Regular" }}
        >
          {formatDate(note.created_at)}
        </Text>
        <Text
          className="text-lg"
          numberOfLines={5}
          ellipsizeMode="tail"
          style={{ fontFamily: "Handlee_400Regular" }}
        >
          {note.notes}
        </Text>
      </View>
    </Link>
  );
};

export default NoteCard;
