"use client";

import { useState } from "react";

const EVENT_TYPES = [
    "Conference",
    "Meeting",
    "Webinar",
    "Workshop",
    "Social",
    "Training",
    "Other",
];

const STATUS_OPTIONS = ["draft", "published", "cancelled"];

const initialForm = {
    cc_event_type: "",
    cc_event_name: "",
    cc_event_stat: "",
    cc_event_end: "",
    cc_event_description: "",
    cc_event_location: "",
    cc_event_address: {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    },
    status: "draft",
};

function toISOLocal(datetimeLocal) {
    if (!datetimeLocal) return "";
    return new Date(datetimeLocal).toISOString();
}

export default function AdminEventPage() {
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState(null); // { success, message }
    const [errors, setErrors] = useState({});

    function validate() {
        const e = {};
        if (!form.cc_event_name.trim()) e.cc_event_name = "Event name is required";
        if (!form.cc_event_type) e.cc_event_type = "Event type is required";
        if (!form.cc_event_stat) e.cc_event_stat = "Start time is required";
        if (!form.cc_event_end) e.cc_event_end = "End time is required";
        if (form.cc_event_stat && form.cc_event_end && form.cc_event_stat >= form.cc_event_end)
            e.cc_event_end = "End must be after start";
        if (!form.status) e.status = "Status is required";
        return e;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        setErrors((er) => ({ ...er, [name]: undefined }));
    }

    function handleAddressChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({
            ...f,
            cc_event_address: { ...f.cc_event_address, [name]: value },
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }

        setSubmitting(true);
        setResult(null);

        const payload = {
            cc_event_type: form.cc_event_type,
            cc_event_name: form.cc_event_name,
            cc_event_stat: toISOLocal(form.cc_event_stat),
            cc_event_end: toISOLocal(form.cc_event_end),
            cc_event_description: form.cc_event_description,
            cc_event_location: form.cc_event_location,
            cc_event_address: form.cc_event_address,
            status: form.status,
        };

        try {
            const res = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                const data = await res.json();
                setResult({ success: true, message: `Event created — ID #${data.id ?? "—"}` });
                setForm(initialForm);
                setErrors({});
            } else {
                const text = await res.text();
                setResult({ success: false, message: `Error ${res.status}: ${text}` });
            }
        } catch (err) {
            setResult({ success: false, message: `Network error: ${err.message}` });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0d0d0f;
          color: #e8e6e1;
          font-family: 'IBM Plex Sans', sans-serif;
          min-height: 100vh;
        }

        .page {
          min-height: 100vh;
          background: #0d0d0f;
          background-image:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,165,0,0.07) 0%, transparent 60%),
            linear-gradient(180deg, #0d0d0f 0%, #111114 100%);
          padding: 0 0 80px;
        }

        /* ── Top bar ── */
        .topbar {
          border-bottom: 1px solid #1e1e24;
          padding: 0 40px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(13,13,15,0.95);
          backdrop-filter: blur(8px);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .topbar-logo {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          font-weight: 600;
          color: #f5a623;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .topbar-sep { width: 1px; height: 20px; background: #2a2a32; }
        .topbar-path {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: #5c5c6e;
        }
        .topbar-path span { color: #888898; }
        .topbar-badge {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #f5a623;
          border: 1px solid rgba(245,166,35,0.3);
          padding: 3px 8px;
          border-radius: 2px;
          background: rgba(245,166,35,0.06);
        }

        /* ── Main layout ── */
        .main {
          max-width: 860px;
          margin: 0 auto;
          padding: 48px 24px 0;
        }

        /* ── Header ── */
        .page-header {
          margin-bottom: 40px;
        }
        .page-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #f5a623;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .page-eyebrow::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 1px;
          background: #f5a623;
        }
        .page-title {
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 32px;
          font-weight: 300;
          color: #f0ede8;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .page-title strong { font-weight: 600; }
        .page-subtitle {
          font-size: 14px;
          color: #5c5c6e;
          margin-top: 8px;
          font-family: 'IBM Plex Mono', monospace;
        }

        /* ── Form card ── */
        .card {
          background: #13131a;
          border: 1px solid #1e1e28;
          border-radius: 4px;
          overflow: hidden;
        }
        .card-section {
          padding: 28px 32px;
          border-bottom: 1px solid #1a1a22;
        }
        .card-section:last-child { border-bottom: none; }

        .section-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #3e3e52;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #1a1a22;
        }

        /* ── Fields ── */
        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .field-row.single { grid-template-columns: 1fr; }
        .field-row.triple { grid-template-columns: 2fr 1fr 1fr; }

        .field { display: flex; flex-direction: column; gap: 6px; }

        label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #6a6a82;
        }
        label .req { color: #f5a623; margin-left: 3px; }

        input, textarea, select {
          background: #0d0d12;
          border: 1px solid #252530;
          border-radius: 3px;
          color: #e8e6e1;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 14px;
          padding: 10px 14px;
          transition: border-color 0.15s, box-shadow 0.15s;
          outline: none;
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
        }
        input:focus, textarea:focus, select:focus {
          border-color: rgba(245,166,35,0.5);
          box-shadow: 0 0 0 3px rgba(245,166,35,0.07);
        }
        input::placeholder, textarea::placeholder { color: #2e2e3e; }
        textarea { resize: vertical; min-height: 96px; line-height: 1.5; }

        select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236a6a82' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
          cursor: pointer;
        }
        select option { background: #13131a; }

        input[type="datetime-local"]::-webkit-calendar-picker-indicator {
          filter: invert(0.4) sepia(1) saturate(2) hue-rotate(10deg);
          cursor: pointer;
        }

        .field-error {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          color: #e05c5c;
          letter-spacing: 0.04em;
        }
        input.err, textarea.err, select.err {
          border-color: rgba(224,92,92,0.5);
        }

        /* ── Status pills ── */
        .status-group {
          display: flex;
          gap: 8px;
        }
        .status-pill {
          flex: 1;
          padding: 9px 12px;
          border: 1px solid #252530;
          border-radius: 3px;
          background: #0d0d12;
          cursor: pointer;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #4a4a62;
          text-align: center;
          transition: all 0.15s;
        }
        .status-pill:hover { border-color: #3a3a48; color: #8888a0; }
        .status-pill.active-draft {
          background: rgba(100,100,200,0.08);
          border-color: rgba(100,100,200,0.35);
          color: #8888cc;
        }
        .status-pill.active-published {
          background: rgba(80,200,120,0.08);
          border-color: rgba(80,200,120,0.35);
          color: #50c878;
        }
        .status-pill.active-cancelled {
          background: rgba(224,92,92,0.08);
          border-color: rgba(224,92,92,0.35);
          color: #e05c5c;
        }

        /* ── JSON preview ── */
        .json-preview {
          background: #0a0a0e;
          border: 1px solid #1a1a22;
          border-radius: 3px;
          padding: 16px 20px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px;
          color: #5c5c78;
          line-height: 1.7;
          white-space: pre-wrap;
          word-break: break-all;
          max-height: 220px;
          overflow-y: auto;
        }
        .json-preview .key { color: #8888b8; }
        .json-preview .str { color: #7dbf8e; }
        .json-preview .num { color: #e0a060; }

        /* ── Footer actions ── */
        .form-footer {
          padding: 24px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #0f0f16;
          border-top: 1px solid #1a1a22;
        }
        .footer-hint {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: #3a3a4e;
        }
        .footer-hint span { color: #f5a623; }

        .btn-group { display: flex; gap: 10px; }

        .btn {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 11px 24px;
          border-radius: 3px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-ghost {
          background: transparent;
          border-color: #252530;
          color: #5c5c6e;
        }
        .btn-ghost:hover { border-color: #3a3a48; color: #8888a0; }

        .btn-primary {
          background: #f5a623;
          border-color: #f5a623;
          color: #0d0d0f;
        }
        .btn-primary:hover { background: #f7b845; }
        .btn-primary:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* ── Result banner ── */
        .result-banner {
          margin-bottom: 20px;
          padding: 14px 20px;
          border-radius: 3px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: slideIn 0.2s ease;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .result-success {
          background: rgba(80,200,120,0.08);
          border: 1px solid rgba(80,200,120,0.25);
          color: #50c878;
        }
        .result-error {
          background: rgba(224,92,92,0.08);
          border: 1px solid rgba(224,92,92,0.25);
          color: #e05c5c;
        }
        .result-icon { font-size: 14px; }

        /* ── Spinner ── */
        .spinner {
          width: 12px; height: 12px;
          border: 2px solid rgba(13,13,15,0.3);
          border-top-color: #0d0d0f;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 640px) {
          .field-row { grid-template-columns: 1fr; }
          .field-row.triple { grid-template-columns: 1fr; }
          .topbar { padding: 0 20px; }
          .main { padding: 32px 16px 0; }
          .card-section { padding: 20px; }
          .form-footer { flex-direction: column; gap: 16px; align-items: flex-end; }
        }
      `}</style>

            <div className="page">
                {/* Top bar */}
                <div className="topbar">
                    <div className="topbar-left">
                        <span className="topbar-logo">Admin</span>
                        <div className="topbar-sep" />
                        <span className="topbar-path">
              /events/<span>new</span>
            </span>
                    </div>
                    <span className="topbar-badge">POST /api/events</span>
                </div>

                <div className="main">
                    {/* Header */}
                    <div className="page-header">
                        <div className="page-eyebrow">Event Management</div>
                        <h1 className="page-title">
                            Create <strong>New Event</strong>
                        </h1>
                        <p className="page-subtitle">
                            Fields map directly to the Go Event struct → JSON payload
                        </p>
                    </div>

                    {/* Result banner */}
                    {result && (
                        <div className={`result-banner ${result.success ? "result-success" : "result-error"}`}>
                            <span className="result-icon">{result.success ? "✓" : "✗"}</span>
                            {result.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="card">

                            {/* ── Core Info ── */}
                            <div className="card-section">
                                <div className="section-label">Core Info</div>

                                <div className="field-row">
                                    <div className="field">
                                        <label>Event Name <span className="req">*</span></label>
                                        <input
                                            name="cc_event_name"
                                            value={form.cc_event_name}
                                            onChange={handleChange}
                                            placeholder="e.g. Q3 All Hands Meeting"
                                            className={errors.cc_event_name ? "err" : ""}
                                        />
                                        {errors.cc_event_name && <span className="field-error">{errors.cc_event_name}</span>}
                                    </div>
                                    <div className="field">
                                        <label>Event Type <span className="req">*</span></label>
                                        <select
                                            name="cc_event_type"
                                            value={form.cc_event_type}
                                            onChange={handleChange}
                                            className={errors.cc_event_type ? "err" : ""}
                                        >
                                            <option value="">Select type…</option>
                                            {EVENT_TYPES.map((t) => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                        {errors.cc_event_type && <span className="field-error">{errors.cc_event_type}</span>}
                                    </div>
                                </div>

                                <div className="field-row single">
                                    <div className="field">
                                        <label>Description</label>
                                        <textarea
                                            name="cc_event_description"
                                            value={form.cc_event_description}
                                            onChange={handleChange}
                                            placeholder="Event details, agenda, notes…"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ── Schedule ── */}
                            <div className="card-section">
                                <div className="section-label">Schedule</div>
                                <div className="field-row">
                                    <div className="field">
                                        <label>Start <span className="req">*</span></label>
                                        <input
                                            type="datetime-local"
                                            name="cc_event_stat"
                                            value={form.cc_event_stat}
                                            onChange={handleChange}
                                            className={errors.cc_event_stat ? "err" : ""}
                                        />
                                        {errors.cc_event_stat && <span className="field-error">{errors.cc_event_stat}</span>}
                                    </div>
                                    <div className="field">
                                        <label>End <span className="req">*</span></label>
                                        <input
                                            type="datetime-local"
                                            name="cc_event_end"
                                            value={form.cc_event_end}
                                            onChange={handleChange}
                                            className={errors.cc_event_end ? "err" : ""}
                                        />
                                        {errors.cc_event_end && <span className="field-error">{errors.cc_event_end}</span>}
                                    </div>
                                </div>
                            </div>

                            {/* ── Location ── */}
                            <div className="card-section">
                                <div className="section-label">Location</div>

                                <div className="field-row single" style={{ marginBottom: 16 }}>
                                    <div className="field">
                                        <label>Venue / Location Name</label>
                                        <input
                                            name="cc_event_location"
                                            value={form.cc_event_location}
                                            onChange={handleChange}
                                            placeholder="e.g. Marriott Conference Center, Room 4B"
                                        />
                                    </div>
                                </div>

                                <div className="field-row single" style={{ marginBottom: 16 }}>
                                    <div className="field">
                                        <label>Street Address</label>
                                        <input
                                            name="street"
                                            value={form.cc_event_address.street}
                                            onChange={handleAddressChange}
                                            placeholder="123 Main St"
                                        />
                                    </div>
                                </div>

                                <div className="field-row triple">
                                    <div className="field">
                                        <label>City</label>
                                        <input
                                            name="city"
                                            value={form.cc_event_address.city}
                                            onChange={handleAddressChange}
                                            placeholder="New Orleans"
                                        />
                                    </div>
                                    <div className="field">
                                        <label>State</label>
                                        <input
                                            name="state"
                                            value={form.cc_event_address.state}
                                            onChange={handleAddressChange}
                                            placeholder="LA"
                                        />
                                    </div>
                                    <div className="field">
                                        <label>ZIP</label>
                                        <input
                                            name="zip"
                                            value={form.cc_event_address.zip}
                                            onChange={handleAddressChange}
                                            placeholder="70115"
                                        />
                                    </div>
                                </div>

                                <div className="field-row single" style={{ marginTop: 16 }}>
                                    <div className="field">
                                        <label>Country</label>
                                        <input
                                            name="country"
                                            value={form.cc_event_address.country}
                                            onChange={handleAddressChange}
                                            placeholder="US"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ── Status ── */}
                            <div className="card-section">
                                <div className="section-label">Status</div>
                                <div className="status-group">
                                    {STATUS_OPTIONS.map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            className={`status-pill ${form.status === s ? `active-${s}` : ""}`}
                                            onClick={() => {
                                                setForm((f) => ({ ...f, status: s }));
                                                setErrors((er) => ({ ...er, status: undefined }));
                                            }}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* ── JSON Preview ── */}
                            <div className="card-section">
                                <div className="section-label">Payload Preview</div>
                                <div className="json-preview">
                                    <JsonPreview form={form} />
                                </div>
                            </div>

                            {/* ── Footer ── */}
                            <div className="form-footer">
                <span className="footer-hint">
                  POST → <span>/api/events</span> · Content-Type: application/json
                </span>
                                <div className="btn-group">
                                    <button
                                        type="button"
                                        className="btn btn-ghost"
                                        onClick={() => { setForm(initialForm); setErrors({}); setResult(null); }}
                                    >
                                        Reset
                                    </button>
                                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                                        {submitting ? <span className="spinner" /> : null}
                                        {submitting ? "Creating…" : "Create Event"}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

// ── Syntax-highlighted JSON preview ──
function JsonPreview({ form }) {
    const payload = {
        cc_event_type: form.cc_event_type || "",
        cc_event_name: form.cc_event_name || "",
        cc_event_stat: form.cc_event_stat ? new Date(form.cc_event_stat).toISOString() : "",
        cc_event_end: form.cc_event_end ? new Date(form.cc_event_end).toISOString() : "",
        cc_event_description: form.cc_event_description || "",
        cc_event_location: form.cc_event_location || "",
        cc_event_address: form.cc_event_address,
        status: form.status,
    };

    const lines = JSON.stringify(payload, null, 2).split("\n");

    return (
        <>
            {lines.map((line, i) => {
                const keyMatch = line.match(/^(\s*)("[\w_]+")(\s*:\s*)(.+)/);
                if (keyMatch) {
                    const [, indent, key, colon, val] = keyMatch;
                    const isStr = val.startsWith('"');
                    const isNum = /^[\d.]+/.test(val.trim());
                    return (
                        <div key={i}>
                            {indent}
                            <span style={{ color: "#8888b8" }}>{key}</span>
                            <span style={{ color: "#3e3e52" }}>{colon}</span>
                            <span style={{ color: isStr ? "#7dbf8e" : isNum ? "#e0a060" : "#cc8844" }}>{val}</span>
                        </div>
                    );
                }
                return <div key={i} style={{ color: "#3e3e52" }}>{line}</div>;
            })}
        </>
    );
}