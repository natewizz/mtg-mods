"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // For now, we'll simulate sending an email
      console.log("Form data to be sent:", data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSubmitSuccess(true);
      reset(); // Clear the form
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending contact form:", error);
      setSubmitError("There was a problem sending your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#5A31F4]">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-[#2C2E3A]">Get In Touch</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-[#FF8661]">Email</h3>
              <p className="mt-1">
                <a href="mailto:support@mtgmods.xyz" className="text-[#5A31F4] hover:underline">
                  support@mtgmods.xyz
                </a>
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#FFC145]">Discord</h3>
              <p className="mt-1">
                Join our <a href="#" className="text-[#5A31F4] hover:underline">Discord community</a> for faster responses and to connect with other players.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#3DA1C4]">Follow Us</h3>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-[#5A31F4] hover:text-[#4921D8]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-[#5A31F4] hover:text-[#4921D8]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-[#5A31F4] hover:text-[#4921D8]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-[#2C2E3A]">Send Us a Message</h2>
          
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md border border-green-200">
              Your message has been sent successfully! We&apos;ll get back to you soon.
            </div>
          )}
          
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
              {submitError}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A31F4]"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-[#FF8661]">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A31F4]"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-[#FF8661]">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                {...register("subject", { required: "Subject is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A31F4]"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-[#FF8661]">{errors.subject.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                {...register("message", { required: "Message is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A31F4]"
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-[#FF8661]">{errors.message.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-[#5A31F4] hover:bg-[#4921D8] text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5A31F4] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
      
      <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-[#2C2E3A]">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-[#5A31F4]">What is MTG Mods?</h3>
            <p className="mt-2">
              MTG Mods is a platform for sharing and discovering rule modifications for Magic: The Gathering. 
              Our goal is to help players enhance their gameplay experience with creative twists on the 
              standard rules.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-[#5A31F4]">How do I submit a rule modification?</h3>
            <p className="mt-2">
              You&apos;ll need to create an account first. Once logged in, you can click on the &quot;Create Recipe&quot; 
              button to submit your rule modification. Make sure to provide clear instructions and consider 
              issues of balance and playability.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-[#5A31F4]">Is MTG Mods affiliated with Wizards of the Coast?</h3>
            <p className="mt-2">
              No, MTG Mods is not affiliated with, endorsed by, or sponsored by Wizards of the Coast. 
              Magic: The Gathering is a trademark of Wizards of the Coast LLC.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-[#5A31F4]">How can I report inappropriate content?</h3>
            <p className="mt-2">
              If you encounter content that violates our Community Guidelines, please use the report feature 
              on the specific content, or contact us at support@mtgmods.xyz with details about the content in question.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Contact MTG Mods | Magic: The Gathering Community',
  description: 'Contact the MTG Mods team for support, feedback, or partnership inquiries. Join our Discord or send us a message directly.',
  keywords: [
    'Magic the Gathering', 'MTG', 'contact', 'support', 'feedback', 'community', 'Discord', 'email', 'help', 'partnership'
  ],
  openGraph: {
    title: 'Contact MTG Mods | Magic: The Gathering Community',
    description: 'Contact the MTG Mods team for support, feedback, or partnership inquiries. Join our Discord or send us a message directly.',
    url: "https://mtgmods.xyz/contact",
    siteName: 'MTG Mods',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'MTG Mods Logo'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact MTG Mods | Magic: The Gathering Community',
    description: 'Contact the MTG Mods team for support, feedback, or partnership inquiries. Join our Discord or send us a message directly.',
    images: ['/logo.png']
  }
}; 