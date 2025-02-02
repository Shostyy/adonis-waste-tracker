import axios from "axios";

export interface Prize {
  text: string;
  color: string;
  chance: number;
}

export interface PrizeResponse {
  prizes: Prize[];
  total: number;
}

export const fetchPrizeData = async (
  sheetId: string,
  apiKey: string
): Promise<PrizeResponse> => {
  try {
    const storedPrizes = localStorage.getItem("wheelPrizes");
    const storedTotal = localStorage.getItem("prizesTotal");

    if (storedPrizes && storedTotal) {
      const parsedPrizes = JSON.parse(storedPrizes);
      const parsedTotal = parseInt(storedTotal, 10);

      if (parsedPrizes.length === parsedTotal) {
        console.log("Using cached prize data");
        return {
          prizes: parsedPrizes,
          total: parsedTotal,
        };
      }
    }

    // Fetch data from Google Sheets
    const response = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/prizes!A2:C?key=${apiKey}`
    );

    if (!response.data.values) {
      throw new Error("No data received from Google Sheets");
    }

    // Transform the data into Prize objects
    const prizes: Prize[] = response.data.values.map((row: string[]) => ({
      text: row[0] || "Prize", // Column A - prize name
      color: row[1] || "#FFBC0D", // Column B - color, default to primary color if missing
      chance: parseFloat(row[2]) || 0, // Column C - chance to win, default to 0 if missing
    }));

    // Get total count
    const total = prizes.length;

    // Cache the results
    localStorage.setItem("wheelPrizes", JSON.stringify(prizes));
    localStorage.setItem("prizesTotal", total.toString());

    return {
      prizes,
      total,
    };
  } catch (error) {
    console.error("Error fetching prize data:", error);
    throw error;
  }
};
