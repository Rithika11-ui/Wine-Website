using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class CategoryService : ICategoryService
{
    private readonly IMongoCollection<Category> _categories;

    public CategoryService(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var db = client.GetDatabase(settings.Value.DatabaseName);
        _categories = db.GetCollection<Category>("categories");
    }

    public async Task<List<Category>> GetAllAsync() =>
        await _categories.Find(_ => true).ToListAsync();

    public async Task<Category?> GetByIdAsync(string id) =>
        await _categories.Find(c => c.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Category category) =>
        await _categories.InsertOneAsync(category);

    public async Task UpdateAsync(string id, Category category) =>
        await _categories.ReplaceOneAsync(c => c.Id == id, category);

    public async Task DeleteAsync(string id) =>
        await _categories.DeleteOneAsync(c => c.Id == id);
}