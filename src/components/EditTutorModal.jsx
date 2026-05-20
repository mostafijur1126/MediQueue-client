"use client";

import { Button, Modal } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const fields = [
  { label: "Tutor Name", name: "tutorName", type: "text" },
  { label: "Photo URL", name: "photo", type: "url" },
  { label: "Subject", name: "subject", type: "text" },
  { label: "Teaching Mode", name: "teachingMode", type: "text" },
  { label: "Institution", name: "institution", type: "text" },
  { label: "Location", name: "location", type: "text" },
  { label: "Available Time", name: "availableTime", type: "text" },
  { label: "Session Start Date", name: "sessionStartDate", type: "date" },
  { label: "Experience", name: "experience", type: "text" },
  { label: "Hourly Fee", name: "hourlyFee", type: "number" },
  { label: "Total Slots", name: "totalSlots", type: "number" },
];

const EditTutorModal = ({ tutor }) => {
  const router = useRouter();
  // console.log(tutor);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // number fields convert to Number
    data.hourlyFee = Number(data.hourlyFee);
    data.totalSlots = Number(data.totalSlots);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URI}/updateTutor/${tutor._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const updateData = await res.json();
    if (updateData.modifiedCount > 0) {
      toast.success("Updated successfully.");
      router.refresh();
    } else {
      toast.error("Update failed.");
    }
  };

  return (
    <Modal>
      <Button
        size="sm"
        className="text-xs px-3 py-1.5 rounded-md font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
      >
        Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="max-w-4xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Edit Tutor Information</Modal.Heading>
              <p className="text-sm text-muted mt-1">
                Update tutor details and save changes.
              </p>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 2 Column Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fields.map((field) => (
                    <div key={field.name} className="space-y-1">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        defaultValue={tutor[field.name] || ""}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                  <Button slot="close" variant="secondary">
                    Cancel
                  </Button>

                  <Button type="submit" slot="close">
                    Update Tutor
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditTutorModal;
