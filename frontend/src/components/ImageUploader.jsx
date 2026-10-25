import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Sparkles, RefreshCw } from 'lucide-react';

export default function ImageUploader({ onAnalyze, onSampleLoad, title, subtitle, loading, sampleLabel }) {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSampleClick = async () => {
    setPreview(null);
    setSelectedFile(null);
    if (onSampleLoad) {
      await onSampleLoad();
    }
  };

  const handleSubmit = () => {
    if (selectedFile && onAnalyze) {
      onAnalyze(selectedFile);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="font-bold text-slate-100 text-sm">{title}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>
        <button
          onClick={handleSampleClick}
          disabled={loading}
          className="flex items-center space-x-1.5 text-xs text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3.5 py-2 rounded-xl transition font-medium"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{sampleLabel || "Test with Built-in Sample"}</span>
        </button>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition relative overflow-hidden min-h-[220px] ${
          preview ? 'border-amber-500/50 bg-slate-950/60' : 'border-slate-700/80 hover:border-amber-500/60 bg-slate-950/30 hover:bg-slate-950/60'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
        />

        {preview ? (
          <div className="relative group max-h-[240px] flex items-center justify-center">
            <img src={preview} alt="Upload preview" className="max-h-[220px] rounded-lg object-contain shadow-md" />
            <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-lg">
              <span className="text-xs text-amber-300 font-medium">Click to select different image</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-slate-800 rounded-full text-slate-400 mb-3 group-hover:text-amber-400 transition">
              <UploadCloud className="w-8 h-8" />
            </div>
            <p className="text-sm font-medium text-slate-200">Drag & drop construction photo or click to browse</p>
            <p className="text-xs text-slate-500 mt-1">Supports JPEG, PNG, WebP (up to 25MB)</p>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span className="truncate max-w-[200px]">{selectedFile.name}</span>
            <span>({(selectedFile.size / 1024).toFixed(1)} KB)</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs px-5 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Multimodal AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Image Now</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
