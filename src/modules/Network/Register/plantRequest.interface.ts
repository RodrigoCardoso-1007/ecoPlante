interface InRegister {
  pruning?: string,
  watering?: string,
  img?: string,
  fertilizing?: string,
  description?: string,
  idPlant: number,
}

interface OutRegister extends InRegister {
  id: number,
  createdAt: string,
}

export type {
  InRegister,
  OutRegister
}
