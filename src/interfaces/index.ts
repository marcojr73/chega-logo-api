interface userEntity {
    userName: string,
    password: string,
}

interface truckEntity {
    name: string,                               
    licensePlate: string,                       
    year: number,                                             
    color: string,                                           
    efficiency: number  
}

export {
    userEntity,
    truckEntity
}