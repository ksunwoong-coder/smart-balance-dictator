import type { InterpretRequest, CopCondition } from './types';

function formatCondition(cond: CopCondition): string {
  return `Path length: ${cond.pathLength} cm | Sway area: ${cond.swayArea} cm² | Mean velocity: ${cond.meanVelocity} cm/s`;
}

export function formatClinicalInput(data: InterpretRequest): string {
  const { staticTest, dynamicTest, plantarPressure, clinicalContext } = data;

  const lines: string[] = [
    '=== STATIC BALANCE TEST ===',
    `Firm / Eyes Open:   ${formatCondition(staticTest.firmEO)}`,
    `Firm / Eyes Closed: ${formatCondition(staticTest.firmEC)}`,
    `Foam / Eyes Open:   ${formatCondition(staticTest.foamEO)}`,
    `Foam / Eyes Closed: ${formatCondition(staticTest.foamEC)}`,
    '',
    '=== DYNAMIC TEST — LIMITS OF STABILITY ===',
    `Front L COP area:  ${dynamicTest.frontLeftArea} cm²`,
    `Front R COP area:  ${dynamicTest.frontRightArea} cm²`,
    `Back L COP area:   ${dynamicTest.backLeftArea} cm²`,
    `Back R COP area:   ${dynamicTest.backRightArea} cm²`,
    `Total LOS area:    ${dynamicTest.totalLosArea} cm²`,
    '',
    '=== FOOT PLANTAR PRESSURE ===',
    `Weight bearing: L ${plantarPressure.leftPercent}% / R ${plantarPressure.rightPercent}%`,
    `                Front ${plantarPressure.frontPercent}% / Back ${plantarPressure.backPercent}%`,
  ];

  const ctx = clinicalContext;
  const hasContext =
    ctx.primaryDiagnosis ||
    ctx.lesionLocation ||
    ctx.symptomOnset ||
    ctx.symptomDuration ||
    ctx.relevantPmh;

  if (hasContext) {
    lines.push('', '=== CLINICAL CONTEXT ===');
    if (ctx.primaryDiagnosis) lines.push(`Primary diagnosis:  ${ctx.primaryDiagnosis}`);
    if (ctx.lesionLocation) lines.push(`Lesion location:    ${ctx.lesionLocation}`);
    if (ctx.symptomOnset) lines.push(`Symptom onset:      ${ctx.symptomOnset}`);
    if (ctx.symptomDuration) lines.push(`Duration:           ${ctx.symptomDuration}`);
    if (ctx.relevantPmh) lines.push(`Relevant PMH:       ${ctx.relevantPmh}`);
  }

  return lines.join('\n');
}
