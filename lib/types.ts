export interface CopCondition {
  pathLength: string;
  swayArea: string;
  meanVelocity: string;
}

export interface StaticTestData {
  firmEO: CopCondition;
  firmEC: CopCondition;
  foamEO: CopCondition;
  foamEC: CopCondition;
}

export interface DynamicTestData {
  frontLeftArea: string;
  frontRightArea: string;
  backLeftArea: string;
  backRightArea: string;
  totalLosArea: string;
}

export interface PlantarPressureData {
  leftPercent: string;
  rightPercent: string;
  frontPercent: string;
  backPercent: string;
}

export interface ClinicalContextData {
  primaryDiagnosis: string;
  lesionLocation: string;
  symptomOnset: string;
  symptomDuration: string;
  relevantPmh: string;
}

export interface InterpretRequest {
  staticTest: StaticTestData;
  dynamicTest: DynamicTestData;
  plantarPressure: PlantarPressureData;
  clinicalContext: ClinicalContextData;
}

export interface InterpretResponse {
  interpretation: string;
  error?: string;
}
