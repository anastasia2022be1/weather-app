export const getTimezoneIdByCoords = async (lat, lon) => {
    const username = import.meta.env.VITE_GEONAMES_USERNAME;
  
    try {
      const response = await fetch(
        `http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=${username}`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch timezone info");
      }
  
      const data = await response.json();
      return data.timezoneId || "UTC";
    } catch (error) {
      console.error("Error getting timezone:", error);
      return "UTC";
    }
  };
  
  