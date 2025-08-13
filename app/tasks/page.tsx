"use client";

import { useMemo, useState } from "react";
import BottomNav from "@/components/Footer";
import Link from "next/link";

/* ---------- Types ---------- */
type TaskType =
  | "known-word"
  | "pick-translation"
  | "select-correct"
  | "is-correct"
  | "report";

type Base = { id: string; type: TaskType };

type KnownWordTask = Base & {
  type: "known-word";
  word: string;
  ipa: string;
  pos: string;
  example: string;
  translation: string;
  target: string;
};

type PickTask = Base & {
  type: "pick-translation";
  prompt: string;
  options: string[];
  correctIndex: number;
};

type SelectCorrectTask = Base & {
  type: "select-correct";
  prompt: string;
  options: string[]; // 3 штуки
  correctIndex: number;
};

type IsCorrectTask = Base & {
  type: "is-correct";
  left: string; // слово
  right: string; // перевод
  isTrue: boolean;
};

type ReportTask = Base & {
  type: "report";
};

type Task = KnownWordTask | PickTask | SelectCorrectTask | IsCorrectTask | ReportTask;

/* ---------- Demo flow ---------- */
const flow: Task[] = [
  {
    id: "k1",
    type: "known-word",
    word: "School",
    ipa: "[skuːl]",
    pos: "noun",
    example: "to be late for school",
    translation: "опоздать в школу",
    target: "школа",
  },
  {
    id: "p1",
    type: "pick-translation",
    prompt: "новый",
    options: ["new", "old", "fast", "blue", "news", "knew", "few", "now"],
    correctIndex: 0,
  },
  {
    id: "p2",
    type: "pick-translation",
    prompt: "школа",
    options: ["teacher", "class", "school", "book", "study", "learn", "pupil", "room"],
    correctIndex: 2,
  },
  {
    id: "s1",
    type: "select-correct",
    prompt: "Morning",
    options: ["утро", "вечер", "ночь"],
    correctIndex: 0,
  },
  {
    id: "c1",
    type: "is-correct",
    left: "sprosty",
    right: "rude, vulgar",
    isTrue: true,
  },
  {
    id: "c2",
    type: "is-correct",
    left: "sprosty",
    right: "hruby, rude, vulgar, coarse, crude",
    isTrue: true,
  },
  {
    id: "c3",
    type: "is-correct",
    left: "sprosty",
    right: "hruby, rude, vulgar, coarse, crude",
    isTrue: false,
  },
  { id: "r1", type: "report" },
];

/* ---------- Page ---------- */
export default function TasksPage() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState<null | "right" | "wrong">(null);
  const [rightCount, setRight] = useState(0);
  const [wrongCount, setWrong] = useState(0);

  const task = flow[idx];
  const progress = useMemo(
    () => Math.round((idx / Math.max(flow.length - 1, 1)) * 100),
    [idx]
  );

  function next(step = 1) {
    setSelected(null);
    setChecked(null);
    setIdx(i => Math.min(i + step, flow.length - 1));
  }

  function mark(correct: boolean) {
    setChecked(correct ? "right" : "wrong");
    if (correct) setRight(v => v + 1);
    else setWrong(v => v + 1);
  }

  return (
    <div className="min-h-dvh pb-24">
      {/* header */}
      {task.type !== "report" && (
        <header className="sticky top-0 bg-white">
          <div className="mx-auto max-w-md px-4 pt-3 pb-2">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-brand-600 text-xl">&times;</Link>
              <ProgressBar value={Math.max(10, progress)} />
            </div>
          </div>
        </header>
      )}

      <main className="mx-auto max-w-md px-4 pt-4">
        {task.type === "known-word" && <KnownWord t={task} onNext={() => next()} />}

        {task.type === "pick-translation" && (
          <PickTranslation
            t={task}
            selected={selected}
            checked={checked}
            onSelect={(i) => {
              setSelected(i);
              const ok = i === task.correctIndex;
              mark(ok);
            }}
            onNext={() => next()}
          />
        )}

        {task.type === "select-correct" && (
          <SelectCorrect
            t={task}
            selected={selected}
            checked={checked}
            onSelect={(i) => {
              setSelected(i);
              const ok = i === task.correctIndex;
              mark(ok);
            }}
            onNext={() => next()}
          />
        )}

        {task.type === "is-correct" && (
          <IsCorrect
            t={task}
            checked={checked}
            onAnswer={(answerIsTrue) => {
              const ok = answerIsTrue === task.isTrue;
              mark(ok);
            }}
            onNext={() => next()}
          />
        )}

        {task.type === "report" && (
          <Report
            right={rightCount}
            wrong={wrongCount}
            learned={rightCount} // заглушка: считаем выученными все верные
            onBack={() => (window.location.href = "/tutor")}
          />
        )}
      </main>

      <BottomNav />
    </div>
  );
}

