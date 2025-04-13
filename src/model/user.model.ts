export interface UserShape {
    address: addressShape,
    company: companyShape,
    name: string,
    email: string,
    id: number,
    phone: string,
    username: string
    website: string
}

interface addressShape {
    city: string,
    geo: string,
    street: string,
    suite: string,
    zipcode: string
}

interface companyShape {
    bs: string,
    catchPhrase: string,
    name: string,
}