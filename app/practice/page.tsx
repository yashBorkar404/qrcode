"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { getQuestions, type QuizData } from "@/actions/questions"
import { setUserScore } from "@/actions/user"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function PracticePage() {
  const [currentTopic, setCurrentTopic] = useState<"queue" | "recursion" | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizData, setQuizData] = useState<QuizData>({
    queue: [],
    recursion: [],
  })

  useEffect(() => {
    getQuestions()
      .then((data) => setQuizData(data))
      .catch((error) => console.error("Error fetching quizzes:", error))
  }, [])

  const handleTopicSelect = (topic: "queue" | "recursion") => {
    setCurrentTopic(topic)
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setSelectedAnswer(null)
  }

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index)
  }

  const handleSubmit = async () => {
  if (selectedAnswer === null || currentTopic === null) return

  let newScore = score;
  if (selectedAnswer === quizData[currentTopic][currentQuestion].correctAnswer) {
    newScore = score + 1;
    setScore(newScore);
  }

  const nextQuestion = currentQuestion + 1;
  if (nextQuestion < quizData[currentTopic].length) {
    setCurrentQuestion(nextQuestion);
    setSelectedAnswer(null);
  } else {
    setShowScore(true);
    try {
      await setUserScore(currentTopic, newScore);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-4xl p-6 sm:p-8 shadow-lg bg-card text-card-foreground">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-8 text-primary text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Practice
        </motion.h1>
        <AnimatePresence mode="wait">
          {currentTopic === null ? (
            <motion.div
              key="topic-selection"
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl mb-6 text-center">Choose a topic to practice:</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  onClick={() => handleTopicSelect("queue")}
                  className="text-lg py-6 px-8 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Queues
                </Button>
                <Button
                  onClick={() => handleTopicSelect("recursion")}
                  className="text-lg py-6 px-8 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Recursion
                </Button>
              </div>
            </motion.div>
          ) : showScore ? (
            <motion.div
              key="score"
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-primary">Quiz Completed!</h2>
              <p className="text-2xl mb-6">
                You scored {score} out of {quizData[currentTopic].length}
              </p>
              <Progress value={(score / quizData[currentTopic].length) * 100} className="w-full h-4 mb-8" />
              <Button
                onClick={() => setCurrentTopic(null)}
                className="text-lg py-4 px-8 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Back to Topics
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold mb-4 text-primary text-center">
                {currentTopic.charAt(0).toUpperCase() + currentTopic.slice(1)} Quiz
              </h2>
              <div className="flex justify-between items-center mb-6">
                <p className="text-xl">
                  Question {currentQuestion + 1}/{quizData[currentTopic].length}
                </p>
                <p className="text-xl">Score: {score}</p>
              </div>
              <Card className="p-6 mb-6 bg-card/50 backdrop-blur-sm">
                <p className="text-xl mb-6">{quizData[currentTopic][currentQuestion]?.question}</p>
                <div className="space-y-4">
                  {quizData[currentTopic][currentQuestion]?.options?.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Button
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full text-left text-lg py-4 ${
                          selectedAnswer === index
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                        }`}
                      >
                        {option}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </Card>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: selectedAnswer !== null ? 1 : 0,
                  y: selectedAnswer !== null ? 0 : 20,
                }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  onClick={handleSubmit}
                  className="w-full text-lg py-4 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={selectedAnswer === null}
                >
                  Submit Answer
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
}
