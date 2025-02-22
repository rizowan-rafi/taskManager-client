import React from "react";
import PropTypes from "prop-types";

import { useDraggable } from "@dnd-kit/core";
import useAuth from "../../hooks/useAuth";
import useTasks from "../../hooks/useTasks";
import Swal from "sweetalert2";

const Task = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id,
    });
    const { user } = useAuth();
    const { data, isLoading, isPending, error, refetch } = useTasks(
        user?.email
    );

    const handleUpdate = async (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.desc.value;
        const updatedTask = {
            title,
            description,
            dueDate: new Date()
                .toLocaleDateString("en-GB")
                .split("/")
                .join("-"),
            status: task.status,
        };
        // console.log(updatedTask);
        const response = await fetch(
            `https://job-task-server-brown.vercel.app/task/${task._id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTask),
            }
        );
        if (response.ok) {
            Swal.fire({
                position: "center",
                title: "Task updated successfully",
                icon: "success",
            });
            refetch();
            document.getElementById("my_modal_2").close();
        }
    };

    const handleDelete = async (taskId) => {
        const result = await fetch(
            `https://job-task-server-brown.vercel.app/tasks/${taskId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (result.ok) {
            Swal.fire({
                position:"center",
                title: "Task deleted successfully",
                icon: "error",
            });
            refetch();
        } else {
            console.error("Failed to delete task");
        }
    };

    const style = transform
        ? {
              transform: `translate(${transform.x}px, ${transform.y}px)`,
          }
        : undefined;
    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="cursor-grab rounded-lg bg-background p-4 shadow-sm hover:shadow-md"
            style={style}
            id={task._id}
        >
            <h3 className="font-medium text-accent text-2xl">{task.title}</h3>
            <p className="mt-2  text-accent my-5 ">{task.description}</p>
            <p className="text-accent font-semibold">{task.status}</p>
            <p className="text-accent text-sm">Due: {task.dueDate}</p>
            <div
                className="flex gap-4 mt-3 relative"
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById("my_modal_2").showModal();
                    }}
                    className="btn bg-accent text-background"
                >
                    Edit
                </button>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold  text-accent text-xl">
                            Edit Task
                        </h3>
                        <p className="py-4 text-accent">
                            Update the task details below and save your changes.
                        </p>
                        <div className="modal-action flex-col">
                            <form onSubmit={handleUpdate} className="w-full ">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-accent font-semibold">
                                            Task Title
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Task Title"
                                        name="title"
                                        className="input input-bordered text-text"
                                        defaultValue={task.title}
                                        required
                                    />
                                </div>
                                <div className="form-control mt-5">
                                    <label className="label">
                                        <span className="label-text text-accent font-semibold ">
                                            Task Description
                                        </span>
                                    </label>
                                    <textarea
                                        placeholder="Task Description"
                                        name="desc"
                                        className="input input-bordered resize-none h-56 pt-5 text-text"
                                        defaultValue={task.description}
                                    ></textarea>
                                </div>

                                <input
                                    type="submit"
                                    value="Update Task"
                                    className="btn w-full mt-5 bg-accent text-background"
                                />
                            </form>

                            <button
                                className="btn  mt-5 bg-accent text-background"
                                onClick={() =>
                                    document
                                        .getElementById("my_modal_2")
                                        .close()
                                }
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
                <button
                    onClick={() => {
                        handleDelete(task._id);
                    }}
                    className="btn bg-accent text-background"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

Task.propTypes = {};

export default Task;
