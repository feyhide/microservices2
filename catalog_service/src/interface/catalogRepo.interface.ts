export interface ICatalogRepository{
    create(data:any): Promise<{}>;
    update(data:any): Promise<{}>;
    
}