interface userEntity {
    userName: string,
    password: string,
}

interface truckEntity {
    name: string,                               
    licensePlate: string,                       
    year: string,                                             
    color: string,                                           
    efficiency: string  
}

type lastMonthYearEntity = {
    month: string;
    year: string;
}[]

interface placesEntity {
    id: number,
    name: string,
    distance: string
}

export {
    userEntity,
    truckEntity,
    lastMonthYearEntity,
    placesEntity
}