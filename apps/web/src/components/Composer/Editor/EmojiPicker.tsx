import { EditorRegex } from "@hey/data/regex";
import type { Emoji } from "@hey/types/misc";
import { useEditor } from "prosekit/react";
import {
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover
} from "prosekit/react/autocomplete";
import { useState } from "react";
import cn from "@/helpers/cn";
import type { EditorExtension } from "@/helpers/prosekit/extension";
import useEmojis from "@/hooks/prosekit/useEmojis";

interface EmojiItemProps {
  emoji: Emoji;
  onSelect: VoidFunction;
}

const EmojiItem = ({ emoji, onSelect }: EmojiItemProps) => {
  return (
    <AutocompleteItem
      className="focusable-dropdown-item m-1 block cursor-pointer rounded-lg p-2 outline-hidden"
      onSelect={onSelect}
    >
      <div className="flex items-center space-x-2">
        <span className="text-base">{emoji.emoji}</span>
        <span className="text-sm capitalize">
          {emoji.aliases[0].split("_").join(" ")}
        </span>
      </div>
    </AutocompleteItem>
  );
};

const EmojiPicker = () => {
  const editor = useEditor<EditorExtension>();
  const [query, setQuery] = useState("");
  const { emojis } = useEmojis({ query });

  const handleInsert = (emoji: Emoji) => {
    editor.commands.insertText({ text: emoji.emoji });
  };

  return (
    <AutocompletePopover
      className={cn(
        "z-10 w-52 select-none rounded-xl border border-gray-200 bg-white shadow-xs dark:border-gray-700 dark:bg-gray-900",
        !emojis.length && "hidden"
      )}
      offset={10}
      onQueryChange={setQuery}
      regex={EditorRegex.emoji}
    >
      <AutocompleteList filter={null}>
        {emojis.map((emoji) => (
          <EmojiItem
            emoji={emoji}
            key={emoji.emoji}
            onSelect={() => handleInsert(emoji)}
          />
        ))}
      </AutocompleteList>
    </AutocompletePopover>
  );
};

export default EmojiPicker;
