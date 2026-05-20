"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const BookSessionModal = ({ tutor }) => {
  // console.log(Number(tutor.totalSlots));
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const onSubmit = async (e) => {
    if (!user) {
      toast.error("Please login first.");
      return;
    }
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const bookingData = Object.fromEntries(formData.entries());
    // console.log(bookingData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
    const data = await res.json();
    // console.log(data);
    if (data.success === true) {
      toast.success(data.message);
      router.refresh();
    } else {
      toast.error(data.message);
    }
  };
  //   console.log(tutor);
  //   console.log(user);
  return (
    <Modal>
      <Button isDisabled={Number(tutor.totalSlots) <= 0}>
        {Number(tutor.totalSlots) <= 0 ? "No Slots Available" : "Book Session"}
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Book Session</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Make Change to your Profile here, Click save change when you are
                done
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <TextField className="w-full" name="studentName" type="text">
                    <Label>Name</Label>
                    <Input value={user?.name} readOnly />
                  </TextField>

                  <TextField className="w-full" name="phone" type="tel">
                    <Label>Phone</Label>
                    <Input placeholder="Enter your phone number" />
                  </TextField>

                  <TextField className="w-full" name="tutorId" type="text">
                    <Label>Tutor ID</Label>
                    <Input value={tutor._id} readOnly />
                  </TextField>

                  <TextField className="w-full" name="tutorName" type="text">
                    <Label>Tutor Name</Label>
                    <Input value={tutor.tutorName} readOnly />
                  </TextField>

                  <TextField className="w-full" name="email" type="email">
                    <Label>Email</Label>
                    <Input value={user?.email} readOnly />
                  </TextField>

                  <div className="flex gap-2">
                    <Button slot="close" variant="secondary">
                      Cancel
                    </Button>
                    <Button type="submit" slot="close">
                      Book Session
                    </Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default BookSessionModal;
