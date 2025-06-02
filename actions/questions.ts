"use server";

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizData {
  queue: Question[];
  recursion: Question[];
}

export const getQuestions = async (): Promise<QuizData> => {
  const topics: ("queue" | "recursion")[] = ["queue", "recursion"];
  const quizData: QuizData = { queue: [], recursion: [] };

  try {
    await Promise.all(
      topics.map(async (topic) => {
        const res = await fetch(`${process.env.BACKEND_URL}/quizzes/${topic}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch quizzes for ${topic}`);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let topicQuestions: any[] = await res.json();

        topicQuestions = topicQuestions.map((question) => ({
          question: question[1],
          options: JSON.parse(question[2]),
          correctAnswer: question[3],
        }));

        quizData[topic] = topicQuestions;
      }),
    );
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }

  return quizData;
};
