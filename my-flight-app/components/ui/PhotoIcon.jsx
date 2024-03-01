'use client'
import { AiFillPicture } from "react-icons/ai";
import Modal from "./Modal";
import { useState } from "react";
import { GetFlightPhotoById } from "../services/flightServices";


function PhotoIcon({ data }) {

  const [showModal, setShowModal] = useState(false);
  const [imageShow, setImageShow] = useState('')

  const handleSearchImage = async (data) => {
    const dataPhoto = await GetFlightPhotoById(data)
    const reader = new FileReader();
    reader.readAsDataURL(dataPhoto);
    reader.onload = () => {
      const base64String = reader.result;
      setImageShow(base64String)
      setShowModal(true)
    };
  }

  return (
    <>
      <button onClick={() => handleSearchImage(data)}>
        <AiFillPicture />
      </button>
      <Modal isVisibe={showModal} onClose={() =>setShowModal(false)}>
        <img
          className="w-50 h-50"
          src={imageShow}
          alt="No image selected"
        />
      </Modal>
    </>
  )
}

export default PhotoIcon