/* ---------- UI atoms ---------- */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl2 bg-white shadow-soft px-5 py-5 ${className}`}>{children}</div>;
}

function Button({
  children,
  onClick,
  kind = "primary",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  kind?: "primary" | "ghost" | "success" | "danger";
  className?: string;
}) {
  const map = {
    primary: "bg-brand-500 text-white",
    ghost: "bg-black/10 text-black/70",
    success: "bg-emerald-500 text-white",
    danger: "bg-red-500 text-white",
  } as const;
  return (
    <button
      onClick={onClick}
      className={`rounded-xl2 font-medium py-3 px-4 shadow-btn active:translate-y-px ${map[kind]} ${className}`}
    >
      {children}
    </button>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex-1 h-2 rounded-full bg-black/10 overflow-hidden">
      <div className="h-full bg-emerald-400 transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}

/* ---------- Variations ---------- */
function KnownWord({ t, onNext }: { t: KnownWordTask; onNext: () => void }) {
  return (
    <section className="pb-6">
      <h1 className="text-lg font-semibold mb-3">Which words do you already know?</h1>
      <p className="text-xs text-black/50 mb-4">
        Words marked as known will be excluded from exercises
      </p>

      <Card className="mb-4">
        <div className="text-center">
          <div className="font-semibold">{t.word}</div>
          <div className="text-sm text-brand-600 mt-1">{t.ipa}</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">{t.pos}</div>
          <div className="text-xs text-black/60 mt-2">
            {t.example} – {t.translation}
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <div className="text-center text-lg text-black/80 py-6">{t.target}</div>
      </Card>

      <div className="flex gap-3">
        <Button kind="success" className="flex-1" onClick={onNext}>I know this word</Button>
        <Button className="flex-1" onClick={onNext}>Next Word</Button>
      </div>
    </section>
  );
}

function PickTranslation({
  t, selected, checked, onSelect, onNext,
}: {
  t: PickTask;
  selected: number | null;
  checked: null | "right" | "wrong";
  onSelect: (i: number) => void;
  onNext: () => void;
}) {
  return (
    <section className="pb-10">
      <h2 className="text-xl font-semibold mb-5">Pick the Right Translation</h2>

      <div className="grid grid-cols-2 gap-3">
        {t.options.map((opt, i) => {
          const isSel = selected === i;
          const ring =
            checked === "right" && isSel
              ? "ring-2 ring-emerald-500"
              : checked === "wrong" && isSel
              ? "ring-2 ring-red-500"
              : isSel
              ? "ring-2 ring-brand-500"
              : "";
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`rounded-xl2 bg-white shadow-soft py-3 text-center text-sm ${ring}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex gap-3">
        <Button className="flex-1" onClick={onNext}>Next</Button>
        <Button kind="ghost" className="flex-1" onClick={onNext}>Skip exercise</Button>
      </div>
    </section>
  );
}

