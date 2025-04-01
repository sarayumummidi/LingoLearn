import axios from 'axios'

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8000', // Your FastAPI backend URL
  headers: {
    'Content-Type': 'application/json',
  },
})

// Set endpoints
export const setEndpoints = {
  // Set operations
  createSet: (setData) => api.post('/create_set', setData),
  getSet: (id) => api.get(`/set/${id}`),
  getSets: () => api.get('/sets'),
  updateSet: (id, setData) => api.put(`/update_set/${id}`, setData),
  deleteSet: (id) => api.delete(`/delete_set/${id}`),

  // Flashcard operations
  createFlashcard: (flashcardData) =>
    api.post('/create_flashcard', flashcardData),
  getFlashcard: (id) => api.get(`/flashcard/${id}`),
  updateFlashcard: (id, flashcardData) =>
    api.put(`/update_flashcard/${id}`, flashcardData),
  deleteFlashcard: (id) => api.delete(`/delete_flashcard/${id}`),
  getFlashcards: (skip = 0, limit = 10) =>
    api.get(`/flashcards?skip=${skip}&limit=${limit}`),
}

export default setEndpoints
