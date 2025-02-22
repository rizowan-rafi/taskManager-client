import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Column from "./Column";
import {
    closestCorners,
    DndContext,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

import {
    arrayMove,
    rectSwappingStrategy,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
    QueryClient,
    QueryClientProvider,
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useTasks from "../../hooks/useTasks";

const columns = [
    {
        id: "TODO",
        title: "To Do",
    },
    {
        id: "IN_PROGRESS",
        title: "In Progress",
    },
    {
        id: "DONE",
        title: "Done",
    },
];

// const example_tasks = [
//     {
//         id: 1,
//         title: "Set up project repository",
//         description:
//             "Initialize a Git repository and push the initial code to GitHub.",
//         status: "DONE",
//     },
//     {
//         id: 2,
//         title: "Design homepage layout",
//         description: "Create a wireframe and UI design for the homepage.",
//         status: "IN_PROGRESS",
//     },
//     {
//         id: 3,
//         title: "Implement user authentication",
//         description: "Set up login and registration using JWT authentication.",
//         status: "TODO",
//     },
//     {
//         id: 4,
//         title: "Develop API endpoints",
//         description:
//             "Create REST API endpoints for fetching user data and posts.",
//         status: "IN_PROGRESS",
//     },
//     {
//         id: 5,
//         title: "Write documentation",
//         description: "Document API endpoints and project setup instructions.",
//         status: "TODO",
//     },
// ];

const Home = (props) => {
    const { signOutUser, loading, user } = useAuth();
    const { data, isLoading, isPending, error, refetch } = useTasks(
        user?.email
    );
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOutUser().then((res) => {
            navigate("/login");
        });
    };
    // Update tasks when data is fetched
    useEffect(() => {
        if (data) {
            setTasks(data);
        }
    }, [data]);

    // useEffect(() => {
    //     if (user?.email) {
    //         fetch(`http://localhost:5000/tasks/${user.email}`)
    //             .then((response) => response.json())
    //             .then((data) => setTasks(data))
    //             .catch((error) => console.error("Error:", error));
    //     }
    // }, [user?.email]);

    const handleTask = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.desc.value;
        const task = {
            title,
            description,
            dueDate: new Date()
                .toLocaleDateString("en-GB")
                .split("/")
                .join("-"),
            userId: user.email,
            status: "TODO",
        };
        // console.log(task)
        const result = await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
        if (result.status === 201) {
            // const newTasks = [...tasks, task];
            // setTasks(newTasks);
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "new task added successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            document.getElementById("my_modal_1").close();
            
        }
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id;
        const newStatus = over.id;

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === taskId ? { ...task, status: newStatus } : task
            )
        );

        try {
            const result = await fetch(`http://localhost:5000/tasks/${taskId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (result.status === 200) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Task status updated to ${newStatus}`,
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(TouchSensor),
        useSensor(MouseSensor)
    );
    if (loading || isPending) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <div>
                <button onClick={handleSignOut} className="btn">
                    SignOut
                </button>
            </div>
            <button>{user?.email}</button>
            <div></div>
            <div className="flex gap-8">
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    {columns.map((column) => {
                        return (
                            <Column
                                key={column.id}
                                column={column}
                                task={tasks.filter(
                                    (task) => task.status === column.id
                                )}
                            />
                        );
                    })}
                </DndContext>
            </div>
            <div>
                <button
                    onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                    }
                    className="btn"
                >
                    Add Task
                </button>

                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">
                            Press ESC key or click the button below to close
                        </p>
                        <div className="modal-action flex-col">
                            <form onSubmit={handleTask} className="w-full">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">
                                            Task Title
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Task Title"
                                        name="title"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control mt-5">
                                    <label className="label">
                                        <span className="label-text">
                                            Task Description
                                        </span>
                                    </label>
                                    <textarea
                                        placeholder="Task Description"
                                        name="desc"
                                        className="input input-bordered resize-none h-56 pt-5"
                                    ></textarea>
                                </div>

                                <input
                                    type="submit"
                                    value="Add Task"
                                    className="btn w-full mt-5"
                                />
                            </form>

                            <button
                                className="btn  mt-5"
                                onClick={() =>
                                    document
                                        .getElementById("my_modal_1")
                                        .close()
                                }
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

Home.propTypes = {};

export default Home;
