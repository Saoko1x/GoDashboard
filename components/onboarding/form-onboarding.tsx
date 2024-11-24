'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { trpc } from '@/server/client';
import { useState, useEffect } from 'react';
import { useCompanyId } from '@/hooks/useCompanyid';

export default function Page() {
  const [questions, setQuestions] = useState([
    { question: '', answers: ['', '', '', ''] },
    { question: '', answers: ['', '', '', ''] },
    { question: '', answers: ['', '', '', ''] },
    { question: '', answers: ['', '', '', ''] }
  ]);
  const { companyId } = useCompanyId();

  const createOrUpdateMutation =
    trpc.onboarding.createOrUpdateCompanyOnboarding.useMutation();
  const getByCompanyIdQuery = trpc.onboarding.getCompanyOnboarding.useQuery(
    {
      companyId: companyId
    },
    {
      enabled: !!companyId // Only run the query if we have a valid userId
    }
  );

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId) {
      alert('User ID is not available. Please log in.');
      return;
    }
    try {
      await createOrUpdateMutation.mutateAsync({
        companyId: companyId,
        questions: questions
          .filter((q) => q.question.trim() !== '')
          .map((q) => ({
            question: q.question,
            answers: q.answers.filter((a) => a.trim() !== '')
          }))
      });
      alert('Onboarding questions saved successfully!');
      // Refetch the query to update the displayed data
      getByCompanyIdQuery.refetch();
    } catch (error) {
      console.error('Error saving onboarding questions:', error);
      alert('Error saving onboarding questions. Please try again.');
    }
  };

  useEffect(() => {
    if (getByCompanyIdQuery.data) {
      const savedQuestions = getByCompanyIdQuery.data.questions;
      const updatedQuestions = questions.map((q, index) => {
        if (index < savedQuestions.length) {
          return {
            question: savedQuestions[index].question,
            answers: savedQuestions[index].answers.map((a) => a.answerText)
          };
        }
        return q;
      });
      setQuestions(updatedQuestions);
    }
  }, [getByCompanyIdQuery.data]);

  return (
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
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
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
                      value={answer}
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
  );
}
