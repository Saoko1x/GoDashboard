'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { trpc } from '@/server/client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [questions, setQuestions] = useState([
    { question: '', answers: ['', '', '', ''] },
    { question: '', answers: ['', '', '', ''] },
    { question: '', answers: ['', '', '', ''] },
    { question: '', answers: ['', '', '', ''] }
  ]);

  const createMutation = trpc.onboarding.create.useMutation();
  const getAllQuery = trpc.onboarding.getAll.useQuery();

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      for (const question of questions) {
        if (question.question.trim() !== '') {
          await createMutation.mutateAsync({
            question: question.question,
            answers: question.answers.filter((answer) => answer.trim() !== '')
          });
        }
      }
      alert('Onboarding questions saved successfully!');
    } catch (error) {
      console.error('Error saving onboarding questions:', error);
      alert('Error saving onboarding questions. Please try again.');
    }
  };

  useEffect(() => {
    if (getAllQuery.data) {
      setQuestions(
        getAllQuery.data.map((item) => ({
          question: item.question,
          answers: item.answers.map((a) => a.answerText)
        }))
      );
    }
  }, [getAllQuery.data]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-h-[80vh] w-full overflow-y-auto p-6 sm:p-8"
      >
        <div className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`question-${qIndex + 1}`}>
                    Question {qIndex + 1}
                  </Label>
                  <Input
                    id={`question-${qIndex + 1}`}
                    placeholder="Enter your question"
                    value={getAllQuery.data?.[qIndex]?.question ?? q.question}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, e.target.value)
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {q.answers.map((answer, aIndex) => (
                    <div key={aIndex} className="space-y-2">
                      <Label htmlFor={`answer-${qIndex + 1}-${aIndex + 1}`}>
                        Answer {aIndex + 1}
                      </Label>
                      <Input
                        id={`answer-${qIndex + 1}-${aIndex + 1}`}
                        placeholder={`Enter answer ${aIndex + 1}`}
                        value={
                          getAllQuery.data?.[qIndex]?.answers?.[aIndex]
                            ?.answerText ?? answer
                        }
                        onChange={(e) =>
                          handleAnswerChange(qIndex, aIndex, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button type="submit" className="mt-4">
            Save
          </Button>
        </div>
      </form>
    </>
  );
}
