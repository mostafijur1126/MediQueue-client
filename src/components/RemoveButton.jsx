"use client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const RemoveButton = ({ bookingId, status }) => {
  const router = useRouter();
  const handelCancelSession = async () => {
    if (status === "Cancelled") return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URI}/booking/${bookingId}`,
      {
        method: "PATCH",
      },
    );
    const data = await res.json();
    if (data.modifiedCount > 0) {
      toast.success("Session cancelled successtully!");
      router.refresh();
    } else {
      toast.error("Failed to cancel session.");
    }
  };
  return (
    <AlertDialog>
      <div className="flex items-center gap-2">
        <Button
          disabled={status === "Cancelled"}
          size="sm"
          className={`text-xs px-3 py-1.5 rounded-md font-medium ${
            status === "Cancelled"
              ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500"
              : " bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors"
          }`}
        >
          Remove
        </Button>
      </div>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Are you sure you want to cancel this session?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={handelCancelSession}
                slot="close"
                variant="danger"
              >
                Cancel Session
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default RemoveButton;
