import { useEffect, useState } from "react";
import axios from "axios";

type Content = {
  type: string;
  link: string;
  title: string;
};

const useContent = () => {
  const [contents, setContents] = useState<Content[]>([]); // Typed as an array of Content
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/content", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log("Hello"+JSON.stringify(res.data.content));
        setContents(res.data.content); // Ensure API response matches the Content structure
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { contents, loading, error };
};

export default useContent;