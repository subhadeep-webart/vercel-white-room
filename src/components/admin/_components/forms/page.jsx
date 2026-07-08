"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Forms = ({ fields = [], onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState(() => {
    return fields.reduce((acc, field) => {
      acc[field.name] = initialValues[field.name] || "";
      return acc;
    }, {});
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="max-w-full p-6 rounded-md space-y-6 ">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field, index) => (
            <div
              key={index}
              className={field.type === "textarea" ? "md:col-span-2" : ""}
            >
              <Label htmlFor={field.name} className="mb-1 block">
                {field.label}
              </Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  rows={field.rows || 4}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ) : (
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="w-32">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Forms;
