import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface IdialougeProps {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  header: string;
  message: string;
}

const DialougeBox = (props: IdialougeProps) => {
  const { isOpen, header, message, handleClose, handleConfirm } = props;
  return (
    <div>
      <Dialog size="xs" open={isOpen} handler={() => {}}>
        <DialogHeader>{header}</DialogHeader>
        <DialogBody>{message}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="indigo" onClick={handleConfirm}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default DialougeBox;
