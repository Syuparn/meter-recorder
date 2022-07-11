export interface InputPort<TInputData> {
  execute(inputData: TInputData): void;
}

export interface OutputPort<TOutputData> {
  present(outputData: TOutputData): void;
}
