import { useQuery } from "@tanstack/react-query";

const useTasks = (email) => {
    return useQuery({
        queryKey: ["tasks", email],
        queryFn: async () => {
            if (!email) return [];
            const response = await fetch(
                `https://job-task-server-brown.vercel.app/tasks/${email}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }
            return response.json();
        },
        enabled: !!email, // Fetch only when email exists
    });
};

export default useTasks;
