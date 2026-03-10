public interface IProductService
{
    Task<List<Product>> GetAllProductAsync();
    Task<Product?> GetByIdAsync(string id);

    Task CreateProductAsync(Product product);
    Task UpdateProductAsync(string id, Product product);
    Task DeleteProductAsync(string id);
}