# Flashcard-Based Language Learning App


## Overview
LingoLearn is a full-stack web application that allows users to learn different languages using flashcard sets. The following is the documentation of what I learned during the process of its development. This truly is a meaningful project for me and I hope to keep adding new features just because I learned so much making the MVP.

## Technologies Used

* Frontend: React + TailwindCSS
* Backend: FastAPI
* Database: PostgreSQL
* Python: Backend and API development


## Key Learnings from Building the Flashcard App
1. **Frontend Development**  
By building the frontend with React and TailwindCSS, I gained experience in:
* Setting up a modern React app using Vite.
* Styling components efficiently with TailwindCSS.
* Handling user interactions and making API calls with Axios.
* Implementing routing and state management.
* Flipping a flashcard ;)
  
2. **Backend Development**  
On the backend side, I learned how to:
* Set up a FastAPI application and define RESTful routes for handling CRUD operations.
* Connect to a PostgreSQL database using SQLAlchemy for ORM-based interactions.
* Manage database models, and schemas for structuring the data.
* Ensure data integrity and validation using Pydantic schemas.
* Set up CORS middleware
  
3. **Connecting Frontend and Backend**  
Connecting the frontend to the backend taught me:
* How to send and receive data between React and FastAPI using Axios.
* Handling asynchronous API calls efficiently.
* Integrating the backend into the frontend to update the UI in real-time when adding, updating, or deleting flashcards.
* Debugging between the frontend and backend using console logs

## Future Improvements and Feature Additions
1. **User Authentication**  
Implement user registration and login to allow personalized flashcard collections. Secure authentication can be achieved with OAuth, JWT, or Firebase, enabling users to store and manage their own flashcards. Each user can have their own unique ID in the database.

2. **AI-Generated Flashcards**  
Introduce AI-generated flashcards by leveraging models like GPT-3 or Google Gemini using OpenAI and Gemini APIs. This feature would automatically generate flashcards based on a given text, set of words, or language patterns, helping users build their flashcard collections efficiently.
