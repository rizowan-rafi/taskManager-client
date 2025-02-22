import { useQuery } from "@tanstack/react-query";

const useTasks = (email) => {
    return useQuery({
        queryKey: ["tasks", email],
        queryFn: async () => {
            if (!email) return [];
            const response = await fetch(
                `http://localhost:5000/tasks/${email}`
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
