import React, { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { api } from "../api/api";

interface UploadModalProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ResponseMessage {
  display: "none" | "block";
  msg: string;
  color?: "red" | "black";
}

export const UploadModal = ({
  isModalVisible,
  setIsModalVisible,
}: UploadModalProps) => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [responseMsg, setResponseMsg] = useState<ResponseMessage>({
    display: "none",
    color: "black",
    msg: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      let insert = true;
      for (let i = 0; i < files.length; i++) {
        const e = files[i];
        for (const { name } of fileList) {
          if (name === e.name) {
            insert = false;
            setResponseMsg({
              color: "red",
              display: "block",
              msg: "File already choosen.",
            });
            break;
          } else insert = true;
        }

        if (insert)
          setFileList((list) => {
            const newList = [...list];
            newList.push(e);
            return newList;
          });
      }
    }
  };

  const fileUpload = () => {
    inputRef.current?.click();
  };

  const doUpload = async () => {
    const formData = new FormData();
    fileList.forEach((f) => {
      formData.append("file", f);
    });

    const { data, status } = await api.upload(formData);
    if (status < 300) {
      setResponseMsg({
        color: "black",
        display: "block",
        msg: data.response,
      });
      setFileList([]);
    } else {
      setResponseMsg({
        color: "red",
        display: "block",
        msg: "erro",
      });
    }
  };

  const deleteFromList = (e: React.MouseEvent<HTMLLIElement>) => {
    const key = e.currentTarget.innerText;
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].name === key) {
        setFileList(() => {
          return [...fileList].splice(i + 1, 1);
        });
        break;
      }
    }
  };

  const hideModal = () => {
    setResponseMsg({ display: "none", msg: "" });
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal show={isModalVisible} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>File upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="file"
            id="fileUpload"
            ref={inputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            // accept={"application/pdf"} - You can change allowed files here.
            multiple
          />
          {fileList &&
            fileList.map((e, i) => (
              <li
                key={i}
                onClick={deleteFromList}
                style={{ cursor: "pointer" }}
              >
                {e.name}
              </li>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <p style={{ color: responseMsg.color, display: responseMsg.display }}>
            {responseMsg.msg}
          </p>
          <Button onClick={fileUpload}>Select files</Button>
          <Button onClick={doUpload}>Start upload</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
