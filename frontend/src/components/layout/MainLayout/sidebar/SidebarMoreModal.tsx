"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLogout } from "@/features/auth/hooks/useLogout";

import SidebarMoreItem from "./SidebarMoreItem";

import {
  moreModalSections,
} from "./sidebar.data";

interface SidebarMoreModalProps {
  open: boolean;

  onClose: () => void;
}

export default function SidebarMoreModal({
  open,
  onClose,
}: SidebarMoreModalProps) {
  const router = useRouter();

  const logout =
    useLogout();

  const clearUser = useAuthStore(
    (state) => state.clearUser
  );

  const handleAction =
    async (action?: string) => {
      switch (action) {
        case "logout":
          try {
            await logout.mutateAsync();

            clearUser();

            router.replace(
              "/login"
            );
          } catch (error) {
            console.error(
              "Logout failed",
              error
            );
          }
          break;

        case "appearance":
          console.log(
            "Switch appearance"
          );
          break;

        case "switch-account":
          console.log(
            "Switch account"
          );
          break;

        default:
          break;
      }

      onClose();
    };

  if (!open) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-[70]"
      />

      {/* Modal */}
      <div
        className="
          absolute
          bottom-[100]
          left-2
          z-[80]

          w-80

          overflow-hidden

          rounded-3xl

          border
          border-white/10

          bg-zinc-950/95

          shadow-2xl

          backdrop-blur-xl
        "
      >
        {moreModalSections.map(
          (
            section,
            sectionIndex
          ) => (
            <div
              key={`${section.title}-${sectionIndex}`}
            >
              {/* Title */}
              <div
                className="
                  px-4
                  pt-4
                  pb-2
                "
              >
                <p
                  className="
                    text-[11px]
                    font-semibold
                    uppercase

                    tracking-[0.18em]

                    text-zinc-500
                  "
                >
                  {section.title}
                </p>
              </div>

              {/* Items */}
              <div className="px-2 pb-2">
                {section.items.map(
                  (item) => (
                    <SidebarMoreItem
                      key={item.label}
                      label={
                        item.label
                      }
                      icon={
                        item.icon
                      }
                      href={
                        "href" in item
                          ? item.href
                          : undefined
                      }
                      danger={
                        "danger" in item
                          ? item.danger
                          : undefined
                      }
                      onClick={() =>
                        handleAction(
                          item.action
                        )
                      }
                    />
                  )
                )}
              </div>

              {/* Divider */}
              {sectionIndex !==
                moreModalSections.length -
                  1 && (
                <div
                  className="
                    mx-4

                    border-t
                    border-white/10
                  "
                />
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}