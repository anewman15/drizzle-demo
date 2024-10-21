"use client"

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewCategorySchema, TNewCategory } from "@/drizzle/schema/categories";
import { useRouter } from "next/navigation";
import { createCategory } from "./actions";

const CreateCategory = () => {
  const router = useRouter();

  const { reset, register, handleSubmit, formState: { errors} } = useForm({
    resolver: zodResolver(NewCategorySchema),
    mode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
    reValidateMode: "onSubmit",
  });

  const createNewCategory:  SubmitHandler<any> = async (data: TNewCategory) => {
    await createCategory(data);
    reset({});
    router.push("/categories");
  };

  return (
    <div className="mx-auto page">
      <h2 className="text-3xl mb-4 text-center">
        Create New Category
      </h2>
      <div className="mx-auto md: w-1/2">
        <form onSubmit={handleSubmit(createNewCategory)}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Name
            </label>
          <input
            type="text"
            {...register("name")}
            className="text-field"
            placeholder="Category name"
          />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              {...register("description")}
              className="text-field"
              rows={6}
              placeholder="Describe the category"
            >
            </textarea>
          </div>
          <div className="flex justify-between">
            <button
              // disabled={!formInstance?.formState.isDirty || !formInstance?.formState?.isValid}
              type="submit"
              className="w-40 btn btn-primary"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
