import React, { useState } from 'react';

interface FormData {
  gender: string;
  ethnicity: string;
  parentalEducation: string;
  lunch: string;
  testPreparation: string;
  readingScore: string;
  writingScore: string;
}

interface PredictionFormProps {
  onPredict: (data: any) => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict }) => {
  const [formData, setFormData] = useState<FormData>({
    gender: 'female',
    ethnicity: 'group A',
    parentalEducation: 'some high school',
    lunch: 'standard',
    testPreparation: 'none',
    readingScore: '70',
    writingScore: '70'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict({
      ...formData,
      readingScore: parseFloat(formData.readingScore),
      writingScore: parseFloat(formData.writingScore)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Race/Ethnicity</label>
          <select
            name="ethnicity"
            value={formData.ethnicity}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="group A">Group A</option>
            <option value="group B">Group B</option>
            <option value="group C">Group C</option>
            <option value="group D">Group D</option>
            <option value="group E">Group E</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Parental Level of Education</label>
          <select
            name="parentalEducation"
            value={formData.parentalEducation}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="some high school">Some High School</option>
            <option value="high school">High School</option>
            <option value="some college">Some College</option>
            <option value="associate's degree">Associate's Degree</option>
            <option value="bachelor's degree">Bachelor's Degree</option>
            <option value="master's degree">Master's Degree</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Lunch</label>
          <select
            name="lunch"
            value={formData.lunch}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="standard">Standard</option>
            <option value="free/reduced">Free/Reduced</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Test Preparation Course</label>
          <select
            name="testPreparation"
            value={formData.testPreparation}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="none">None</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Reading Score (0-100)</label>
          <input
            type="number"
            name="readingScore"
            value={formData.readingScore}
            onChange={handleChange}
            min="0"
            max="100"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Writing Score (0-100)</label>
          <input
            type="number"
            name="writingScore"
            value={formData.writingScore}
            onChange={handleChange}
            min="0"
            max="100"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
      >
        Predict Math Score
      </button>
    </form>
  );
};

export default PredictionForm;
