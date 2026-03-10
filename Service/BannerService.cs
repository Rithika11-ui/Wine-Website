using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class BannerService : IBannerService
{
    private readonly IMongoCollection<Banner> _banner;
    private readonly IWebHostEnvironment _env;

    public BannerService(IOptions<MongoDbSettings> setting, IWebHostEnvironment env)
    {
        var client = new MongoClient(setting.Value.ConnectionString);
        var db = client.GetDatabase(setting.Value.DatabaseName);
        _banner = db.GetCollection<Banner>("banner");
        _env = env;
    }

    public async Task<List<BannerResponseDto>> GetAllAsync()
    {
        var banners = await _banner.Find(_ => true).ToListAsync();
        return banners.Select(MapToDto).ToList();
    }

    public async Task<BannerResponseDto?> GetByIdAsync(string id)
    {
        var banner = await _banner.Find(u => u.Id == id).FirstOrDefaultAsync();
        return banner is null ? null : MapToDto(banner);
    }

    public async Task<BannerResponseDto> CreateAsync(CreateBannerDto dto , string? imageUrl)
    {
        // var imageUrl = await SaveImageAsync(dto.Image);
        // var mobileImage = await SaveImageAsync(dto.MobileImage);

        var banner = new Banner
        {
            Title = dto.Title,
            Subtitle = dto.Subtitle,
            Description = dto.Description,
            ButtonText = dto.ButtonText,
            ButtonLink = dto.ButtonLink,
            Position = dto.Position,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            IsActive = dto.IsActive,
            SortOrder = dto.SortOrder,
            ImageUrl = imageUrl ?? string.Empty,
            // MobileImageUrl = mobileImage,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };

        await _banner.InsertOneAsync(banner);
        return MapToDto(banner);
    }

    public async Task<BannerResponseDto?> UpdateAsync(string id, UpdateBannerDto dto, string? imageUrl)
    {
        var existing = await _banner.Find(u => u.Id == id).FirstOrDefaultAsync();
        if (existing is null) return null;

        existing.Title = dto.Title ?? existing.Title;
        existing.Subtitle = dto.Subtitle ?? existing.Subtitle;
        existing.Description = dto.Description ?? existing.Description;
        existing.ButtonText = dto.ButtonText ?? existing.ButtonText;
        existing.ButtonLink = dto.ButtonLink ?? existing.ButtonLink;
        existing.Position = dto.Position ?? existing.Position;
        existing.StartDate = dto.StartDate ?? existing.StartDate;
        existing.EndDate = dto.EndDate ?? existing.EndDate;
        existing.IsActive = dto.IsActive ?? existing.IsActive;
        existing.SortOrder = dto.SortOrder ?? existing.SortOrder;
        existing.UpdatedAt = DateTime.UtcNow;

        if (dto.Image is not null)
            existing.ImageUrl = await SaveImageAsync(dto.Image) ?? existing.ImageUrl;

        // if (dto.MobileImage is not null)
        //     existing.MobileImageUrl = await SaveImageAsync(dto.MobileImage);

        await _banner.ReplaceOneAsync(u => u.Id == id, existing);
        return MapToDto(existing);
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var result = await _banner.DeleteOneAsync(u => u.Id == id);
        return result.DeletedCount > 0;
    }

    private static BannerResponseDto MapToDto(Banner banner) => new()
    {
        Id = banner.Id,
        Title = banner.Title,
        Subtitle = banner.Subtitle,
        Description = banner.Description,
        ImageUrl = banner.ImageUrl,
        // MobileImageUrl = banner.MobileImageUrl,
        ButtonText = banner.ButtonText,
        ButtonLink = banner.ButtonLink,
        Position = banner.Position,
        StartDate = banner.StartDate,
        EndDate = banner.EndDate,
        IsActive = banner.IsActive,
        SortOrder = banner.SortOrder,
        CreatedAt = banner.CreatedAt,
        UpdatedAt = banner.UpdatedAt,
    };

    private async Task<string?> SaveImageAsync(IFormFile? file)
    {
        if (file is null || file.Length == 0) return null;

        var allowed = new[] { "image/jpeg", "image/png", "image/webp" };
        if (!allowed.Contains(file.ContentType)) return null;
        if (file.Length > 5 * 1024 * 1024) return null;  

        var folder = Path.Combine(_env.WebRootPath, "uploads", "banners");
        Directory.CreateDirectory(folder);

        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(folder, fileName);

        using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        return $"/uploads/banners/{fileName}";
    }
}