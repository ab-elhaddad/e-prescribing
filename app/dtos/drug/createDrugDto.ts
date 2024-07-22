export type CreateDrugDto = {
  doctorId: string;
  name: string;
  price: number;
  quantity: number;
  usage: string;
  sideEffects: string[];
  contraindications: string[];
  similarDrugs: string[];
};