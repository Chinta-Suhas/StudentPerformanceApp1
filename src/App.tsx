import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import PredictionForm from './components/PredictionForm';
import PredictionResult from './components/PredictionResult';
import { predictMathScore, getModelAccuracy } from './services/modelService';

interface StudentData {
  gender: string;
  ethnicity: string;
  parentalEducation: string;
  lunch: string;
  testPreparation: string;
  readingScore: number;
  writingScore: number;
}

interface PredictionData {
  predictedScore: number;
  confidence: number;
  readingScore: number;
  writingScore: number;
}

function App() {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (data: StudentData) => {
    setLoading(true);
    try {
      const result = await predictMathScore(data);
      setPrediction({
        predictedScore: result.predictedScore,
        confidence: result.confidence,
        readingScore: data.readingScore,
        writingScore: data.writingScore
      });
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Failed to make prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Student Performance Indicator</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Predict math scores based on student demographics and performance data
          </p>
          <div className="mt-4 inline-block bg-white rounded-full px-6 py-2 shadow-sm">
            <span className="text-sm text-gray-600">Model Accuracy: </span>
            <span className="font-bold text-blue-600">{getModelAccuracy()}%</span>
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          <PredictionForm onPredict={handlePredict} />

          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Calculating prediction...</p>
            </div>
          )}

          {!loading && prediction && (
            <PredictionResult
              predictedScore={prediction.predictedScore}
              confidence={prediction.confidence}
              readingScore={prediction.readingScore}
              writingScore={prediction.writingScore}
            />
          )}

          <footer className="mt-12 text-center text-gray-600 text-sm">
            <p className="mb-2">
              This application uses machine learning to predict student math scores based on various factors.
            </p>
            <p>
              The model was trained on 1000 student records with an accuracy of {getModelAccuracy()}%.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
