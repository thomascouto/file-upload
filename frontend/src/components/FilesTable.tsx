import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { api } from "../api/api";

interface TableProps {
  isModalVisible: boolean;
}

export const FilesTable = ({ isModalVisible }: TableProps) => {
  const [list, setList] = useState<string[]>([]);
  const loadList = async () => {
    const { data } = await api.list();
    setList(data.response);
  };

  useEffect(() => {
    async function doFetch() {
      await loadList();
    }

    doFetch();
  }, []);

  useEffect(() => {
    async function doFetch() {
      await loadList();
    }

    if (!isModalVisible) doFetch();
  }, [isModalVisible]);

  return (
    <Table striped bordered hover size="sm" style={{ backgroundColor: "#ccc" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>File name</th>
        </tr>
      </thead>
      <tbody>
        {list?.length > 0 &&
          list.map((e, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{e}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
