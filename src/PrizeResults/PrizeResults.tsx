import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "../firebaseConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Pagination,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

interface PrizeResult {
  username: string;
  prize: string;
  timestamp: number;
}

const PrizeResults = () => {
  const [results, setResults] = useState<PrizeResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usernameFilter, setUsernameFilter] = useState("");
  const [prizeFilter, setPrizeFilter] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const prizeRef = ref(database, "prizes");

    const unsubscribe = onValue(prizeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const resultsArray = Object.values(data) as PrizeResult[];
        setResults(resultsArray.sort((a, b) => b.timestamp - a.timestamp));
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredResults = results.filter(
    (result) =>
      result.username.toLowerCase().includes(usernameFilter.toLowerCase()) &&
      result.prize.toLowerCase().includes(prizeFilter.toLowerCase())
  );

  const paginatedResults = filteredResults.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (isLoading) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <Typography variant="h6" className="animate-pulse">
          Завантаження результатів...
        </Typography>
      </Box>
    );
  }

  return (
    <Container className="min-h-screen py-8">
      <Typography variant="h3" align="center" gutterBottom>
        Переможці
      </Typography>

      <Paper elevation={3} className="p-6">
        <Box display="flex" gap={2} mb={4}>
          <TextField
            label="Фільтрувати по імені"
            variant="outlined"
            fullWidth
            value={usernameFilter}
            onChange={(e) => setUsernameFilter(e.target.value)}
          />
          <TextField
            label="Фільтрувати по призу"
            variant="outlined"
            fullWidth
            value={prizeFilter}
            onChange={(e) => setPrizeFilter(e.target.value)}
          />
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Переможець</TableCell>
              <TableCell>Приз</TableCell>
              <TableCell>Дата, час</TableCell>
              <TableCell>Часу з моменту виграшу</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedResults.map((result, index) => (
              <TableRow key={index} hover>
                <TableCell>{result.username}</TableCell>
                <TableCell>{result.prize}</TableCell>
                <TableCell>
                  {new Date(result.timestamp).toLocaleString("uk-UA")}
                </TableCell>
                <TableCell>{getTimeSince(result.timestamp)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredResults.length === 0 && (
          <Typography align="center" className="py-8">
            Пусто
          </Typography>
        )}

        {filteredResults.length > rowsPerPage && (
          <Box display="flex" justifyContent="center" mt={4} pb={4}>
            <Pagination
              count={Math.ceil(filteredResults.length / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

const getTimeSince = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
    }
  }

  return "Щойно";
};

export default PrizeResults;
