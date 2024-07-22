import DrugPersistenceDto from "./drugPersistenceDto";

export type GetDrugDto = {
  id: string;
  doctorId: string;
  name: string;
  price: number;
  quantity: number;
  usage: string;
  sideEffects: string;
  contraindications: string;
  similarDrugs: string;
  createdAt: string;
};

export default function getDrugDto(drug: DrugPersistenceDto) {
  return {
    id: drug._id,
    doctorId: drug.doctorId,
    name: drug.name,
    price: drug.price,
    quantity: drug.quantity,
    usage: drug.usage,
    sideEffects: drug.sideEffects.join(", "),
    contraindications: drug.contraindications.join(", "),
    similarDrugs: drug.similarDrugs.join(", "),
    createdAt: drug.createdAt.toString(),
  };
}
