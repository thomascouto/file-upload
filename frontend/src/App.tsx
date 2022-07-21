import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FilesTable } from "./components/FilesTable";
import { UploadModal } from "./components/UploadModal";

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div>
      <header>
        <UploadModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
        <FilesTable isModalVisible={isModalVisible} />
        <Button onClick={handleModal}>Upload</Button>
      </header>
    </div>
  );
};

export default App;
