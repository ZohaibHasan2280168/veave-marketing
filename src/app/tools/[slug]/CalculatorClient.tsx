"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, RotateCcw, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { ToolItem } from "@/data/veaveData";

export default function CalculatorClient({ tool }: { tool: ToolItem }) {
  const initialValues = tool.inputs.reduce((acc, input) => {
    acc[input.name] = input.defaultValue;
    return acc;
  }, {} as Record<string, number>);

  const [values, setValues] = useState<Record<string, number>>(initialValues);

  const handleInputChange = (name: string, val: number) => {
    setValues((prev) => ({ ...prev, [name]: val }));
  };

  const handleReset = () => {
    setValues(initialValues);
  };

  // Compute live output based on tool slug
  let resultOutput = "";
  let secondaryDetail = "";
  let isPass = true;

  if (tool.slug === "fabric-consumption") {
    const units = values["units"] || 500;
    const surfaceArea = values["surfaceArea"] || 1.45;
    const fabricWidth = values["fabricWidth"] || 1.48;
    const shrinkage = values["shrinkage"] || 3.5;
    const wastage = values["wastage"] || 7.0;

    const baseMeters = (surfaceArea / fabricWidth) * units;
    const totalRequired = baseMeters * (1 + (shrinkage + wastage) / 100);
    const perDozen = (totalRequired / units) * 12;

    resultOutput = `${totalRequired.toFixed(1)} Meters`;
    secondaryDetail = `Averages ${(totalRequired / units).toFixed(2)} m/garment (~${perDozen.toFixed(2)} m per dozen)`;
  } else if (tool.slug === "sam-calculator") {
    const basicMinutes = values["basicMinutes"] || 18.5;
    const operatorRating = values["operatorRating"] || 95;
    const allowance = values["allowance"] || 12;
    const hourlyRate = values["hourlyRate"] || 4.5;

    const sam = basicMinutes * (operatorRating / 100) * (1 + allowance / 100);
    const costPerGarment = (sam / 60) * hourlyRate;

    resultOutput = `${sam.toFixed(2)} Minutes (SAM)`;
    secondaryDetail = `Labor Direct Cost: $${costPerGarment.toFixed(2)} / piece at $${hourlyRate}/hr`;
  } else if (tool.slug === "aql-calculator") {
    const batch = values["batchSize"] || 1200;
    let sampleSize = 80;
    let maxDefects = 5;

    if (batch <= 150) {
      sampleSize = 20;
      maxDefects = 1;
    } else if (batch <= 500) {
      sampleSize = 50;
      maxDefects = 3;
    } else if (batch <= 1200) {
      sampleSize = 80;
      maxDefects = 5;
    } else if (batch <= 3200) {
      sampleSize = 125;
      maxDefects = 7;
    } else if (batch <= 10000) {
      sampleSize = 200;
      maxDefects = 10;
    } else {
      sampleSize = 315;
      maxDefects = 14;
    }

    resultOutput = `Sample Size: ${sampleSize} Pieces`;
    secondaryDetail = `Accept Batch if defects <= ${maxDefects}. Reject batch if defects >= ${maxDefects + 1}.`;
  } else if (tool.slug === "line-balancing") {
    const totalSam = values["totalSam"] || 24.2;
    const operators = values["operators"] || 32;
    const dailyHours = values["dailyHours"] || 8;

    const pitchTime = totalSam / operators;
    const targetOutputAt85 = Math.floor(((dailyHours * 60) / pitchTime) * 0.85);

    resultOutput = `Pitch Time: ${pitchTime.toFixed(2)} mins/station`;
    secondaryDetail = `Target Output: ~${targetOutputAt85} pieces / 8-hour shift at 85% line efficiency`;
  } else if (tool.slug === "thread-consumption") {
    const lockstitchSeam = values["lockstitchSeam"] || 4.8;
    const overlockSeam = values["overlockSeam"] || 8.5;
    const threadWastage = values["threadWastage"] || 15;

    const lockstitchThread = lockstitchSeam * 2.8;
    const overlockThread = overlockSeam * 14.5;
    const totalThread = (lockstitchThread + overlockThread) * (1 + threadWastage / 100);

    resultOutput = `${totalThread.toFixed(1)} Meters Thread`;
    secondaryDetail = `Lockstitch: ${lockstitchThread.toFixed(1)}m | Overlock: ${overlockThread.toFixed(1)}m (Incl. ${threadWastage}% waste)`;
  } else if (tool.slug === "tolerance-checker") {
    const target = values["targetMeasurement"] || 54.0;
    const tolerance = values["allowedTolerance"] || 1.0;
    const actual = values["actualMeasurement"] || 54.4;

    const diff = actual - target;
    isPass = Math.abs(diff) <= tolerance;

    resultOutput = isPass ? "STATUS: PASS (WITHIN SPEC)" : "STATUS: REJECT (OUT OF TOLERANCE)";
    secondaryDetail = `Deviation: ${diff > 0 ? "+" : ""}${diff.toFixed(2)} cm (Allowed: ±${tolerance} cm)`;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Calculator Inputs Card */}
      <div className="lg:col-span-7 rounded-2xl border border-[#e3eaef] bg-white p-6 sm:p-8 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[#e3eaef] pb-4">
          <div className="flex items-center gap-2.5">
            <Calculator className="size-5 text-[#0e6bfd]" />
            <span className="text-sm font-bold text-[#16303f]">Calculation Parameters</span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-[#587080] hover:text-[#0e6bfd] transition-colors"
          >
            <RotateCcw className="size-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <div className="space-y-5">
          {tool.inputs.map((input) => (
            <div key={input.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#16303f]">
                <label htmlFor={input.name}>{input.label}</label>
                <span className="text-[#0e6bfd]">
                  {values[input.name]} {input.unit}
                </span>
              </div>
              <input
                id={input.name}
                type="number"
                step="any"
                value={values[input.name] ?? input.defaultValue}
                onChange={(e) => handleInputChange(input.name, parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 py-2.5 text-sm font-medium text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
          ))}
        </div>

        <div className="pt-2 text-xs text-[#587080] italic">
          Formula: {tool.formulaDescription}
        </div>
      </div>

      {/* Output Card */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div
          className={`rounded-2xl border p-6 sm:p-8 shadow-sm flex flex-col gap-4 ${
            tool.slug === "tolerance-checker"
              ? isPass
                ? "border-emerald-200 bg-emerald-50/50"
                : "border-rose-200 bg-rose-50/50"
              : "border-[#0e6bfd]/30 bg-white"
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#587080]">
            {tool.outputLabel}
          </span>

          <div
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              tool.slug === "tolerance-checker"
                ? isPass
                  ? "text-emerald-700"
                  : "text-rose-700"
                : "text-[#0e6bfd]"
            }`}
          >
            {resultOutput}
          </div>

          <p className="text-xs sm:text-sm text-[#587080] font-medium leading-relaxed border-t border-black/5 pt-3">
            {secondaryDetail}
          </p>

          <div className="pt-4 border-t border-black/5 flex flex-col gap-3">
            <span className="text-xs font-semibold text-[#16303f]">
              Need this verified automatically across your factory lines?
            </span>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#0e6bfd] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0b5ad9] transition-all shadow-xs"
            >
              <span>Automate in Veave</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Informational Guidance Box */}
        <div className="rounded-2xl border border-[#e3eaef] bg-white p-5 text-xs text-[#587080] space-y-2">
          <strong className="text-[#16303f] font-semibold block">Industry Best Practice Note:</strong>
          <p>
            Standard textile engineering recommends auditing sample lots under D65 standard light booths and allowing 24-hour fabric roll relaxation prior to bulk spreading.
          </p>
        </div>
      </div>
    </div>
  );
}

