/*currently this file is not in use */

const ResumeScore = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Resume Feedback</h2>

      {/* Score */}
      <div className="mb-4">
        <p className="font-semibold">Resume Score: {feedback.score}/100</p>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${feedback.score}%` }}
          ></div>
        </div>
      </div>

      {/* Strengths */}
      <div className="mb-3">
        <h3 className="font-semibold text-green-600">Strengths</h3>
        <ul className="list-disc ml-5">
          {feedback.strengths.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="mb-3">
        <h3 className="font-semibold text-red-600">Weaknesses</h3>
        <ul className="list-disc ml-5">
          {feedback.weaknesses.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Suggestions */}
      <div className="mb-3">
        <h3 className="font-semibold text-blue-600">Suggestions</h3>
        <ul className="list-disc ml-5">
          {feedback.suggestions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Overall Feedback */}
      <div className="mt-4 p-3 bg-gray-100 rounded">
        <p className="font-medium">Overall Feedback</p>
        <p className="text-sm">{feedback.overall_feedback}</p>
      </div>
    </div>
  );
};
export default ResumeScore;
