
// Function to make a GET request
export const get = async (url, headers = {}) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function to make a POST request
export const post = async (url, data, headers = {}) => {
  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
