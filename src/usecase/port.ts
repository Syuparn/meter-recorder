export interface InputPort<TInputData> {
  execute(inputData: TInputData): Promise<void>;
}

export interface OutputPort<TOutputData> {
  present(outputData: TOutputData): void;
}
