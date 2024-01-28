interface IPlantModel {
  idPlant: number;
  namePlant: string;
  difficulty?: string;
  local?: string;
  datePlant?: Date;
  description?: string;
  photo?: string;
}

export default IPlantModel;