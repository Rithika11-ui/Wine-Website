using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class RewardService : IRewardService
{
    private readonly IMongoCollection<Reward> _rewards;

    public RewardService(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var db = client.GetDatabase(settings.Value.DatabaseName);
        _rewards = db.GetCollection<Reward>("rewards");
    }

    public async Task<List<RewardDto>> GetAllAsync()
    {
        var rewards = await _rewards.Find(_ => true).ToListAsync();
        return rewards.Select(ToDto).ToList();
    }

    public async Task<RewardDto?> GetByIdAsync(string id)
    {
        var reward = await _rewards.Find(r => r.Id == id).FirstOrDefaultAsync();
        return reward is null ? null : ToDto(reward);
    }

    public async Task<RewardDto> CreateAsync(CreateRewardDto dto)
    {
        var reward = new Reward
        {
            Code = dto.Code.ToUpper().Trim(),
            Description = dto.Description,
            Discount = dto.Discount,
            DiscountType = dto.DiscountType,
            MinOrder = dto.MinOrder,
            UsageLimit = dto.UsageLimit,
            UsedCount = 0,
            Status = dto.Status,
            ExpiryDate = dto.ExpiryDate,
            CreatedAt = DateTime.UtcNow,
        };

        await _rewards.InsertOneAsync(reward);
        return ToDto(reward);
    }

    public async Task<RewardDto?> UpdateAsync(string id, UpdateRewardDto dto)
    {
        var existing = await _rewards.Find(r => r.Id == id).FirstOrDefaultAsync();
        if (existing is null) return null;

        existing.Code = dto.Code.ToUpper().Trim();
        existing.Description = dto.Description;
        existing.Discount = dto.Discount;
        existing.DiscountType = dto.DiscountType;
        existing.MinOrder = dto.MinOrder;
        existing.UsageLimit = dto.UsageLimit;
        existing.Status = dto.Status;
        existing.ExpiryDate = dto.ExpiryDate;

        await _rewards.ReplaceOneAsync(r => r.Id == id, existing);
        return ToDto(existing);
    }

    public async Task DeleteAsync(string id) =>
        await _rewards.DeleteOneAsync(r => r.Id == id);

    // ── Mapping helper ───────────────────────────────────────────────
    private static RewardDto ToDto(Reward r) => new RewardDto
    {
        Id = r.Id,
        Code = r.Code,
        Description = r.Description,
        Discount = r.Discount,
        DiscountType = r.DiscountType,
        MinOrder = r.MinOrder,
        UsageLimit = r.UsageLimit,
        UsedCount = r.UsedCount,
        Status = r.Status,
        ExpiryDate = r.ExpiryDate,
    };
}