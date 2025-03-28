const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());

const PORT = 3000;
const TMDB_API_KEY = "74f8068cab23bf06d29d49bad1183b7c";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// danh sach phim trending
app.get("/api/trending", async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi lấy phim trending" });
    }
});

// search movies
app.get("/api/search", async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: "Không cos từ khóa tìm kiếm" });
        }

        const response = await axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Không thể lấy dữ liệu phim" });
    }
});



app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});
