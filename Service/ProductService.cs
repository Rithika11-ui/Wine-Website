using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class ProductService : IProductService
{
    private readonly IMongoCollection<Product> _products;

    public ProductService(IOptions<MongoDbSettings> settings)
    {
        var product = new MongoClient(settings.Value.ConnectionString);
        var db = product.GetDatabase(settings.Value.DatabaseName);
        _products = db.GetCollection<Product>("products");

    }

    public async Task<List<Product>> GetAllProductAsync() =>
    await _products.Find(_ => true).ToListAsync();

    public async Task<Product?> GetByIdAsync(string id) =>
    await _products.Find(p => p.Id == id).FirstOrDefaultAsync();

    public async Task CreateProductAsync(Product product) =>
    await _products.InsertOneAsync(product);

    public async Task UpdateProductAsync(string id, Product product) =>
    await _products.ReplaceOneAsync(p => p.Id == id, product);

    public async Task DeleteProductAsync(string id) =>
    await _products.DeleteOneAsync(p => p.Id == id);

}

