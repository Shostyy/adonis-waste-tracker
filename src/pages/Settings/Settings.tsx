import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Typography,
  Alert,
} from "@mui/material";
import { fetchCategoriesData } from "../../utils/fetchCategoriesData";
import {
  CATEGORIES,
  GOOGLE_API_KEY,
  GOOGLE_SHEET_ID,
  GOOGLE_SHEET_SELECTION_RANGE,
} from "../../static-data/constants";
import ApproveByPassword from "../../HOC/ApproveByPassword";
import { fetchPrizeData } from "../../utils/fetchPrizes";

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUpdateClick = async () => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      // Simulate delay with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 150));
      localStorage.removeItem("menuItems");
      localStorage.removeItem("wheelPrizes");
      await fetchCategoriesData(
        CATEGORIES,
        GOOGLE_SHEET_SELECTION_RANGE,
        GOOGLE_SHEET_ID,
        GOOGLE_API_KEY
      );
      await fetchPrizeData(GOOGLE_SHEET_ID, GOOGLE_API_KEY);
      setSuccessMessage("Продукти та зображення оновлено успішно");
    } catch (error) {
      setErrorMessage("Помилка при оновленні продуктів та зображень");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="header"></header>
      <main className="main">
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
            Налаштування
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateClick}
            sx={{ width: "100%" }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              "Оновити продукти та зображення"
            )}
          </Button>
          {successMessage && (
            <Alert severity="success" sx={{ marginTop: "16px" }}>
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert severity="error" sx={{ marginTop: "16px" }}>
              {errorMessage}
            </Alert>
          )}
        </Container>
      </main>
    </>
  );
};

export default ApproveByPassword(Settings);
