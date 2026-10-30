
import React, { useState } from "react";
import {
  FileText,
  Printer,
  Download,
  RotateCcw,
  ShieldCheck,
  Plus,
  Eye,
  Wallet,
  CalendarDays,
  User,
  Tag
} from "lucide-react";

export default function App() {
  const [details, setDetails] = useState({
    payee: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    memo: "",
    label: "SAMPLE",
    checkNumber: "000001"
  });

  const [showPreview, setShowPreview] = useState(true);

  const update = (field, value) => {
    setDetails(previous => ({
      ...previous,
      [field]: value
    }));
  };

  const reset = () => {
    setDetails({
      payee: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      memo: "",
      label: "SAMPLE",
      checkNumber: "000001"
    });
  };

  const printSample = () => {
    window.print();
  };

  const amount = Number(details.amount);
  const formattedAmount = Number.isFinite(amount)
    ? amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    : "0.00";

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">
            <FileText size={23} />
          </div>
          <div>
            <h1>NOIR</h1>
            <span>CHECK EDITOR</span>
          </div>
        </div>

        <div className="header-right">
          <span className="status">
            <ShieldCheck size={15} />
            SAMPLE MODE
          </span>
        </div>
      </header>

      <section className="welcome">
        <div>
          <p className="eyebrow">DOCUMENT WORKSPACE</p>
          <h2>Cheque Designer</h2>
          <p className="subtitle">
            Create, customize and print sample cheque designs.
          </p>
        </div>
        <div className="welcome-icon">
          <Wallet size={30} />
        </div>
      </section>

      <div className="workspace">
        <section className="editor-panel">
          <div className="panel-heading">
            <div>
              <h3>Cheque details</h3>
              <p>Enter your sample document information.</p>
            </div>
            <FileText size={21} />
          </div>

          <div className="field">
            <label>
              <User size={15} /> Payee name
            </label>
            <input
              value={details.payee}
              onChange={e => update("payee", e.target.value)}
              placeholder="Enter sample payee name"
            />
          </div>

          <div className="field">
            <label>
              <Wallet size={15} /> Amount
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={details.amount}
              onChange={e => update("amount", e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="field">
            <label>
              <CalendarDays size={15} /> Date issued
            </label>
            <input
              type="date"
              value={details.date}
              onChange={e => update("date", e.target.value)}
            />
          </div>

          <div className="field">
            <label>
              <Tag size={15} /> Document label
            </label>
            <select
              value={details.label}
              onChange={e => update("label", e.target.value)}
            >
              <option>SAMPLE</option>
              <option>VOID</option>
              <option>TEST CHEQUE</option>
              <option>NOT NEGOTIABLE</option>
              <option>FOR REVIEW</option>
            </select>
          </div>

          <div className="field">
            <label>Cheque reference</label>
            <input
              value={details.checkNumber}
              onChange={e => update("checkNumber", e.target.value)}
              placeholder="Sample reference"
            />
          </div>

          <div className="field">
            <label>Memo / Description</label>
            <textarea
              value={details.memo}
              onChange={e => update("memo", e.target.value)}
              placeholder="Enter a description..."
              rows="3"
            />
          </div>

          <div className="button-group">
            <button
              className="primary-button"
              onClick={() => setShowPreview(true)}
            >
              <Eye size={17} /> Preview design
            </button>

            <button
              className="secondary-button"
              onClick={reset}
            >
              <RotateCcw size={17} /> Reset
            </button>
          </div>
        </section>

        <section className="preview-panel">
          <div className="panel-heading">
            <div>
              <h3>Live preview</h3>
              <p>Your sample cheque design.</p>
            </div>
            <span className="preview-status">LIVE</span>
          </div>

          {showPreview && (
            <div className="cheque">
              <div className="cheque-top">
                <div>
                  <h2>NOIR BANK</h2>
                  <p>FICTIONAL SAMPLE INSTITUTION</p>
                </div>
                <div className="check-number">
                  NO. {details.checkNumber || "000001"}
                </div>
              </div>

              <div className="watermark">
                {details.label}
              </div>

              <div className="cheque-date">
                <span>DATE</span>
                <strong>{details.date || "YYYY-MM-DD"}</strong>
              </div>

              <div className="payee-line">
                <span>PAY TO THE ORDER OF</span>
                <strong>{details.payee || "Sample payee name"}</strong>
              </div>

              <div className="amount-box">
                ${formattedAmount}
              </div>

              <div className="words-line">
                AMOUNT IN WORDS
                <strong>
                  {details.amount
                    ? `${formattedAmount} USD`
                    : "Sample amount"}
                </strong>
              </div>

              <div className="memo-line">
                MEMO: {details.memo || "Sample document"}
              </div>

              <div className="cheque-bottom">
                <span>FICTIONAL SAMPLE ACCOUNT</span>
                <span>NOT VALID FOR PAYMENT</span>
              </div>
            </div>
          )}

          <div className="preview-note">
            <ShieldCheck size={17} />
            This is a fictional sample document, not a bank-issued cheque.
          </div>

          <div className="export-actions">
            <button
              className="primary-button"
              onClick={printSample}
            >
              <Printer size={17} /> Print sample
            </button>
          </div>
        </section>
      </div>

      <footer>
        <p>NOIR CHECK EDITOR</p>
        <span>Sample document design workspace · Version 1.0</span>
      </footer>
    </main>
  );
}
