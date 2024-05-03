import { ReactNode, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
interface ReactModalProps {
  children: ReactNode;
  setTrailerUrl: React.Dispatch<React.SetStateAction<string>>;
}
const ReactModal = ({ children, setTrailerUrl }: ReactModalProps) => {
  const [open, setOpen] = useState(true);
  const onCloseModal = () => {
    setOpen(false);
    setTrailerUrl("");
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "black",
    },
  };
  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={onCloseModal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "relative",
            width: "100%",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            border: "1px solid #ccc",
            background: "transparent",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
        contentLabel=""
      >
        {children}
      </Modal>
    </>
  );
};

export default ReactModal;
