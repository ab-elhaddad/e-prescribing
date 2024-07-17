export default interface DrugPersistenceDto {
  doctorId: string;
  name: string;
  price: number;
  quantity: number;
  usage: string;
  sideEffects: string[];
  contraindications: string[];
  similarDrugs: string[];
  createdAt: Date;
}
