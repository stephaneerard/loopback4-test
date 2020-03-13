import {Company, CompanyWorksInCountryDuringPeriod, Country, Employee} from "./../../models/index"

export namespace CompanyEntity {
    export namespace WorksInCountryDuringPeriod {
        export interface RequestInterface {
            Company: Company
            Country: Country
            from: Date
            to?: Date
            user: Employee
        }

        export interface ResponseInterface {
            worksInCountryDuringPeriod: CompanyWorksInCountryDuringPeriod
        }

        export async function Operation(request: RequestInterface): Promise<ResponseInterface> {
            const wicdp = new CompanyWorksInCountryDuringPeriod();

            wicdp.Company = request.Company;
            wicdp.Country = request.Country;
            wicdp.from = request.from;
            wicdp.to = request.to;

            const response: ResponseInterface = {
                worksInCountryDuringPeriod: wicdp
            }

            return response;

        }
    }
}
