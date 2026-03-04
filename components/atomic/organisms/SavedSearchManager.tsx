"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { getAuthSession } from "@/lib/auth-session";
import {
  createSavedSearch,
  deleteSavedSearch,
  getSavedSearches,
  updateSavedSearch,
} from "@/services";
import { SavedSearch as SavedSearchType } from "@/types";
import { SaveSearch } from "../molecules";
import { Button, Input, Text, Toggle } from "../atoms";
import AuthModal from "./AuthModal";
import Modal from "./Modal";

const SavedSearchManager = () => {
  const searchParams = useSearchParams();

  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [openListAfterLogin, setOpenListAfterLogin] = useState(false);

  const [savedSearches, setSavedSearches] = useState<SavedSearchType[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [listError, setListError] = useState<string | undefined>();

  const [searchName, setSearchName] = useState("");
  const [enableEmail, setEnableEmail] = useState(false);
  const [enableInApp, setEnableInApp] = useState(false);
  const [isSubmittingCreate, setIsSubmittingCreate] = useState(false);
  const [createError, setCreateError] = useState<string | undefined>();

  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const currentSearchTerm = useMemo(
    () => searchParams.get("search") ?? "",
    [searchParams],
  );

  useEffect(() => {
    const handleAuthChange = () => {
      if (!openListAfterLogin) {
        return;
      }

      const session = getAuthSession();
      if (session?.authenticated) {
        setOpenListAfterLogin(false);
        setIsAuthModalOpen(false);
        void openListModal();
      }
    };

    window.addEventListener("auth-session-changed", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("auth-session-changed", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, [openListAfterLogin]);

  const parseSavedSearches = (data: unknown): SavedSearchType[] => {
    const directList = (data as { savedSearches?: SavedSearchType[] })
      ?.savedSearches;
    if (Array.isArray(directList)) {
      return directList;
    }

    if (Array.isArray(data)) {
      return data as SavedSearchType[];
    }

    return [];
  };

  const loadSavedSearches = async () => {
    setIsLoadingList(true);
    setListError(undefined);

    const response = await getSavedSearches();
    if (!response.success) {
      const unauthorized =
        response.error?.toLowerCase().includes("not authorized") ||
        response.error?.includes("401");

      if (unauthorized) {
        setIsListModalOpen(false);
        setIsAuthModalOpen(true);
        setOpenListAfterLogin(true);
      } else {
        setListError(response.error || "Failed to load saved searches.");
      }
      setIsLoadingList(false);
      return;
    }

    setSavedSearches(parseSavedSearches(response.data));
    setIsLoadingList(false);
  };

  const openListModal = async () => {
    setIsListModalOpen(true);
    await loadSavedSearches();
  };

  const handleOpen = async () => {
    const session = getAuthSession();
    if (!session?.authenticated) {
      setOpenListAfterLogin(true);
      setIsAuthModalOpen(true);
      return;
    }

    await openListModal();
  };

  const openCreateModal = () => {
    setSearchName(currentSearchTerm);
    setEnableEmail(false);
    setEnableInApp(false);
    setCreateError(undefined);
    setIsListModalOpen(false);
    setIsCreateModalOpen(true);
  };

  const handleCreateSavedSearch = async () => {
    const name = searchName.trim();
    if (!name) {
      setCreateError("Please enter a name for this saved search.");
      return;
    }

    setIsSubmittingCreate(true);
    setCreateError(undefined);

    const searchTerms = name
      .split(",")
      .map((term) => term.trim())
      .filter(Boolean);

    const response = await createSavedSearch({
      searchTerms: searchTerms.length ? searchTerms : [name],
      email: enableEmail,
      in_app: enableInApp,
    });

    if (!response.success) {
      const unauthorized =
        response.error?.toLowerCase().includes("not authorized") ||
        response.error?.includes("401");

      if (unauthorized) {
        setIsCreateModalOpen(false);
        setIsListModalOpen(false);
        setIsAuthModalOpen(true);
        setOpenListAfterLogin(true);
      } else {
        setCreateError(response.error || "Failed to create saved search.");
      }
      setIsSubmittingCreate(false);
      return;
    }

    setIsSubmittingCreate(false);
    setIsCreateModalOpen(false);
    setIsListModalOpen(true);
    await loadSavedSearches();
  };

  const handleToggle = async (
    savedSearch: SavedSearchType,
    key: "email" | "in_app",
  ) => {
    setUpdatingId(savedSearch.id);

    const response = await updateSavedSearch(savedSearch.id, {
      [key]: !Boolean(savedSearch[key]),
    });

    if (!response.success) {
      const unauthorized =
        response.error?.toLowerCase().includes("not authorized") ||
        response.error?.includes("401");

      if (unauthorized) {
        setIsCreateModalOpen(false);
        setIsListModalOpen(false);
        setIsAuthModalOpen(true);
        setOpenListAfterLogin(true);
      } else {
        setListError(response.error || "Failed to update saved search.");
      }
      setUpdatingId(null);
      return;
    }

    setSavedSearches((previous) =>
      previous.map((item) =>
        item.id === savedSearch.id
          ? {
              ...item,
              email:
                response.data?.email !== undefined
                  ? Boolean(response.data.email)
                  : item.email,
              in_app:
                response.data?.in_app !== undefined
                  ? Boolean(response.data.in_app)
                  : item.in_app,
            }
          : item,
      ),
    );
    setUpdatingId(null);
  };

  const handleDelete = async (savedSearchId: number) => {
    setDeletingId(savedSearchId);
    const response = await deleteSavedSearch(savedSearchId);

    if (!response.success) {
      const unauthorized =
        response.error?.toLowerCase().includes("not authorized") ||
        response.error?.includes("401");

      if (unauthorized) {
        setIsCreateModalOpen(false);
        setIsListModalOpen(false);
        setIsAuthModalOpen(true);
        setOpenListAfterLogin(true);
      } else {
        setListError(response.error || "Failed to delete saved search.");
      }
      setDeletingId(null);
      return;
    }

    setSavedSearches((previous) =>
      previous.filter((item) => item.id !== savedSearchId),
    );
    setDeletingId(null);
  };

  return (
    <>
      <SaveSearch onClick={() => void handleOpen()} />

      <Modal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        contentClassName="max-w-2xl"
      >
        <div className="flex flex-col gap-4">
          <Text type="h3" className="text-xl font-semibold text-textPrimary">
            Saved Searches
          </Text>

          {listError && (
            <Text type="p" className="text-sm text-red-500">
              {listError}
            </Text>
          )}

          {isLoadingList ? (
            <Text type="p" className="text-sm text-textSecondary">
              Loading saved searches...
            </Text>
          ) : savedSearches.length ? (
            <div className="max-h-[360px] overflow-y-auto pr-1 flex flex-col gap-3">
              {savedSearches.map((savedSearch) => (
                <div
                  key={savedSearch.id}
                  className="rounded-xl border border-textSecondary/30 p-4 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Text
                      type="p"
                      className="text-sm font-medium text-textPrimary"
                    >
                      {savedSearch.searchTerms?.join(", ") || "Saved search"}
                    </Text>
                    <Button
                      onClick={() => void handleDelete(savedSearch.id)}
                      disabled={deletingId === savedSearch.id}
                      className="text-sm text-red-500 disabled:opacity-50"
                    >
                      {deletingId === savedSearch.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <Text type="span" className="text-sm text-textSecondary">
                      Email notifications
                    </Text>
                    <Toggle
                      enabled={Boolean(savedSearch.email)}
                      disabled={updatingId === savedSearch.id}
                      ariaLabel="Toggle email notifications"
                      onToggle={() => void handleToggle(savedSearch, "email")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Text type="span" className="text-sm text-textSecondary">
                      In-app notifications
                    </Text>
                    <Toggle
                      enabled={Boolean(savedSearch.in_app)}
                      disabled={updatingId === savedSearch.id}
                      ariaLabel="Toggle in-app notifications"
                      onToggle={() => void handleToggle(savedSearch, "in_app")}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Text type="p" className="text-sm text-textSecondary">
              You have no saved searches yet.
            </Text>
          )}

          <Button
            onClick={openCreateModal}
            className="mt-2 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
          >
            Add new saved search
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        contentClassName="max-w-xl"
      >
        <div className="flex flex-col gap-4">
          <Text type="h3" className="text-xl font-semibold text-textPrimary">
            Add Saved Search
          </Text>

          <div className="flex flex-col gap-2">
            <Text type="span" className="text-sm font-medium text-textPrimary">
              Name
            </Text>
            <Input
              type="text"
              placeholder="e.g. macbook, laptop"
              value={searchName}
              onChange={(event) => setSearchName(event.target.value)}
            />
          </div>

          <div className="rounded-xl border border-textSecondary/30 p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Text type="span" className="text-sm text-textSecondary">
                Enable email notifications
              </Text>
              <Toggle
                enabled={enableEmail}
                ariaLabel="Enable email notifications"
                onToggle={() => setEnableEmail((previous) => !previous)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Text type="span" className="text-sm text-textSecondary">
                Enable in-app notifications
              </Text>
              <Toggle
                enabled={enableInApp}
                ariaLabel="Enable in-app notifications"
                onToggle={() => setEnableInApp((previous) => !previous)}
              />
            </div>
          </div>

          {createError && (
            <Text type="p" className="text-sm text-red-500">
              {createError}
            </Text>
          )}

          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                setIsCreateModalOpen(false);
                setIsListModalOpen(true);
              }}
              className="rounded-md border border-textSecondary/30 px-4 py-2 text-sm text-textPrimary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => void handleCreateSavedSearch()}
              disabled={isSubmittingCreate}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {isSubmittingCreate ? "Saving..." : "Save search"}
            </Button>
          </div>
        </div>
      </Modal>

      <AuthModal
        isOpen={isAuthModalOpen}
        initialView="login"
        onClose={() => {
          setIsAuthModalOpen(false);
          setOpenListAfterLogin(false);
        }}
      />
    </>
  );
};

export default SavedSearchManager;
