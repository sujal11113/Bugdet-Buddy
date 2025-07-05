
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: 'How accurate is the automatic categorization?',
      answer: 'Our AI-powered categorization is over 95% accurate and continuously learns from your spending patterns. You can always manually adjust categories, and the system will remember your preferences for future transactions.'
    },
    {
      question: 'Is my financial data secure?',
      answer: 'Absolutely. We use bank-level encryption and security measures to protect your data. We never store your banking credentials, and all data is encrypted both in transit and at rest. We are SOC 2 compliant and regularly audited for security.'
    },
    {
      question: 'Can I use ExpenseTracker for business expenses?',
      answer: 'Yes! ExpenseTracker works great for both personal and business expense tracking. You can create separate categories, generate detailed reports for tax purposes, and even export data for accounting software integration.'
    },
    {
      question: 'How does the screenshot expense recording work?',
      answer: 'Simply take a photo or upload an image of any receipt, email confirmation, or statement. Our OCR technology extracts key information like merchant name, amount, date, and category. You can review and edit the details before saving.'
    },
    {
      question: 'What file formats are supported for receipt uploads?',
      answer: 'We support JPG, PNG, PDF, and many other common formats. You can upload receipts from your phone camera, email screenshots, bank statements, and even handwritten receipts.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'ExpenseTracker is a responsive web app that works perfectly on all devices. You can access it from your phone browser with the same features as desktop. A dedicated mobile app is coming soon!'
    },
    {
      question: 'Can I export my expense data?',
      answer: 'Yes! You can export your data in multiple formats including CSV, Excel, and PDF. This makes it easy to share with accountants, import into other software, or keep backup records.'
    },
    {
      question: 'How do I get started?',
      answer: 'Getting started is easy! Sign up for a free account, complete your profile setup, and start adding expenses manually or through screenshots. The AI will begin learning your patterns immediately.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about ExpenseTracker
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white rounded-lg shadow-sm border-0 px-6"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional Help */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@expensetracker.com" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
            </a>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <a 
              href="#" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Schedule a Demo
            </a>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <a 
              href="#" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Help Center
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
