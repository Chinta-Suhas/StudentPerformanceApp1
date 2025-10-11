import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PredictionResultProps {
  predictedScore: number;
  confidence: number;
  readingScore: number;
  writingScore: number;
}

const PredictionResult: React.FC<PredictionResultProps> = ({
  predictedScore,
  confidence,
  readingScore,
  writingScore
}) => {
  const chartData = [
    { subject: 'Reading', score: readingScore },
    { subject: 'Writing', score: writingScore },
    { subject: 'Math (Predicted)', score: predictedScore }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Prediction Results</h2>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Predicted Math Score</h3>
            <p className={`text-5xl font-bold ${getScoreColor(predictedScore)}`}>
              {predictedScore.toFixed(1)}
            </p>
            <p className="text-gray-600 mt-2">{getPerformanceLabel(predictedScore)}</p>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-700">Model Confidence</h3>
            <p className="text-3xl font-bold text-blue-600">{(confidence * 100).toFixed(1)}%</p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 mt-4">
          <h4 className="font-semibold text-gray-700 mb-2">Score Breakdown</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Reading</p>
              <p className={`text-2xl font-bold ${getScoreColor(readingScore)}`}>
                {readingScore}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Writing</p>
              <p className={`text-2xl font-bold ${getScoreColor(writingScore)}`}>
                {writingScore}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Math (Predicted)</p>
              <p className={`text-2xl font-bold ${getScoreColor(predictedScore)}`}>
                {predictedScore.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Score Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
        <h4 className="font-semibold text-blue-800 mb-2">About This Prediction</h4>
        <p className="text-sm text-blue-700">
          This prediction is based on a Linear Regression model with {(confidence * 100).toFixed(1)}% accuracy.
          The model considers factors such as gender, ethnicity, parental education level, lunch type,
          test preparation course completion, and performance in reading and writing.
        </p>
      </div>
    </div>
  );
};

export default PredictionResult;
