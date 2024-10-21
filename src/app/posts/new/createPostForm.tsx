"use client"

import React, { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPostSchema, TNewPost } from "@/drizzle/schema/posts";
import { TCategory } from "@/drizzle/schema/categories";
import { createPost } from "./actions";
import { useRouter } from "next/navigation";

type TCreatePostFormProps = {
	categories: TCategory[];
};

const CreatePostForm = ({ categories }: TCreatePostFormProps) => {
	const router = useRouter();
	
	const { reset, register, handleSubmit, formState: { errors } } = useForm<TNewPost>({
    resolver: zodResolver(NewPostSchema),
    mode: "onChange",
    // defaultValues: ProfileSchema.parse({}),
    criteriaMode: "all",
    shouldFocusError: true,
    reValidateMode: "onSubmit",
  });  
  
  
	const createNewPost: SubmitHandler<TNewPost> = async (data: TNewPost) => {
		await createPost(data);
		reset({});
		router.push("/");
	};

	return (
    <form onSubmit={handleSubmit(createNewPost)}>
			<div className="mb-4">
				<label
					className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
				>
					Title
				</label>
			<input
				type="text"
				{...register("title")}
				className="text-field"
				placeholder="Post title"
			/>
			{
				errors?.title && (
					<span>{errors?.title?.message as ReactNode}</span>
				)
			}
			</div>
			<div className="mb-4">
				<label
					className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
				>
					Subtitle
				</label>
			<input
				type="text"
				{...register("subtitle")}
				className="text-field"
				placeholder="Add a subtitle"
			/>
			{
				errors?.subtitle && (
					<span>{errors?.subtitle?.message as ReactNode}</span>
				)
			}
			</div>
			<div className="mb-4">
				<label
					className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
				>
					Content
				</label>
				<textarea
					{...register("content")}
					className="text-field"
					rows={6}
					placeholder="Add post content"
				>
				</textarea>
				{
				errors?.content && (
					<span>{errors?.content?.message as ReactNode}</span>
				)
			}
			</div>
			<div className="mb-4">
				<label
					className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
				>
					Category
				</label>
				<select
					{...register("categoryId")}
					className="text-field"
				>
					<option>Select a category</option>
					{
						categories?.map(category => (
							<option
								key={category?.id}
								value={category?.id}
							>
								{category?.name}
							</option>
						))
					}
				</select>
			</div>
			<div className="flex justify-between">
				<button
					// disabled={isDirty || isValid}
					type="submit"
					className="w-40 btn btn-primary"
				>
					Create Post
				</button>
			</div>
		</form>
  );
};

export default CreatePostForm;