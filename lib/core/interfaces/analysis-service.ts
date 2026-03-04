export interface GenerateContentOptions {
  model: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contents: any[];
  config?: {
    temperature?: number;
    maxOutputTokens?: number;
    responseMimeType?: string;
  };
}

export interface IAnalysisService {
  generateContent(options: GenerateContentOptions): Promise<{
    text?: string;
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  }>;
}
