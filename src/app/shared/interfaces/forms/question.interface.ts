export interface IQuestion {
  id: number;
  text: string;
  positive?: string;
  negative?: string;
  answer: string;
  custom?: string;
}
