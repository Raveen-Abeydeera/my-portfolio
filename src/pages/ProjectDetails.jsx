import { ArrowLeft, Github, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectDetails({ title, desc, repoLink, downloadLink, techStack, features, screenshots, children }) {
  return (
    <div className="min-h-screen pt-20 pb-12 px-6 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center text-muted-light dark:text-muted-dark hover:text-accent-primary mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Portfolio
        </Link>

        <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-4">{title}</h1>
            <p className="text-xl text-muted-light dark:text-muted-dark">{desc}</p>
            
            <div className="mt-8 flex flex-wrap gap-4">
                {downloadLink && (
                    /* FIXED: Bright Blue background, White text */
                    <a href={downloadLink} className="bg-accent-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-accent-hover transition flex items-center shadow-lg shadow-accent-primary/20">
                        <Download className="w-5 h-5 mr-2" /> Download App (APK)
                    </a>
                )}
                {repoLink && (
                    <a href={repoLink} target="_blank" rel="noopener noreferrer" className="border border-gray-400 dark:border-gray-600 text-text-light dark:text-text-dark hover:border-accent-primary hover:text-accent-primary px-6 py-3 rounded-lg font-medium transition flex items-center">
                        <Github className="w-5 h-5 mr-2" /> View Source Code
                    </a>
                )}
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-accent-primary mb-4">Project Overview</h2>
                    <div className="text-text-light dark:text-gray-300 leading-relaxed">
                        {children}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-accent-primary mb-4">Key Features</h2>
                    <ul className="list-disc list-inside text-text-light dark:text-gray-300 space-y-2">
                        {features.map((feat, i) => <li key={i}>{feat}</li>)}
                    </ul>
                </section>
            </div>

            <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-gray-200 dark:border-gray-700 h-fit">
                <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                    {techStack.map(tech => (
                        <span key={tech} className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-gray-200 dark:border-gray-600 px-3 py-1 rounded-full text-sm">{tech}</span>
                    ))}
                </div>
            </div>
        </div>

        <div className="mt-16">
            <h2 className="text-2xl font-bold text-accent-primary mb-6">Screenshots</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {screenshots.map((src, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:scale-105 transition-transform">
                        <img src={src} alt={`Screenshot ${index + 1}`} className="w-full h-auto" />
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}