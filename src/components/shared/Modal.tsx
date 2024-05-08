import { ReactNode, useState } from "react";
import Modal from "react-modal";
interface ReactModalProps {
  children: ReactNode;
  setTrailerUrl: React.Dispatch<React.SetStateAction<string>>;
}
const ReactModal = ({ children, setTrailerUrl }: ReactModalProps) => {
  const [open, setOpen] = useState(true);
  const onCloseModal = () => {
    setOpen(false);
    setTrailerUrl("");
    document.body.style.overflow = "unset";
  };

  return (
    <div data-test-id="trailer-modal ">
      <Modal
        isOpen={open}
        className="w-[426px] md:w-[640px] lg:w-[854px] h-[480px]"
        onAfterOpen={() => (document.body.style.overflow = "hidden")}
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
            zIndex: 1000,
          },
          content: {
            position: "relative",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            border: "none",
            background: "transparent",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "0px",
            outline: "none",
            // padding: "20px",
            display: "flex",
            justifyContent: "center",
          },
        }}
        contentLabel=""
      >
        {children}
      </Modal>
    </div>
  );
};

export default ReactModal;
