import IRegisterModel from "./register.model";

interface IPlantModel {
  idPlant: number;
  namePlant?: string;
  difficulty?: string;
  local?: string;
  datePlant?: Date;
  description?: string;
  photo?: string;
  registerList?: IRegisterModel[]
}

export default IPlantModel;