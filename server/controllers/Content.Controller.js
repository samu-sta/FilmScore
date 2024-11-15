import { ContentDAO } from "../dao/ContentDAO.js";

async function getMovies(req, res) {
    try {
      const movies = await ContentDAO.getAllContent();
      return res.status(200).json(movies);
    } catch (error) {
      console.error('Error reading movies.json:', error);
      return res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

export const contentController = {
    getMovies
};