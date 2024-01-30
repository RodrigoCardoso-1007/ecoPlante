interface IRegisterModel {
  idRegister: number;
  idPlant: number;
  rega?: string;
  poda?: string;
  adubacao?: string;
  decricao?: string;
  dateRegister: Date
}

export default IRegisterModel;