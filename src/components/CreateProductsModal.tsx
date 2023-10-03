import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "./Modal";

const CreateProductsModal = ({}) => {
  const { register, handleSubmit, control } = useForm();
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal open={open} close={close} title="Create Product"></Modal>
    </>
  );
};

export default CreateProductsModal;
