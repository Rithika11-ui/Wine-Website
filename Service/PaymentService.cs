using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class PaymentService : IPaymentService
{
    private readonly IMongoCollection<Payment> _payments;

    public PaymentService(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var db = client.GetDatabase(settings.Value.DatabaseName);
        _payments = db.GetCollection<Payment>("Payments");
    }

    public async Task<List<Payment>> GetAllAsync() =>
        await _payments.Find(_ => true).ToListAsync();

    public async Task<Payment?> GetByIdAsync(string id) =>
        await _payments.Find(p => p.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Payment payment)
    {
        payment.CreatedAt = DateTime.UtcNow;
        payment.Status = PaymentStatus.Pending;
        await _payments.InsertOneAsync(payment);
    }

    public async Task UpdateStatusAsync(string id, PaymentStatus status)
    {
        var update = Builders<Payment>.Update
            .Set(p => p.Status, status)
            .Set(p => p.PaidAt, status == PaymentStatus.Succeeded ? DateTime.UtcNow : null);

        await _payments.UpdateOneAsync(p => p.Id == id, update);
    }
}

