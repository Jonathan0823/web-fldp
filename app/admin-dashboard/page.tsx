"use client";
import axios from "axios";
import AdminList from "../components/admin/list";
import { useState, useEffect } from "react";

const Page = () => {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/getDosen/All");
      const data = response.data;
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/deleteDosen/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const handleEdit = async (id) => {
    try {
      await axios.put(`/api/editDosen/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error editing data:", error);
    }
  }


  useEffect(() => {
    fetchData();
  }, []);

  return <AdminList items={items} onDelete={handleDelete} onEdit={handleEdit}/>;
};

export default Page;
