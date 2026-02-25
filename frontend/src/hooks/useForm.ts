import { useState, type ChangeEvent } from "react";

export const useForm = (initValues: Record<string, any>) => {
  const [formData, setFormData] = useState(initValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return { formData, handleChange };
};
