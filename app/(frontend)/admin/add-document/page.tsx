'use client';

import React, { useState, useEffect } from 'react';
import { MdCloudUpload, MdDescription, MdTitle, MdBusiness } from 'react-icons/md';

interface PropertyOption {
    id: string;
    title: string;
}

const AddDocumentPage = () => {
    const [properties, setProperties] = useState<PropertyOption[]>([]);
    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        propertyId: string;
        file: File | null;
    }>({
        title: '',
        description: '',
        propertyId: '',
        file: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch properties for the dropdown
    useEffect(() => {
        // In a real app, you would fetch this from an API
        const fetchProperties = async () => {
            // const response = await fetch('/api/properties');
            // const data = await response.json();
            // setProperties(data.properties);
            setProperties([
                { id: 'prop1', title: 'Skyline Apartments' },
                { id: 'prop2', title: 'Heritage Business Park' },
                { id: 'prop3', title: 'Oceanview Villas' },
            ]);
        };
        fetchProperties();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, file: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // TODO: Implement API call to upload document
        console.log('Form Data:', formData);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Example success/error
        if (formData.file) {
            setSuccess('Document uploaded successfully!');
            setFormData({ title: '', description: '', propertyId: '', file: null });
        } else {
            setError('Please select a file to upload.');
        }

        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white/40 backdrop-blur-xl border border-purple-200/50 shadow-[0_20px_50px_rgba(139,_92,_246,_0.15)] rounded-[2.5rem] p-8">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-8">Add New Document</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Document Title */}
                    <div className="relative">
                        <MdTitle className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                        <input
                            type="text"
                            placeholder="Document Title (e.g., Lease Agreement)"
                            className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    {/* Document Description */}
                    <div className="relative">
                        <MdDescription className="absolute left-4 top-5 text-purple-400" size={20} />
                        <textarea
                            placeholder="A brief description of the document..."
                            className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 h-32 resize-none outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    {/* Property Selection */}
                    <div className="relative">
                        <MdBusiness className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                        <select
                            className="w-full bg-white/80 border border-purple-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-400 transition-all text-slate-700 shadow-inner appearance-none"
                            value={formData.propertyId}
                            onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                            required
                        >
                            <option value="" disabled>Select a Property to associate</option>
                            {properties.map((prop: any) => (
                                <option key={prop.id} value={prop.id}>{prop.title}</option>
                            ))}
                        </select>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Document</label>
                        <div className="relative border-2 border-dashed border-purple-200 rounded-2xl p-8 text-center hover:border-purple-400 transition-all">
                            <MdCloudUpload className="mx-auto text-purple-400 mb-4" size={48} />
                            <input
                                type="file"
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                            />
                            {formData.file ? (
                                <p className="text-slate-700 font-semibold">{(formData.file as File).name}</p>
                            ) : (
                                <p className="text-slate-500">Drag & drop your file here or <span className="text-purple-600 font-bold">browse</span></p>
                            )}
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-500 text-sm text-center">{success}</p>}

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 transform transition-all active:scale-[0.98] hover:shadow-xl mt-4 disabled:bg-purple-400"
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Add Document'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDocumentPage;
