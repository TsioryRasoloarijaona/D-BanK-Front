export interface Category {
        subCategoryId: number,
        category: string,
        subCategory : string
}

export interface ProvisioningPost{
    amount: number,
    reason: string ,
    effectiveDate:string ,
    accountId: string,
    
  }


export interface Provisioninginterface {
    id : string,
    ProvisioningPost : ProvisioningPost
}