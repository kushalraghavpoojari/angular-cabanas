export interface OutputResourceInterface {
    id: number,
    x: number,
    y: number,
    w: number,
    h: number
}

export interface OutputLocationInterface {
    name: string,
    imageName: string,
    x: number,
    y: number,
    diameter: number,
    resources: Array<OutputResourceInterface>
}

export interface finalOutputInterface {
    name: string,
    imageName: string,
    locations: Array<OutputLocationInterface>
}