import { useState } from "react";

function App() {
  const [selectedValue, setSelectedValue] = useState("HEAD");
  const [sequence, setSequence] = useState([]);

  const handleAdd = () => {
    setSequence((prev) => [...prev, selectedValue]);
  };

  const handleUndo = () => {
    setSequence((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    setSequence([]);
  };

  const getColumns = () => {
    const columns = [];

    sequence.forEach((value) => {
      const lastColumn = columns[columns.length - 1];

      if (lastColumn && lastColumn[0] === value) {
        lastColumn.push(value);
      } else {
        columns.push([value]);
      }
    });

    return columns;
  };

  const columns = getColumns();

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="flex min-h-screen">

        <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-white/10 bg-slate-900/95 p-6 shadow-2xl">

         

            <h1 className="text-2xl font-bold">
              HEAD / TAIL
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Sequence Builder
            </p>
          </div>

          <div className="space-y-6">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Select Value
              </label>

              <select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="HEAD">HEAD</option>
                <option value="TAIL">TAIL</option>
              </select>
            </div>

            <button
              onClick={handleAdd}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-500 active:scale-95"
            >
              + Add
            </button>

            <button
              onClick={handleUndo}
              disabled={sequence.length === 0}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ↶ Undo
            </button>

            <button
              onClick={handleReset}
              disabled={sequence.length === 0}
              className="w-full rounded-xl border border-red-400/20 bg-red-500/10 px-5 py-3 font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reset
            </button>

          </div>

          <div className="mt-auto border-t border-white/10 pt-6">

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Total Values
              </span>

              <span className="font-bold">
                {sequence.length}
              </span>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Total Columns
              </span>

              <span className="font-bold">
                {columns.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Selected
              </span>

              <span className="font-semibold text-indigo-400">
                {selectedValue}
              </span>
            </div>

          </div>

        </aside>

        <main className="ml-72 min-h-screen flex-1 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8 lg:p-12">

          <div className="mx-auto max-w-7xl">

            <div className="mb-10">

              <h2 className="text-4xl font-bold tracking-tight">
                Sequence Dashboard
              </h2>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
                <p className="text-sm text-slate-400">
                  Total Values
                </p>

                <p className="mt-2 text-4xl font-bold">
                  {sequence.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
                <p className="text-sm text-slate-400">
                  Total Columns
                </p>

                <p className="mt-2 text-4xl font-bold">
                  {columns.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
                <p className="text-sm text-slate-400">
                  Current Selection
                </p>

                <p className="mt-2 text-4xl font-bold text-indigo-400">
                  {selectedValue}
                </p>
              </div>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">

              <div className="mb-6">
                <h3 className="text-xl font-semibold">
                  Sequence
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Consecutive HEAD or TAIL values are grouped together.
                </p>
              </div>

              {columns.length === 0 && (
                <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/10">

                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10 text-3xl text-indigo-400">
                    +
                  </div>

                  <p className="font-medium text-slate-300">
                    No values added yet
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Use the controls from the sidebar to start.
                  </p>

                </div>
              )}

              {columns.length > 0 && (
                <div className="flex items-start gap-5 overflow-x-auto pb-5">

                  {columns.map((column, columnIndex) => {

                    const type = column[0];

                    const isHead = type === "HEAD";

                    return (
                      <div
                        key={columnIndex}
                        className="min-w-44 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl"
                      >

                        <div
                          className={`border-b border-white/10 px-5 py-4 text-center ${
                            isHead
                              ? "bg-indigo-500/10"
                              : "bg-cyan-500/10"
                          }`}
                        >

                          <p className="text-xs uppercase tracking-widest text-slate-500">
                            Column {columnIndex + 1}
                          </p>

                          <p
                            className={`mt-1 font-bold ${
                              isHead
                                ? "text-indigo-300"
                                : "text-cyan-300"
                            }`}
                          >
                            {type}
                          </p>

                        </div>

                        <div className="p-3">

                          {column.map((value, valueIndex) => (
                            <div
                              key={valueIndex}
                              className="mb-2 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-center text-sm font-medium last:mb-0"
                            >
                              {value}
                            </div>
                          ))}

                        </div>

                      </div>
                    );
                  })}

                </div>
              )}

            </div>
          </div>

        </main>

      </div>
    </div>
  );
}

export default App;
