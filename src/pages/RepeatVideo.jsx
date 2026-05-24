import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Shield, Video, Download, Play, Repeat, AlertTriangle, Settings } from 'lucide-react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import DropZone from '../components/shared/DropZone';
import { saveToOPFS, getFromOPFS, clearOPFSSandbox } from '../utils/opfsHelper';
import { repeatVideo } from '../utils/videoEngine';
import { formatBytes } from '../utils/imageUtils';

export default function RepeatVideo() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [resultUrl, setResultUrl] = useState('');
  const [resultSize, setResultSize] = useState(0);

  // Settings
  const [repeats, setRepeats] = useState(3);
  const [tempUrl, setTempUrl] = useState('');

  const videoRef = useRef(null);

  useEffect(() => {
    return () => {
      clearOPFSSandbox();
      if (tempUrl) URL.revokeObjectURL(tempUrl);
    };
  }, []);

  const handleFileSelect = async (filesList) => {
    const selected = filesList[0];
    if (!selected) return;

    if (!selected.type.startsWith('video/') && !selected.name.toLowerCase().endsWith('.mov')) {
      setError('Please upload a valid video file.');
      return;
    }

    setError('');
    setProcessing(true);
    setProgressMsg('Buffering video to high-speed local disk storage...');
    setProgressPercent(0);
    setResultUrl('');

    try {
      await clearOPFSSandbox();
      await saveToOPFS('input_repeat.mp4', selected);
      
      const localUrl = URL.createObjectURL(selected);
      if (tempUrl) URL.revokeObjectURL(tempUrl);
      setTempUrl(localUrl);
      setFile(selected);
      setProcessing(false);
    } catch (err) {
      console.error(err);
      setError('Failed to buffer video file. Please try a smaller file.');
      setProcessing(false);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    if (repeats < 2 || repeats > 20) {
      setError('Repetitions count must be between 2 and 20.');
      return;
    }

    setError('');
    setProcessing(true);
    setProgressMsg(`Initializing repeater engine for ${repeats}x loop...`);
    setProgressPercent(0);

    try {
      await repeatVideo('input_repeat.mp4', 'output_repeated.mp4', repeats, ({ message, progress }) => {
        if (message) setProgressMsg(message);
        if (progress !== undefined) setProgressPercent(progress);
      });

      const outFile = await getFromOPFS('output_repeated.mp4');
      const url = URL.createObjectURL(outFile);
      
      setResultUrl(url);
      setResultSize(outFile.size);
      setProcessing(false);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Looper failed. Please make sure SharedArrayBuffers are enabled.');
      setProcessing(false);
    }
  };

  const handleReset = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }
    if (tempUrl) {
      URL.revokeObjectURL(tempUrl);
      setTempUrl('');
    }
    setFile(null);
    setResultUrl('');
    setError('');
    setProcessing(false);
    setRepeats(3);
    clearOPFSSandbox();
  };

  return (
    <div className="app-shell">
      <Navbar />
      <Helmet>
        <title>Loop &amp; Repeat Video Online — Free &amp; Offline | Fileora</title>
        <meta name="description" content="Repeat and loop video files online for free. Combine multiple loops of the same video into a single MP4 locally inside your browser with 100% privacy." />
        <link rel="canonical" href="https://fileora.tech/repeat-video" data-rh="true" />
        <meta property="og:title" content="Loop &amp; Repeat Video Online — Free &amp; Offline | Fileora" />
        <meta property="og:description" content="Repeat and loop video files online for free. Combine multiple loops of the same video into a single MP4 locally inside your browser with 100% privacy." />
        <meta property="og:url" content="https://fileora.tech/repeat-video" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://fileora.tech/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Loop &amp; Repeat Video Online — Free &amp; Offline | Fileora" />
        <meta name="twitter:description" content="Repeat and loop video files online for free. Combine multiple loops of the same video into a single MP4 locally inside your browser with 100% privacy." />
        <meta name="twitter:image" content="https://fileora.tech/og-image.png" />
      </Helmet>

      <main className="tool-main">
        <section className="tool-hero container">
          <span className="eyebrow">Video Utilities</span>
          <h1>Video Looper &amp; Repeater</h1>
          <p>Repeat a video multiple times and combine them into a single, seamless looped output locally in your browser. Lightning-fast remuxing with zero quality loss.</p>
        </section>

        <section className="container" style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
          {error && (
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderColor: 'var(--danger)', padding: '1rem', marginBottom: '1.5rem', background: 'rgba(239, 68, 68, 0.05)' }}>
              <AlertTriangle color="var(--danger)" size={20} style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{error}</div>
            </div>
          )}

          {processing ? (
            <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
              <div className="loading-spinner" style={{ width: '40px', height: '40px' }} />
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{progressMsg}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Stitching video repetitions client-side... keep this tab active.</p>
              </div>
              {progressPercent > 0 && (
                <div style={{ width: '100%', maxWidth: '300px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    <span>Stitching</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 0.2s' }} />
                  </div>
                </div>
              )}
            </div>
          ) : resultUrl ? (
            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <button onClick={handleReset} className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '13px' }}>
                  <ArrowLeft size={16} /> Loop Another Video
                </button>
                <div className="badge">
                  <Shield size={12} style={{ marginRight: '4px' }} /> Processed Offline
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                <video src={resultUrl} controls style={{ width: '100%', maxHeight: '400px', display: 'block' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{file.name.replace(/\.[^/.]+$/, '')}-repeated.mp4</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Size: {formatBytes(resultSize)} · Loops: {repeats}x</p>
                </div>
                <a href={resultUrl} download={`${file.name.replace(/\.[^/.]+$/, '')}-repeated.mp4`} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
                  <Download size={18} /> Download Looped Video
                </a>
              </div>
            </div>
          ) : file ? (
            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <button onClick={handleReset} className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '13px' }}>
                  <ArrowLeft size={16} /> Choose Different Video
                </button>
                <div className="badge">
                  <Settings size={12} style={{ marginRight: '4px' }} /> Configure
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                <video ref={videoRef} src={tempUrl} controls style={{ width: '100%', maxHeight: '300px', display: 'block' }} />
              </div>

              {/* Loop Repetitions configuration */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Repeat size={14} color="var(--accent-primary)" /> Loop Repetitions</span>
                  <span style={{ color: 'var(--accent-primary)', fontSize: '15px', fontWeight: 'bold' }}>{repeats} times</span>
                </div>
                
                <input
                  type="range"
                  min="2"
                  max="15"
                  step="1"
                  value={repeats}
                  onChange={(e) => setRepeats(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer', marginTop: '8px' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                  <span>2 loops</span>
                  <span>5 loops</span>
                  <span>10 loops</span>
                  <span>15 loops</span>
                </div>
              </div>

              <button onClick={handleConvert} className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px' }}>
                <Repeat size={16} /> Create Looped Video
              </button>
            </div>
          ) : (
            <DropZone
              onFiles={handleFileSelect}
              accept="video/*"
              maxSizeLabel=""
              helpText="Select video file to repeat and loop locally."
            />
          )}
        </section>

        <section className="container" style={{ margin: '48px auto', maxWidth: '800px', lineHeight: '1.6' }}>
          <h2>Zero Quality Loss Video Stitching &amp; Repeating</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Traditional repeat tools force you to transcode and re-compress frames, which causes extreme rendering latency and degrades pixel definition. Fileora handles this using a lightning-fast WebAssembly-based **concat demuxer**.
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Since the video format, dimensions, bitrates, and keyframe intervals are exactly identical, we copy the original streams directly and repeat the reference blocks. This takes less than a second for up to 15 loops, uses zero remote servers, and preserves 100% of your visual quality.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
