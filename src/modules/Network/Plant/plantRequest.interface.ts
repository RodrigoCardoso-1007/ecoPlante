interface InPlant {
  id?: number,
  name: string,
  desc?: string,
  img?: string,
  local?: string,
  care_level?: string,
  date_plant?: string,
}

interface OutPlant {
  id: number,
  idUser: number,
  care_level?: string,
  date_plant: string,
  desc?: string
  img?: string,
  local?: string
  name?: string,
  createdAt: string,
  updatedAt: string,
}

export type {
  InPlant,
  OutPlant
}
