using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class OrderService : IOrderService
{
    private readonly IMongoCollection<Order> _orders; 

    public OrderService(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var db = client.GetDatabase(settings.Value.DatabaseName);
        _orders = db.GetCollection<Order>("Orders"); 
    }

    public async Task<List<Order>> GetAllAsync() =>
        await _orders.Find(_ => true).ToListAsync();

    public async Task<Order?> GetByIdAsync(string id) => 
        await _orders.Find(o => o.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Order order) =>
        await _orders.InsertOneAsync(order);

    public async Task UpdateAsync(string id, Order order) =>
        await _orders.ReplaceOneAsync(o => o.Id == id, order);

    public async Task DeleteAsync(string id) =>
        await _orders.DeleteOneAsync(o => o.Id == id);
}

