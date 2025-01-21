// api.js - Handles API calls
export const fetchProjects = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL); // Using the environment variable
    const json = await response.json();

    if (json.success) {
      return json.data.projects; // Return the 'data' array
    } else {
      console.error("API Error:", json.message);
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
};
