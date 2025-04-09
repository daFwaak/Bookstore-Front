import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Spinner,
} from "@material-tailwind/react";

import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRemoveBookMutation } from "../book/bookApi";

const RemoveDialog = ({ id }) => {
  const [removeBook, { isLoading }] = useRemoveBookMutation();
  const { user } = useSelector((state) => state.userSlice);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleRemove = async () => {
    try {
      await removeBook({
        id,
        token: user.token,
      }).unwrap();
      toast.success("Book removed successfully.");
      handleOpen();
    } catch (err) {
      handleOpen();
      toast.error(err?.data?.message || "Failed to remove the book.");
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen} size="sm" color="pink" aria-label="Remove Book">
        <i className="fas fa-trash" />
      </IconButton>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Remove Book</DialogHeader>
        <DialogBody>
          Are you sure you want to remove this book? This action cannot be undone.
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleRemove}
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="h-4 w-4" /> : <span>Confirm</span>}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default RemoveDialog;
