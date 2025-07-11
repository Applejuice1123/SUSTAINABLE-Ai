"use client";
import { useState } from "react";

export default function Quickstart() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const dropdowns = [
    {
      title: "Summarizer",
      items: [
        { label: "Step 1", placeholder: "Open Google Colab", isCode: false },
        { label: "Step 2", placeholder: "!pip install transformers", isCode: true },
        { label: "Step 3", placeholder: "from transformers import pipeline", isCode: true },
        { label: "Step 4", placeholder: "summarizer = pipeline(\"summarization\")", isCode: true },
        { label: "Step 5", placeholder: "text = \"Artificial intelligence is transforming industries around the world.\nLarge language models like GPT-3 and GPT-4 can generate human-like text,\nanswer questions, write code, and perform many other language tasks.\nHowever, training and running these models can require significant computational resources and energy.\"", isCode: true },
        { label: "Step 6", placeholder: "summary = summarizer(text, max_length=50, min_length=20, do_sample=False)", isCode: true },
        { label: "Step 7", placeholder: "print(summary[0]['summary_text'])", isCode: true },
      ]
    },
    {
      title: "Translator",
      items: [
        { label: "Step 1", placeholder: "Open Google Colab", isCode: false },
        { label: "Step 2", placeholder: "!pip install transformers", isCode: true },
        { label: "Step 3", placeholder: "from transformers import pipeline", isCode: true },
        { label: "Step 4", placeholder: "translator = pipeline(\"translation_en_to_fr\")", isCode: true },
        { label: "Step 5", placeholder: "text = \"Artificial intelligence is transforming industries around the world.\"", isCode: true },
        { label: "Step 6", placeholder: "translation = translator(text, max_length=100)", isCode: true },
        { label: "Step 7", placeholder: "print(translation[0]['translation_text'])", isCode: true }
    ]
    
    },
    {
      title: "Classifier",
      items: [
        { label: "Step 1", placeholder: "Open Google Colab", isCode: false },
        { label: "Step 2", placeholder: "!pip install transformers", isCode: true },
        { label: "Step 3", placeholder: "from transformers import pipeline", isCode: true },
        { label: "Step 4", placeholder: "classifier = pipeline(\"zero-shot-classification\")", isCode: true },
        { 
          label: "Step 5", 
          placeholder: "text = \"OpenAI has released new powerful language models that can assist with programming and content creation.\"", 
          isCode: true 
        },
        { 
          label: "Step 6", 
          placeholder: "labels = [\"technology\", \"sports\", \"politics\", \"health\"]", 
          isCode: true 
        },
        { 
          label: "Step 7", 
          placeholder: "result = classifier(text, candidate_labels=labels)", 
          isCode: true 
        },
        { 
          label: "Step 8", 
          placeholder: "print(result)", 
          isCode: true 
        }
    ]
    
    
    },
    {
      title: "Answer Finder from text",
      items: [
        { label: "Step 1", placeholder: "Open Google Colab", isCode: false },
        { label: "Step 2", placeholder: "!pip install transformers", isCode: true },
        { label: "Step 3", placeholder: "from transformers import pipeline", isCode: true },
        { label: "Step 4", placeholder: "qa = pipeline(\"question-answering\")", isCode: true },
        { 
          label: "Step 5", 
          placeholder: "context = \"Artificial intelligence is transforming industries worldwide. OpenAI created ChatGPT, a large language model, in San Francisco. It can answer questions and write text.\"", 
          isCode: true 
        },
        { 
          label: "Step 6", 
          placeholder: "question = \"Where was ChatGPT created?\"", 
          isCode: true 
        },
        { 
          label: "Step 7", 
          placeholder: "result = qa(question=question, context=context)", 
          isCode: true 
        },
        { 
          label: "Step 8", 
          placeholder: "print(result['answer'])", 
          isCode: true 
        }
    ]
    
    }
    
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-0 sm:p-8">
      <main className="w-full max-w-4xl flex flex-col gap-8 mt-8">
        {/* Header */}
        <section className="flex flex-col items-center gap-2 mb-6">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-800">Quickstart Guide</h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mt-2">Follow these quick and easy steps to get make your own AI model that will use less resources than using larger language modles</p>
        </section>

        {/* Dropdown Sections */}
        <div className="space-y-6">
          {dropdowns.map((dropdown, index) => (
            <div key={index} className="bg-white/90 rounded-2xl shadow-xl overflow-hidden">
              {/* Dropdown Header */}
              <button
                onClick={() => toggleDropdown(index)}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-left flex justify-between items-center hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                <span className="text-lg">{dropdown.title}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-200 ${
                    openDropdown === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Content */}
              {openDropdown === index && (
                <div className="px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
                  {dropdown.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {item.label}
                      </label>
                      {item.label === "Step 1" ? (
                        <button
                          onClick={() => window.open('https://colab.research.google.com', '_blank')}
                          className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          Open Google Colab
                        </button>
                      ) : item.isCode ? (
                        <div className="relative">
                          <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm min-h-[40px] flex items-center whitespace-pre-wrap">
                            {item.placeholder}
                          </div>
                          <button
                            onClick={() => copyToClipboard(item.placeholder)}
                            className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded transition-colors duration-200"
                            title="Copy to clipboard"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 min-h-[40px] flex items-center">
                          {item.placeholder}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <section className="text-center text-gray-500 mt-12">
        </section>
      </main>
    </div>
  );
} 