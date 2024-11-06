"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const DetailDosen = () => {
  const params = useSearchParams();
  const dosenId = params.get("dosenId");
  const [dosen, setDosen] = React.useState(null);

  useEffect(() => {
    const fetchDosen = async () => {
      try {
        const { data } = await axios.get(`/api/getDosen/${dosenId}`);
        setDosen(data[0]);
        console.log(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (dosenId) {
      fetchDosen();
    }
  }, [dosenId]);

  return <div>{dosenId}</div>;
};

export default DetailDosen;
