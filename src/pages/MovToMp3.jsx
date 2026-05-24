import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Shield, Music, Download, Play, AlertTriangle, Settings } from 'lucide-react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import DropZone from '../components/shared/DropZone';
import { saveToOPFS, getFromOPFS, clearOPFSSandbox } from '../utils/opfsHelper';
import { extractAudioToMp3 } from '../utils/videoEngine';
import { formatBytes } from '../utils/imageUtils';

export default function MovToMp3() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [resultUrl, setResultUrl] = useState('');
  const [resultSize, setResultSize] = useState(0);

  // Settings
  const [bitrate, setBitrate] = useState(192);

  useEffect(() => {
    return () => {
      clearOPFSSandbox();
    };
  }, []);

  const handleFileSelect = async (filesList) => {
    const selected = filesList[0];
    if (!selected) return;

    if (!selected.name.toLowerCase().endsWith('.mov')) {
      setError('Please upload a valid .MOV file.');
      return;
    }

    setError('');
    setProcessing(true);
    setProgressMsg('Buffering video to high-speed local disk storage...');
    setProgressPercent(0);
    setResultUrl('');

    try {
      await clearOPFSSandbox();
      await saveToOPFS('input_mov_audio.mov', selected);
      setFile(selected);
      setProcessing(false);
    } catch (err) {
      console.error(err);
      setError('Failed to buffer video file. Please try a smaller file or a different browser.');
      setProcessing(false);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true);
    setProgressMsg('Initializing audio extraction engine...');
    setProgressPercent(0);

    try {
      await extractAudioToMp3('input_mov_audio.mov', 'output_audio.mp3', bitrate, ({ message, progress }) => {
        if (message) setProgressMsg(message);
        if (progress !== undefined) setProgressPercent(progress);
      });

      const outFile = await getFromOPFS('output_audio.mp3');
      const url = URL.createObjectURL(outFile);
      
      setResultUrl(url);
      setResultSize(outFile.size);
      setProcessing(false);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Audio extraction failed. Please ensure SharedArrayBuffers are active.');
      setProcessing(false);
    }
  };

  const handleReset = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }
    setFile(null);
    setResultUrl('');
    setError('');
    setProcessing(false);
    setBitrate(192);
    clearOPFSSandbox();
  };

  return (
    <div className="app-shell">
      <Navbar />
      <Helmet>
        <title>Extract MOV to MP3 Online — Free &amp; Offline | Fileora</title>
        <meta name="description" content="Extract audio tracks from Apple QuickTime MOV videos to universal high-quality MP3 format. 100% offline, private client-side audio extraction in your browser." />
        <link rel="canonical" href="https://fileora.tech/mov-to-mp3" data-rh="true" />
        <meta property="og:title" content="Extract MOV to MP3 Online — Free &amp; Offline | Fileora" />
        <meta property="og:description" content="Extract audio tracks from Apple QuickTime MOV videos to universal high-quality MP3 format. 100% offline, private client-side audio extraction in your browser." />
        <meta property="og:url" content="https://fileora.tech/mov-to-mp3" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://fileora.tech/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Extract MOV to MP3 Online — Free &amp; Offline | Fileora" />
        <meta name="twitter:description" content="Extract audio tracks from Apple QuickTime MOV videos to universal high-quality MP3 format. 100% offline, private client-side audio extraction in your browser." />
        <meta name="twitter:image" content="https://fileora.tech/og-image.png" />
      </Helmet>

      <main className="tool-main">
        <section className="tool-hero container">
          <span className="eyebrow">Video Utilities</span>
          <h1>Extract MOV to MP3</h1>
          <p>Extract high-fidelity audio streams directly from Apple QuickTime .MOV captures and export as standard .MP3 files locally. Completely private, fast, and offline.</p>
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
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Extracting audio track client-side... keep this tab active.</p>
              </div>
              {progressPercent > 0 && (
                <div style={{ width: '100%', maxWidth: '300px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    <span>Extracting</span>
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
                  <ArrowLeft size={16} /> Extract Another Audio
                </button>
                <div className="badge">
                  <Shield size={12} style={{ marginRight: '4px' }} /> Processed Offline
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <Music size={48} color="var(--accent-primary)" />
                <audio src={resultUrl} controls style={{ width: '100%', maxWidth: '400px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{file.name.replace(/\.[^/.]+$/, '')}.mp3</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Size: {formatBytes(resultSize)} · Format: MP3 ({bitrate}kbps)</p>
                </div>
                <a href={resultUrl} download={`${file.name.replace(/\.[^/.]+$/, '')}.mp3`} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
                  <Download size={18} /> Download MP3 Audio
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
                  <Settings size={12} style={{ marginRight: '4px' }} /> Configuration
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                <Music size={36} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>MOV Container · {formatBytes(file.size)}</div>
                </div>
              </div>

              {/* Bitrate Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Audio Output Bitrate</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {[128, 192, 320].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setBitrate(rate)}
                      style={{
                        padding: '10px',
                        borderRadius: '6px',
                        background: bitrate === rate ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                        color: bitrate === rate ? '#000' : 'var(--text-secondary)',
                        border: '1px solid var(--border-color)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontSize: '13px'
                      }}
                    >
                      {rate} kbps {rate === 192 && '(Balanced)'} {rate === 320 && '(HQ)'}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleConvert} className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px' }}>
                <Play size={16} /> Extract MP3 Audio
              </button>
            </div>
          ) : (
            <DropZone
              onFiles={handleFileSelect}
              accept=".mov"
              maxSizeLabel=""
              helpText="Select Apple MOV video file to extract audio locally."
            />
          )}
        </section>

        <section className="container" style={{ margin: '48px auto', maxWidth: '800px', lineHeight: '1.6' }}>
          <h2>Confidential Client-Side Audio Extraction</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Uploading private video logs or iPhone captures across external networks to convert them to audio presents substantial security concerns. Fileora parses and extracts the binary layers of your Apple QuickTime H.264 streams directly within your local browser sandbox.
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Using advanced local WebAssembly compiling systems, the audio channels are separated and re-encoded using `libmp3lame` natively on your machine's CPU. 100% private, instant, and completely safe.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
