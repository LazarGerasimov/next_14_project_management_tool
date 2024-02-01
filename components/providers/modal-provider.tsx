"use client";

import { useEffect, useState } from "react";
import { CardModal } from "../modals/card-modal";

export const ModalProvider = () => {

  const [isMounted, setIsMounted] = useState(false);
  // Prevent hydration error 
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />
    </>
  )
}