"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { deleteItem, updateItem } from "@/services";
import { ProfileListingItem } from "@/types";
import { cn } from "@/lib/utils";
import { Button, Text } from "../atoms";
import { toSafeImageSrc } from "@/lib/image";

interface ListingsWrapperProps {
  listings: ProfileListingItem[];
  className?: string;
}

const ListingsWrapper = ({ listings, className }: ListingsWrapperProps) => {
  const router = useRouter();
  const [items, setItems] = useState<ProfileListingItem[]>(listings);
  const [busyItemId, setBusyItemId] = useState<string | null>(null);
  const [confirmDeleteItemId, setConfirmDeleteItemId] = useState<string | null>(
    null,
  );
  const [message, setMessage] = useState<string>();
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>();

  const sortedItems = useMemo(() => items, [items]);

  const handleEdit = (item: ProfileListingItem) => {
    if (item.status !== "published") {
      setIsSuccess(false);
      setMessage("Only published items can be edited.");
      return;
    }
    router.push(`/product/edit/${item.id}`);
  };

  const requestDelete = (item: ProfileListingItem) => {
    if (item.status !== "published") {
      setIsSuccess(false);
      setMessage("Only published items can be deleted.");
      return;
    }

    setConfirmDeleteItemId(item.id);
  };

  const cancelDelete = () => {
    setConfirmDeleteItemId(null);
  };

  const handleDelete = async (item: ProfileListingItem) => {
    if (item.status !== "published") {
      setIsSuccess(false);
      setMessage("Only published items can be deleted.");
      setConfirmDeleteItemId(null);
      return;
    }

    setBusyItemId(item.id);
    setMessage(undefined);
    setIsSuccess(undefined);

    const response = await deleteItem(item.id);
    if (!response.success) {
      setIsSuccess(false);
      setMessage(response.error || "Failed to delete item.");
      setBusyItemId(null);
      return;
    }

    setItems((previous) =>
      previous.filter((current) => current.id !== item.id),
    );
    setConfirmDeleteItemId(null);
    setIsSuccess(true);
    setMessage("Listing deleted.");
    setBusyItemId(null);
  };

  const handleMarkSold = async (itemId: string) => {
    setBusyItemId(itemId);
    setMessage(undefined);
    setIsSuccess(undefined);

    const response = await updateItem(itemId, { status: "sold" });
    if (!response.success) {
      setIsSuccess(false);
      setMessage(response.error || "Failed to mark item as sold.");
      setBusyItemId(null);
      return;
    }

    setItems((previous) =>
      previous.map((item) =>
        item.id === itemId ? { ...item, status: "sold" } : item,
      ),
    );
    setIsSuccess(true);
    setMessage("Listing marked as sold.");
    setBusyItemId(null);
  };

  if (!sortedItems.length) {
    return (
      <div
        className={cn(
          "flex min-h-[220px] items-center justify-center rounded-[16px] border border-textSecondary/20 bg-white",
          className,
        )}
      >
        <Text type="p" className="text-sm text-textSecondary">
          No listings yet.
        </Text>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      {message && (
        <Text
          type="p"
          className={cn(
            "text-sm",
            isSuccess ? "text-green-700" : "text-red-700",
          )}
        >
          {message}
        </Text>
      )}

      {sortedItems.map((item) => {
        const isBusy = busyItemId === item.id;
        const canEditOrDelete = item.status === "published";
        const isConfirmingDelete = confirmDeleteItemId === item.id;

        return (
          <article
            key={item.id}
            className="flex flex-col gap-4 rounded-[16px] border border-textSecondary/20 bg-white p-4 md:flex-row"
          >
            {isConfirmingDelete ? (
              <div className="flex w-full flex-col gap-3">
                <Text
                  type="h3"
                  className="text-base font-semibold text-textPrimary"
                >
                  Delete this item?
                </Text>
                <Text type="p" className="text-sm text-textSecondary">
                  You are about to delete "{item.title}". This action cannot be
                  undone.
                </Text>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    onClick={() => handleDelete(item)}
                    disabled={isBusy}
                    className="rounded-md border border-red-200 px-3 py-2 text-xs font-medium text-red-700 disabled:opacity-50"
                  >
                    {isBusy ? "Deleting..." : "Confirm Delete"}
                  </Button>
                  <Button
                    type="button"
                    onClick={cancelDelete}
                    disabled={isBusy}
                    className="rounded-md border border-textSecondary/30 px-3 py-2 text-xs font-medium text-textPrimary disabled:opacity-50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={toSafeImageSrc(item.imageSrc)}
                  alt={`${item.title} photo`}
                  className="h-28 w-full rounded-[12px] object-cover md:w-36"
                />

                <div className="flex-1 space-y-2">
                  <Link href={`/product/${item.id}`} className="inline-block">
                    <Text
                      type="h3"
                      className="text-base font-semibold text-blue-600 underline-offset-2 hover:underline"
                    >
                      {item.title}
                    </Text>
                  </Link>
                  <Text type="p" className="text-sm text-textSecondary">
                    {item.description || "No description"}
                  </Text>
                  <Text
                    type="p"
                    className="text-sm font-medium text-textPrimary"
                  >
                    €{item.price}
                  </Text>
                  <Text type="p" className="text-xs text-textSecondary">
                    Status: {item.status}
                  </Text>
                </div>

                <div className="flex shrink-0 items-start gap-2 md:flex-col">
                  <Button
                    type="button"
                    onClick={() => handleEdit(item)}
                    disabled={isBusy || !canEditOrDelete}
                    className="rounded-md border border-textSecondary/30 px-3 py-2 text-xs font-medium text-textPrimary disabled:opacity-50"
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    onClick={() => requestDelete(item)}
                    disabled={isBusy || !canEditOrDelete}
                    className="rounded-md border border-red-200 px-3 py-2 text-xs font-medium text-red-700 disabled:opacity-50"
                  >
                    Delete
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleMarkSold(item.id)}
                    disabled={isBusy || item.status === "sold"}
                    className="rounded-md bg-secondary px-3 py-2 text-xs font-medium text-white disabled:opacity-50"
                  >
                    {item.status === "sold"
                      ? "Sold"
                      : isBusy
                        ? "Updating..."
                        : "Mark Sold"}
                  </Button>
                </div>
              </>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default ListingsWrapper;
