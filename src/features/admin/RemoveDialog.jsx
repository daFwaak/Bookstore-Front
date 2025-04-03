import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";

import React, { useState } from 'react'
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
        token: user.token
      }).unwrap();
      toast.success('Book Removed Successfully');
      handleOpen();
    } catch (err) {
      handleOpen();
      toast.error(err.data?.message);
    }
  }

  return (
    <>
      <IconButton onClick={handleOpen} size='sm' color='pink'>
        <i className="fas fa-trash" />
      </IconButton>


      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          The key to more success 
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button loading={isLoading} variant="gradient" color="green" onClick={handleRemove}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default RemoveDialog