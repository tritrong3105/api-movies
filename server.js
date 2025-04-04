const express = require("express");
const axios = require("axios");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");

const app = express();
app.use(cors());

const PORT = 3000;
const TMDB_API_KEY = "74f8068cab23bf06d29d49bad1183b7c";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const file = fs.readFileSync("./api-docs.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// danh sách trending
app.get("/api/trending", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&page=${page}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy phim trending" });
  }
});

// tìm kiếm
app.get("/api/search", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Không cos từ khóa tìm kiếm" });
    }

    const response = await axios.get(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${page}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy dữ liệu phim" });
  }
});

//chi tiết phim
app.get("/api/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy chi tiết phim" });
  }
});

// tất cẩ phim
// app.get("/api/movies", async (req, res) => {
//   try {
//     const page = req.query.page || 1;
//     const response = await axios.get(
//       `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&page=${page}`
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: "Không thể lấy danh sách phim" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});
