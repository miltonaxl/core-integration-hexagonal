export interface CoreIntegrationPort {
    validateProduct(product: { name: string; price: number }): Promise<boolean>;
}