function SelectCorrect({
  t, selected, checked, onSelect, onNext,
}: {
  t: SelectCorrectTask;
  selected: number | null;
  checked: null | "right" | "wrong";
  onSelect: (i: number) => void;
  onNext: () => void;
}) {
  return (
    <section className="pb-10">
      <div className="text-sm text-black/60 mb-2">
        Select the correct translation from the options below
      </div>
      <h2 className="text-2xl font-semibold mb-4">{t.prompt}</h2>

      <div className="grid grid-cols-1 gap-3">
        {t.options.map((opt, i) => {
          const isSel = selected === i;
          const isCorrect = i === t.correctIndex;
          const ring =
            checked && isSel
              ? checked === "right"
                ? "ring-2 ring-emerald-500"
                : "ring-2 ring-red-500"
              : isSel
              ? "ring-2 ring-brand-500"
              : "";
          const bg = checked && isSel && checked === "wrong" ? "bg-red-50" : "bg-white";
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`rounded-xl2 ${bg} shadow-soft py-3 text-center text-base ${ring}`}
            >
              {opt}
              {/* Показать правильный вариант после ответа */}
              {checked && !isSel && isCorrect && (
                <span className="ml-2 text-xs text-emerald-600">(correct)</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={onNext}>Next</Button>
      </div>
    </section>
  );
}

function IsCorrect({
  t, checked, onAnswer, onNext,
}: {
  t: IsCorrectTask;
  checked: null | "right" | "wrong";
  onAnswer: (ans: boolean) => void;
  onNext: () => void;
}) {
  // подсветка карточек как в макете
  const base = "rounded-xl2 bg-white shadow-soft p-4 text-center text-base";
  const ok = checked === "right" ? "ring-2 ring-emerald-500" : "";
  const bad = checked === "wrong" ? "ring-2 ring-red-500" : "";

  return (
    <section className="pb-10">
      <h2 className="text-xl font-semibold mb-5">Is This Translation Correct?</h2>

      <div className="grid grid-cols-1 gap-3 mb-4">
        <div className={`${base} ${checked ? ok : ""}`}>{t.left}</div>
        <div className={`${base} ${checked ? (t.isTrue ? ok : bad) : ""}`}>{t.right}</div>
      </div>

      <div className="flex gap-3">
        <Button kind="success" className="flex-1" onClick={() => onAnswer(true)}>
          Correct
        </Button>
        <Button kind="danger" className="flex-1" onClick={() => onAnswer(false)}>
          Incorrect
        </Button>
      </div>

      {/* милый мозг — просто заглушка из emoji; можешь заменить на /public/brain.svg */}
      <div className="mt-8 grid place-items-center text-6xl">🧠</div>

      {checked && (
        <div className="mt-4 flex justify-end">
          <Button onClick={onNext}>Next</Button>
        </div>
      )}
    </section>
  );
}

function Report({
  right, wrong, learned, onBack,
}: {
  right: number;
  wrong: number;
  learned: number;
  onBack: () => void;
}) {
  return (
    <section className="pb-20">
      <h2 className="text-xl font-semibold mb-4">Progress Report</h2>

      <Card className="mb-6">
        <div className="space-y-3">
          <ReportRow label="Correct answers" value={right} badge="bg-emerald-500" />
          <ReportRow label="Incorrect answers" value={wrong} badge="bg-red-500" />
          <ReportRow label="Words you’ve learned" value={learned} badge="bg-brand-500" />
        </div>
      </Card>

      <div className="flex justify-start">
        <Button onClick={onBack}>← Back to Tutor</Button>
      </div>

      <div className="mt-8 grid place-items-center text-7xl">🧠</div>
    </section>
  );
}

function ReportRow({ label, value, badge }: { label: string; value: number; badge: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm">{label}</div>
      <div className={`text-white px-3 py-1 rounded-full text-sm ${badge}`}>{value}</div>
    </div>
  );
}
