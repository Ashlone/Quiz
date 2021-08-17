import React, { useState } from "react";
import { Button, MenuItem, TextField } from "@material-ui/core";
import "./Home.css";
import Categories from "../../Data/Data";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function Home({ name, setName, fetchQuestions }) {
  //creating the states

  const [category, setCategory] = useState("");
  const [difficulty, setDifficult] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();

  //Start Button
  const handleSubmit = () => {
    //checking an error if there is nothing inside the form
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      history.push("/quiz"); //if the text fields are filled ,this pushes the user to the quiz page
    }
  };

  return (
    <div className="content">
      <div className="quizSettings">
        <span className="quizSpan">Quiz Settings</span>
        <div className="settings-select">
          {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}
          <TextField
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: 25 }}
            label="Enter Your Name"
            variant="outlined"
          />
          <TextField
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
            style={{ marginBottom: 25 }}
            select
            label="select Category"
            variant="outlined"
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            onChange={(e) => {
              setDifficult(e.target.value);
            }}
            value={difficulty}
            style={{ marginBottom: 25 }}
            select
            label="Select Difficulty"
            variant="outlined"
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            size="large"
          >
            Start Quiz
          </Button>
        </div>
      </div>
      <img src="/quiz.svg" className="banner" alt="quiz_img" />
    </div>
  );
}

export default Home;
