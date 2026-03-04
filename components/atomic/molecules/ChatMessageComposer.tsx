"use client";

import { FormEvent, useRef, useState } from "react";

import { Button, Input, Text } from "../atoms";

interface ChatMessageComposerProps {
  onSend: (payload: {
    text?: string;
    file?: {
      data: ArrayBuffer;
      name: string;
      mimeType: string;
    };
  }) => Promise<void>;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ChatMessageComposer = ({ onSend }: ChatMessageComposerProps) => {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>();
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedText = text.trim();
    if (!normalizedText && !selectedFile) {
      setError("Write a message or select a file.");
      return;
    }

    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      setError("File is too large. Maximum size is 5 MB.");
      return;
    }

    setError(undefined);
    setIsSending(true);

    try {
      let filePayload:
        | {
            data: ArrayBuffer;
            name: string;
            mimeType: string;
          }
        | undefined;

      if (selectedFile) {
        const data = await selectedFile.arrayBuffer();
        filePayload = {
          data,
          name: selectedFile.name,
          mimeType: selectedFile.type || "application/octet-stream",
        };
      }

      await onSend({
        text: normalizedText || undefined,
        file: filePayload,
      });

      setText("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (sendError) {
      setError(
        sendError instanceof Error ? sendError.message : "Failed to send.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 border-t px-6 py-4"
    >
      <div className="flex items-center gap-2">
        <Input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type your message"
          className="h-11 rounded-full border-textSecondary/25 px-4"
        />
        <Button
          type="submit"
          disabled={isSending}
          className="h-11 rounded-full bg-primaryGreen px-5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isSending ? "Sending..." : "Send"}
        </Button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <input
          ref={fileInputRef}
          type="file"
          onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
          className="text-sm text-textSecondary"
        />
        {selectedFile && (
          <Text type="span" className="truncate text-xs text-textSecondary">
            {selectedFile.name}
          </Text>
        )}
      </div>

      {error && (
        <Text type="p" className="text-xs text-red-600">
          {error}
        </Text>
      )}
    </form>
  );
};

export default ChatMessageComposer;
