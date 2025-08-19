import React, { useMemo, useState } from "react";
import useReplyBot from "../hooks/useReplyBot";

export default function ReplyBot() {
  const {
    loading,
    rules,
    templateOptions,
    syncTemplates,
    createRule,
    updateRule,
    deleteRule,
  } = useReplyBot();

  const [form, setForm] = useState({
    name: "",
    enabled: true,
    match_text: "",
    template_id: "",
  });

  const selectedTemplate = useMemo(
    () => templateOptions.find((t) => t.value === form.template_id) || null,
    [templateOptions, form.template_id]
  );

  return (
    <div className="col-md-12">
      <div className="card card-primary card-outline">
        <div className="card-header d-flex align-items-center">
          <h5 className="card-title mb-0 text-bold text-secondary">
            <i className="fas fa-robot mr-2" /> Reply Bot
          </h5>
          <div className="card-tools ml-auto">
            <button
              className="btn btn-tool bg-pearl"
              data-card-widget="maximize"
            >
              <i className="fas fa-expand"></i>
            </button>
            <button
              className="btn btn-sm btn-primary ml-2"
              onClick={syncTemplates}
              disabled={loading}
              title="Refresh approved templates"
            >
              <i className="fas fa-sync-alt mr-1" /> Refresh templates
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-5">
              <div className="card mb-3">
                <div className="card-header">Create Auto Reply Rule</div>
                <div className="card-body">
                  {/* Only text contains rules */}
                  <div className="form-group">
                    <label>Rule name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Optional label"
                    />
                  </div>
                  {/* Always contains */}
                  <div className="form-group">
                    <label>Text contains</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.match_text}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, match_text: e.target.value }))
                      }
                      placeholder="e.g. hi or hello"
                    />
                  </div>

                  <div className="form-group">
                    <label>Template</label>
                    <select
                      className="form-control"
                      value={form.template_id}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, template_id: e.target.value }))
                      }
                    >
                      <option value="">Select template</option>
                      {templateOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* No per-rule params in simplified model */}

                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-primary"
                      disabled={
                        loading || !form.template_id || !form.match_text
                      }
                      onClick={async () => {
                        await createRule(form);
                        setForm({
                          name: "",
                          enabled: true,
                          match_text: "",
                          template_id: "",
                        });
                      }}
                    >
                      Save Rule
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="card mb-3">
                <div className="card-header">Existing Rules</div>
                <div className="card-body p-0">
                  <table className="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th style={{ width: 40 }}>On</th>
                        <th>Name</th>
                        <th>Match</th>
                        <th>Template</th>
                        <th style={{ width: 100 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {(rules || []).map((r) => (
                        <tr key={r.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={!!r.enabled}
                              onChange={(e) =>
                                updateRule(r.id, { enabled: e.target.checked })
                              }
                            />
                          </td>
                          <td>{r.name || "(no name)"}</td>
                          <td>
                            text contains <code>{r.match_text}</code>
                          </td>
                          <td>
                            <span className="badge badge-light">
                              {r.template_id}
                            </span>
                          </td>
                          <td className="text-right">
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteRule(r.id)}
                            >
                              <i className="fas fa-trash" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {(!rules || rules.length === 0) && (
                        <tr>
                          <td
                            colSpan={5}
                            className="text-center text-muted p-3"
                          >
                            No rules yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
