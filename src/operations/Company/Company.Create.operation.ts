import {Company} from "./../../models/index"

export namespace CompanyEntity {
    export namespace Create {
        export interface RequestInterface {
            name: string
        }

        export interface ResponseInterface {
            Company: Company
        }

        export async function Operation(request: RequestInterface): Promise<ResponseInterface> {
            const company = new Company();

            company.name = request.name;

            const response: ResponseInterface = {
                Company: company
            }

            return response;

        }
    }
}
