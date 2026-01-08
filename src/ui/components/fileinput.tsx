import { useState } from "react";
import {
  applyProps,
  Button,
  ColorSelection,
  ElbeProps,
  IconButton,
  IconChild,
  Icons,
  Row,
  Text,
} from "../..";

/**
 * A file input component that allows users to select files from their device.
 * It can be configured to show only a button or also display the selected file name.
 *
 * **Properties:**
 * - `buttonOnly` (boolean): If true, only the button is displayed without the file name.
 * - `manner` (ColorSelection.Manners): The visual style of the button.
 * - `label` (string): The label text for the button.
 * - `icon` (IconChild): An optional icon to display on the button.
 * - `flex` (number | boolean): Flex property for layout adjustments.
 * - `clearable` (boolean): If true, a clear button is shown to remove the selected file.
 * - `accept` (string[]): An array of accepted file types/extensions.
 * - `onInput` (function): Callback function that receives the selected file or null when cleared.
 */
export function FileInput(
  p: {
    buttonOnly?: boolean;
    manner?: ColorSelection.Manners;
    label: string;
    icon?: IconChild;
    flex?: number | boolean;
    clearable?: boolean;
    accept: string[];
    onInput: (p: { blob: Blob | null; filename: string | null }) => void;
  } & ElbeProps
) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    setFileName(file?.name ?? null);
    p.onInput({ blob: file ?? null, filename: file?.name ?? null });
  };

  return (
    <>
      <label {...applyProps("input_file", p)}>
        <Row>
          <Button
            manner={p.manner ?? "major"}
            label={p.label ?? "Select File"}
            icon={p.icon ?? Icons.Upload}
            ariaLabel="select a file"
            flex={p.buttonOnly ? p.flex : undefined}
            onTap={(e) => {
              // pass the event on to the input element
              const input = (
                e.currentTarget as HTMLElement
              ).parentElement?.parentElement?.parentElement?.querySelector(
                "input[type=file]"
              ) as HTMLInputElement;

              console.log("input", input);

              input?.click();
            }}
          />
          {!p.buttonOnly && fileName && (
            <>
              <Text
                tooltip={fileName ?? undefined}
                v={fileName ?? ""}
                flex={p.flex}
                style={{
                  maxWidth: "100%",
                  textOverflow: "ellipsis",
                  textWrap: "nowrap",
                  overflow: "hidden",
                  // prevent the text from squishing the button when flex is used
                  flexShrink: 1,
                  minWidth: "0",
                }}
              />
              {p.clearable && (
                <IconButton.flat
                  ariaLabel="clear file"
                  icon={Icons.X}
                  onTap={() => {
                    setFileName(null);
                    p.onInput({ blob: null, filename: null });
                  }}
                />
              )}
            </>
          )}
          <input
            style={{ display: "none" }}
            type="file"
            accept={p.accept.join(",")}
            onChange={handleFileChange}
          />
        </Row>
      </label>
    </>
  );
}
