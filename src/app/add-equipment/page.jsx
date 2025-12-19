'use client';
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

// Validation Schema
const equipmentSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  brand: Yup.string(),
  price: Yup.number().required("Price is required"),
  rent: Yup.number().required("Rent is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  type: Yup.string().required("Type is required"),
});

const AddEquipment = () => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Add Equipment()

      </h2>

      <Formik
        initialValues={{
          name: "",
          brand: "",
          price: "",
          rent: "",
          category: "",
          description: "",
          type: "",
        }}
        validationSchema={equipmentSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await axios.post("http://localhost:5000/equipment/add", values);
            // alert("Equipment Added Successfully!");
            toast.success('product added successfully');
            resetForm();
          } catch (err) {
            console.error(err);
            // alert("Error Adding Equipment");
            toast.success(err);
          }
        }}
      >
        {() => (
          <Form className="space-y-4">

            {/* Name */}
            <div>
              <Field
                name="name"
                placeholder="Equipment Name"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Brand */}
            <div>
              <Field
                name="brand"
                placeholder="Brand"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Price */}
            <div>
              <Field
                name="price"
                type="number"
                placeholder="Equipment Price"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <ErrorMessage
                name="price"
                component="p"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Rent */}
            <div>
              <Field
                name="rent"
                type="number"
                placeholder="Rent Per Day"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <ErrorMessage
                name="rent"
                component="p"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Category */}
            <div>
              <Field
                name="category"
                placeholder="Category"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <ErrorMessage
                name="category"
                component="p"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <Field
                as="textarea"
                name="description"
                placeholder="Description"
                className="w-full px-4 py-2 h-24 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Type */}
            <div>
              <Field
                name="type"
                placeholder="Equipment Type"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <ErrorMessage
                name="type"
                component="p"
                className="text-red-600 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
            >
              Add Equipment
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEquipment;
