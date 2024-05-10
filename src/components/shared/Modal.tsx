import {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
interface ReactModalProps {
  children: ReactNode;
  setTrailerUrl: React.Dispatch<React.SetStateAction<string>>;
}
const ReactModal = ({ children, setTrailerUrl }: ReactModalProps) => {
  const [open, setOpen] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick: MouseEventHandler = (e) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target as HTMLDivElement)
    ) {
      setOpen(false);
      setTrailerUrl("");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div data-test-id="trailer-modal">
      {open && (
        <div
          onClick={handleClick}
          className="z-50 h-[100vh] w-full fixed top-0 left-0 flex  justify-center items-center bg-main-gray bg-opacity-80 "
        >
          <div className="h-full flex justify-center items-center opacity-100 bg-white/80 w-full p-10">
            <div
              className="w-[426px] md:w-[640px] lg:w-[854px] h-[480px]"
              ref={modalRef}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactModal;
